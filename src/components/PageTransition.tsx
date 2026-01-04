import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

// Define page order for swipe direction
const pageOrder = ['/budget', '/abos', '/profile'];

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionClass, setTransitionClass] = useState('page-enter');
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      const prevIndex = pageOrder.indexOf(prevPathRef.current);
      const nextIndex = pageOrder.indexOf(location.pathname);
      
      // Determine swipe direction based on page order
      // If going to a higher index, swipe left (next page comes from right)
      // If going to a lower index, swipe right (prev page comes from left)
      const goingForward = nextIndex > prevIndex || prevIndex === -1;
      
      // Exit animation
      setTransitionClass(goingForward ? 'page-exit-left' : 'page-exit-right');
      
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionClass(goingForward ? 'page-enter-from-right' : 'page-enter-from-left');
        prevPathRef.current = location.pathname;
      }, 300);

      return () => clearTimeout(timeout);
    } else {
      setDisplayChildren(children);
    }
  }, [children, location.pathname]);

  return (
    <div className={`page-transition ${transitionClass}`}>
      {displayChildren}
    </div>
  );
}
