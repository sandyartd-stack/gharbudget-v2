// ──────────────────────────────────────────────────
// Firebase Configuration
// Replace with your Firebase project credentials
// Get these from: https://console.firebase.google.com
// ──────────────────────────────────────────────────

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// ──────────────────────────────────────────────────
// Firebase is NOT initialized by default.
// To enable:
// 1. npm install firebase
// 2. Fill in firebaseConfig above
// 3. Uncomment the code below
// 4. Update useStore.js to use these functions
// ──────────────────────────────────────────────────

/*
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ─── Phone Auth ───
export async function sendOTP(phoneNumber) {
  const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
  const confirmation = await signInWithPhoneNumber(auth, '+91' + phoneNumber, recaptcha);
  return confirmation; // call confirmation.confirm(otp) to verify
}

export async function verifyOTP(confirmation, otp) {
  const result = await confirmation.confirm(otp);
  return result.user;
}

export async function logoutUser() {
  await signOut(auth);
}

export function onAuthChange(callback) {
  return auth.onAuthStateChanged(callback);
}

// ─── Firestore CRUD ───
export async function saveUserData(uid, data) {
  await setDoc(doc(db, 'users', uid), data, { merge: true });
}

export async function getUserData(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

// ─── Firestore Security Rules ───
// Paste this in Firebase Console → Firestore → Rules:
//
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /users/{userId} {
//       allow read, write: if request.auth != null && request.auth.uid == userId;
//     }
//   }
// }

export { auth, db };
*/

// Export placeholder for now
export const FIREBASE_READY = false;
export default firebaseConfig;
