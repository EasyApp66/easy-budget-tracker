import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

// Route order for determining slide direction
const routeOrder = ['/', '/welcome', '/login', '/reset-password', '/budget', '/abos', '/profile', '/payment-success'];

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionClass, setTransitionClass] = useState('page-enter');
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath) {
      const prevIndex = routeOrder.indexOf(prevPath);
      const currentIndex = routeOrder.indexOf(location.pathname);
      
      // Determine direction based on route order
      const isForward = currentIndex > prevIndex || prevIndex === -1;
      
      // Exit animation
      setTransitionClass(isForward ? 'page-exit-left' : 'page-exit-right');
      
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionClass(isForward ? 'page-enter-right' : 'page-enter-left');
        setPrevPath(location.pathname);
      }, 150);

      return () => clearTimeout(timeout);
    } else {
      setDisplayChildren(children);
    }
  }, [children, location.pathname, prevPath]);

  return (
    <div className={`page-transition ${transitionClass}`}>
      {displayChildren}
    </div>
  );
};

export default PageTransition;
