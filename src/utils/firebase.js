import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// ─── Config from environment variables ───
// Set these in Vercel dashboard → Settings → Environment Variables
// Or create a .env.local file locally:
//   VITE_FIREBASE_API_KEY=AIza...
//   VITE_FIREBASE_AUTH_DOMAIN=yourapp.firebaseapp.com
//   VITE_FIREBASE_PROJECT_ID=yourapp
//   VITE_FIREBASE_STORAGE_BUCKET=yourapp.appspot.com
//   VITE_FIREBASE_MESSAGING_SENDER_ID=123456
//   VITE_FIREBASE_APP_ID=1:123456:web:abc
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if Firebase is configured
export const FIREBASE_CONFIGURED = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== 'undefined';

let app, auth, db;

if (FIREBASE_CONFIGURED) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  auth.languageCode = 'hi'; // Default to Hindi for Indian users
  db = getFirestore(app);
}

// ─── Phone Auth ───

// Initialize invisible reCAPTCHA (call once before sending OTP)
export function setupRecaptcha(buttonId) {
  if (!FIREBASE_CONFIGURED) return null;
  if (window._recaptchaVerifier) {
    window._recaptchaVerifier.clear();
  }
  window._recaptchaVerifier = new RecaptchaVerifier(auth, buttonId, {
    size: 'invisible',
    callback: () => {},
    'expired-callback': () => {
      window._recaptchaVerifier = null;
    },
  });
  return window._recaptchaVerifier;
}

// Send OTP to phone number
export async function sendOTP(phoneNumber) {
  if (!FIREBASE_CONFIGURED) {
    // Demo mode — simulate OTP
    return { _demo: true, phone: phoneNumber };
  }

  const recaptcha = window._recaptchaVerifier;
  if (!recaptcha) throw new Error('Recaptcha not initialized');

  // Ensure +91 prefix for Indian numbers
  const fullNumber = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber.replace(/\D/g, '')}`;

  const confirmation = await signInWithPhoneNumber(auth, fullNumber, recaptcha);
  return confirmation;
}

// Verify OTP code
export async function verifyOTP(confirmation, otpCode) {
  if (!FIREBASE_CONFIGURED || confirmation?._demo) {
    // Demo mode — accept any 4+ digit code
    if (otpCode.length >= 4) {
      return { uid: 'demo_' + Date.now(), phoneNumber: '+91' + (confirmation?.phone || '9876543210') };
    }
    throw new Error('Invalid OTP');
  }

  const result = await confirmation.confirm(otpCode);
  return result.user;
}

// ─── Auth State ───

export function onAuthChange(callback) {
  if (!FIREBASE_CONFIGURED) return () => {};
  return onAuthStateChanged(auth, callback);
}

export async function logoutUser() {
  if (!FIREBASE_CONFIGURED) return;
  await signOut(auth);
}

// ─── Firestore User Data ───

export async function saveUserData(uid, data) {
  if (!FIREBASE_CONFIGURED) return;
  await setDoc(doc(db, 'users', uid), {
    ...data,
    updatedAt: new Date().toISOString(),
  }, { merge: true });
}

export async function getUserData(uid) {
  if (!FIREBASE_CONFIGURED) return null;
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

export { auth, db };
