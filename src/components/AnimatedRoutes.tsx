import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigation } from '@/contexts/NavigationContext';
import Index from '@/pages/Index';
import Welcome from '@/pages/Welcome';
import Login from '@/pages/Login';
import Budget from '@/pages/Budget';
import Abos from '@/pages/Abos';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';

const pageVariants = {
  enterFromRight: {
    x: '15%',
    opacity: 0,
  },
  enterFromLeft: {
    x: '-15%',
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exitToLeft: {
    x: '-15%',
    opacity: 0,
  },
  exitToRight: {
    x: '15%',
    opacity: 0,
  },
};

const pageTransition = {
  type: 'tween' as const,
  ease: [0.25, 0.1, 0.25, 1] as const,
  duration: 0.15,
};

export function AnimatedRoutes() {
  const location = useLocation();
  const { direction } = useNavigation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={direction === 'forward' ? 'enterFromRight' : 'enterFromLeft'}
        animate="center"
        exit={direction === 'forward' ? 'exitToLeft' : 'exitToRight'}
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen pb-24"
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/abos" element={<Abos />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}
