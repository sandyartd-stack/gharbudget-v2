import { useState, useEffect } from 'react';
import useStore from './hooks/useStore';
import useToast from './hooks/useToast';
import TabBar from './components/TabBar';
import Toast from './components/Toast';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import BudgetScreen from './screens/BudgetScreen';
import SavingsScreen from './screens/SavingsScreen';
import SettingsScreen from './screens/SettingsScreen';

export default function App() {
  const store = useStore();
  const toast = useToast();
  const [tab, setTab] = useState(0);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setShowAdd(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const goTab = (i) => { setTab(i); setShowAdd(false); };

  // Step 1: Onboarding (first time only)
  if (!store.onboarded) {
    return (
      <Shell>
        <OnboardingScreen lang={store.lang} onComplete={store.completeOnboarding} />
        <Toast message={toast.message} visible={toast.visible} />
      </Shell>
    );
  }

  // Step 2: Login
  if (!store.loggedIn) {
    return (
      <Shell>
        <LoginScreen t={store.t} lang={store.lang} setLang={store.setLang} onLogin={store.login} showToast={toast.show} />
        <Toast message={toast.message} visible={toast.visible} />
      </Shell>
    );
  }

  // Step 3: Main app
  const renderScreen = () => {
    if (showAdd) return <AddExpenseScreen store={store} onBack={() => setShowAdd(false)} showToast={toast.show} />;
    switch (tab) {
      case 0: return <HomeScreen store={store} showToast={toast.show} onAdd={() => setShowAdd(true)} />;
      case 1: return <BudgetScreen store={store} />;
      case 2: return <SavingsScreen store={store} showToast={toast.show} />;
      case 3: return <SettingsScreen store={store} showToast={toast.show} />;
      default: return null;
    }
  };

  return (
    <Shell>
      <div className="flex-1 relative overflow-hidden flex flex-col">{renderScreen()}</div>
      {!showAdd && <TabBar tabs={store.t('tabs')} active={tab} onNav={goTab} />}
      <Toast message={toast.message} visible={toast.visible} />
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div role="application" aria-label="Gha₹Budget App"
      className="phone-frame w-full h-[100dvh] overflow-hidden relative bg-cotton
        flex flex-col font-body"
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {children}
    </div>
  );
}
