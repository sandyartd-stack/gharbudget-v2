import { useState, useEffect, useCallback } from 'react';
import { FIREBASE_CONFIGURED, onAuthChange, sendOTP, verifyOTP, logoutUser, setupRecaptcha, saveUserData, getUserData } from '../utils/firebase';
import storage from '../utils/storage';

const AUTH_KEY = 'gb_auth';

export default function useAuth() {
  const [user, setUser] = useState(null);         // { uid, phoneNumber }
  const [loading, setLoading] = useState(true);    // Initial auth check
  const [sending, setSending] = useState(false);   // Sending OTP
  const [verifying, setVerifying] = useState(false); // Verifying OTP
  const [error, setError] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  // Listen for Firebase auth state changes
  useEffect(() => {
    if (FIREBASE_CONFIGURED) {
      const unsub = onAuthChange((firebaseUser) => {
        if (firebaseUser) {
          const u = { uid: firebaseUser.uid, phoneNumber: firebaseUser.phoneNumber };
          setUser(u);
          storage.set(AUTH_KEY, u);
        } else {
          setUser(null);
          storage.del(AUTH_KEY);
        }
        setLoading(false);
      });
      return unsub;
    } else {
      // Demo mode — check localStorage
      const saved = storage.get(AUTH_KEY);
      if (saved) setUser(saved);
      setLoading(false);
    }
  }, []);

  // Initialize reCAPTCHA
  const initRecaptcha = useCallback((buttonId) => {
    setupRecaptcha(buttonId);
  }, []);

  // Send OTP
  const handleSendOTP = useCallback(async (phoneNumber) => {
    setError(null);
    setSending(true);
    try {
      const clean = phoneNumber.replace(/\s/g, '');
      if (clean.length < 10) throw new Error('Enter valid 10-digit number');

      const result = await sendOTP(clean);
      setConfirmation(result);
      setSending(false);
      return true;
    } catch (err) {
      setSending(false);
      const msg = mapError(err);
      setError(msg);
      return false;
    }
  }, []);

  // Verify OTP
  const handleVerifyOTP = useCallback(async (otpCode) => {
    if (!confirmation) { setError('Send OTP first'); return false; }
    setError(null);
    setVerifying(true);
    try {
      const firebaseUser = await verifyOTP(confirmation, otpCode);
      const u = { uid: firebaseUser.uid, phoneNumber: firebaseUser.phoneNumber };
      setUser(u);
      storage.set(AUTH_KEY, u);

      // Sync data from Firestore if available
      if (FIREBASE_CONFIGURED) {
        const cloudData = await getUserData(firebaseUser.uid);
        if (cloudData) {
          // Merge cloud data with local
          const localData = storage.get('gb_d');
          if (!localData || !localData.expenses || localData.expenses.length === 0) {
            storage.set('gb_d', { ...cloudData, loggedIn: true, phoneNum: clean(firebaseUser.phoneNumber) });
          }
        }
      }

      setVerifying(false);
      setConfirmation(null);
      return true;
    } catch (err) {
      setVerifying(false);
      const msg = mapError(err);
      setError(msg);
      return false;
    }
  }, [confirmation]);

  // Logout
  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
    } catch {}
    setUser(null);
    setConfirmation(null);
    storage.del(AUTH_KEY);
  }, []);

  // Clear error
  const clearError = useCallback(() => setError(null), []);

  return {
    user,
    loading,
    sending,
    verifying,
    error,
    clearError,
    isOtpSent: !!confirmation,
    initRecaptcha,
    sendOTP: handleSendOTP,
    verifyOTP: handleVerifyOTP,
    logout: handleLogout,
    isDemo: !FIREBASE_CONFIGURED,
  };
}

function clean(phone) {
  return (phone || '').replace('+91', '').replace(/\D/g, '');
}

function mapError(err) {
  const code = err?.code || '';
  if (code.includes('invalid-phone')) return 'Invalid phone number';
  if (code.includes('too-many-requests')) return 'Too many attempts. Try later.';
  if (code.includes('invalid-verification')) return 'Wrong OTP. Try again.';
  if (code.includes('code-expired')) return 'OTP expired. Resend.';
  if (code.includes('network')) return 'Network error. Check connection.';
  if (code.includes('quota')) return 'SMS limit reached. Try later.';
  if (code.includes('captcha')) return 'Verification failed. Refresh page.';
  return err?.message || 'Something went wrong';
}
