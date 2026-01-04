import { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useNavigation } from '@/contexts/NavigationContext';

const Index = () => {
  const { navigateTo } = useNavigation();
  const { isLoggedIn } = useApp();

  useEffect(() => {
    // Redirect based on auth state
    if (isLoggedIn) {
      navigateTo('/budget');
    } else {
      navigateTo('/welcome');
    }
  }, [isLoggedIn, navigateTo]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse">
        <p className="text-display text-4xl text-primary">EASY BUDGET</p>
      </div>
    </div>
  );
};

export default Index;
