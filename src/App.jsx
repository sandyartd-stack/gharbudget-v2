import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import useAuth from './hooks/useAuth';
import useStore from './hooks/useStore';
import { ToastProvider, toast } from './components/Toast';
import Logo from './components/Logo';
import TabBar from './components/TabBar';
import LandingPage from './screens/LandingPage';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import BudgetScreen from './screens/BudgetScreen';
import SavingsScreen from './screens/SavingsScreen';
import SettingsScreen from './screens/SettingsScreen';

const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.15 } },
};

export default function App() {
  const auth = useAuth();
  const store = useStore(auth.user);
  const [tab, setTab] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setShowAdd(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Skip landing if already logged in or has visited before
  useEffect(() => {
    if (auth.user || store.onboarded) setShowLanding(false);
  }, [auth.user, store.onboarded]);

  const goTab = (i) => { setTab(i); setShowAdd(false); };
  const goToLogin = () => setShowLanding(false);

  // ─── Loading ───
  if (auth.loading) {
    return (
      <Shell hidePadding>
        <div className="flex-1 bg-aub-gradient-deep flex flex-col items-center justify-center gap-5">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <Logo className="h-14" />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Loader2 size={22} className="text-terra animate-spin" />
          </motion.div>
        </div>
      </Shell>
    );
  }

  // ─── Landing Page (full-page, outside the phone shell) ───
  if (showLanding && !auth.user) {
    return (
      <>
        <LandingPage onGetStarted={goToLogin} onLogin={goToLogin} />
        <ToastProvider />
        <SpeedInsights />
        <Analytics />
      </>
    );
  }

  // ─── Onboarding ───
  if (!store.onboarded && !auth.user) {
    return (
      <Shell>
        <OnboardingScreen lang={store.lang} onComplete={store.completeOnboarding} />
      </Shell>
    );
  }

  // ─── Login ───
  if (!auth.user) {
    return (
      <Shell>
        <LoginScreen t={store.t} lang={store.lang} setLang={store.setLang} auth={auth} showToast={toast.info} />
      </Shell>
    );
  }

  // ─── Main app ───
  const storeWithLogout = { ...store, logout: auth.logout };

  const renderScreen = () => {
    if (showAdd) return <AddExpenseScreen key="add" store={store} onBack={() => setShowAdd(false)} showToast={toast.success} />;
    switch (tab) {
      case 0: return <HomeScreen key="home" store={store} showToast={toast.success} onAdd={() => setShowAdd(true)} />;
      case 1: return <BudgetScreen key="budget" store={store} />;
      case 2: return <SavingsScreen key="savings" store={store} showToast={toast.success} />;
      case 3: return <SettingsScreen key="settings" store={storeWithLogout} showToast={toast.success} />;
      default: return null;
    }
  };

  return (
    <Shell>
      <div className="flex-1 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div key={showAdd ? 'add' : `tab-${tab}`} {...pageTransition}
            className="flex-1 flex flex-col absolute inset-0">
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
      {!showAdd && <TabBar tabs={store.t('tabs')} active={tab} onNav={goTab} />}
    </Shell>
  );
}

function Shell({ children, hidePadding = false }) {
  return (
    <div role="application" aria-label="Gha₹Budget App"
      className="phone-frame w-full h-[100dvh] overflow-hidden relative bg-cotton flex flex-col font-body"
      style={hidePadding ? {} : { paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {children}
      <ToastProvider />
      <SpeedInsights />
      <Analytics />
    </div>
  );
}
