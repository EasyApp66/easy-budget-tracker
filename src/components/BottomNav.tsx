import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DollarSign, RefreshCw, User, Plus } from 'lucide-react';

interface BottomNavProps {
  onAddClick: () => void;
}

export function BottomNav({ onAddClick }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/budget', icon: DollarSign, label: 'Budget' },
    { path: '/abos', icon: RefreshCw, label: 'Abos' },
    { path: '/profile', icon: User, label: 'Profil' },
  ];

  const handleNavClick = (path: string) => {
    // Trigger haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    navigate(path);
  };

  const handleAddClick = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    onAddClick();
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 pb-safe mb-2">
      <div className="flex items-center gap-1 bg-secondary/80 backdrop-blur-xl rounded-full px-2 py-2 border border-border/20">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => handleNavClick(path)}
              className={`
                flex flex-col items-center justify-center px-5 py-2 rounded-full transition-all duration-200 haptic-tap
                ${isActive 
                  ? 'bg-secondary text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
              <span className="text-xs mt-0.5 font-medium">{label}</span>
            </button>
          );
        })}
        
        <button
          onClick={handleAddClick}
          className="w-12 h-12 rounded-full bg-primary flex items-center justify-center ml-1 haptic-tap shadow-lg shadow-primary/30"
        >
          <Plus className="w-6 h-6 text-primary-foreground" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
