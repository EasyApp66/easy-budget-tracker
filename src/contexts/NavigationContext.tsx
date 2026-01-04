import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type NavigationDirection = 'forward' | 'backward';

interface NavigationContextType {
  direction: NavigationDirection;
  navigateTo: (path: string) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Define route order for determining navigation direction
const routeOrder = ['/welcome', '/login', '/budget', '/abos', '/profile'];

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [direction, setDirection] = useState<NavigationDirection>('forward');
  const historyStack = useRef<string[]>([]);

  const getRouteIndex = (path: string) => {
    const index = routeOrder.indexOf(path);
    return index === -1 ? routeOrder.length : index;
  };

  const navigateTo = useCallback((path: string) => {
    const currentIndex = getRouteIndex(location.pathname);
    const targetIndex = getRouteIndex(path);
    
    // Determine direction based on route order
    const newDirection = targetIndex >= currentIndex ? 'forward' : 'backward';
    setDirection(newDirection);
    
    // Add current path to history
    historyStack.current.push(location.pathname);
    
    navigate(path);
  }, [navigate, location.pathname]);

  const goBack = useCallback(() => {
    setDirection('backward');
    
    if (historyStack.current.length > 0) {
      const previousPath = historyStack.current.pop();
      if (previousPath) {
        navigate(previousPath);
        return;
      }
    }
    
    navigate(-1);
  }, [navigate]);

  return (
    <NavigationContext.Provider value={{ direction, navigateTo, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
