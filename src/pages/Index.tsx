import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

const Index = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useApp();

  useEffect(() => {
    // Wait until auth state is determined
    if (isLoading) return;
    
    // Redirect based on auth state
    if (isLoggedIn) {
      navigate('/budget', { replace: true });
    } else {
      navigate('/welcome', { replace: true });
    }
  }, [isLoggedIn, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse">
        <p className="text-display text-4xl text-primary">EASY BUDGET</p>
      </div>
    </div>
  );
};

export default Index;
