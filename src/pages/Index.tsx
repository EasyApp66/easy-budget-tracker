import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

const Index = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useApp();

  useEffect(() => {
    // Redirect based on auth state
    if (isLoggedIn) {
      navigate('/budget');
    } else {
      navigate('/welcome');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse">
        <p className="text-display text-4xl text-primary">EASY BUDGET</p>
      </div>
    </div>
  );
};

export default Index;
