import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  pinned: boolean;
}

export interface Month {
  id: string;
  name: string;
  pinned: boolean;
  budget: number;
  expenses: Expense[];
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  pinned: boolean;
}

export interface User {
  email: string;
  username: string;
  isPremium: boolean;
}

interface AppContextType {
  // Auth state
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
  
  // Language
  language: 'DE' | 'EN';
  toggleLanguage: () => void;
  
  // Months & Expenses
  months: Month[];
  activeMonthId: string | null;
  addMonth: (name: string) => boolean;
  deleteMonth: (id: string) => void;
  editMonthName: (id: string, name: string) => void;
  duplicateMonth: (id: string) => void;
  pinMonth: (id: string) => void;
  setActiveMonth: (id: string) => void;
  
  // Expenses
  addExpense: (name: string, amount: number) => boolean;
  deleteExpense: (id: string) => void;
  editExpense: (id: string, name?: string, amount?: number) => void;
  duplicateExpense: (id: string) => void;
  pinExpense: (id: string) => void;
  
  // Budget
  setBudget: (amount: number) => void;
  
  // Subscriptions
  subscriptions: Subscription[];
  addSubscription: (name: string, amount: number) => boolean;
  deleteSubscription: (id: string) => void;
  editSubscription: (id: string, name?: string, amount?: number) => void;
  duplicateSubscription: (id: string) => void;
  pinSubscription: (id: string) => void;
  
  // Premium
  showPremiumPopup: boolean;
  setShowPremiumPopup: (show: boolean) => void;
  checkPremiumLimit: (type: 'expense' | 'month' | 'subscription') => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ADMIN_EMAIL = 'mirosnic.ivan@icloud.com';
const ADMIN_PASSWORD = 'Gmh786cGFxqcmscQfofm#okp?QfEF5K4HM!pR3fo';

const FREE_LIMITS = {
  expenses: 8,
  months: 2,
  subscriptions: 5,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<'DE' | 'EN'>('DE');
  const [months, setMonths] = useState<Month[]>([]);
  const [activeMonthId, setActiveMonthId] = useState<string | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('easybudget_user');
    const savedMonths = localStorage.getItem('easybudget_months');
    const savedSubscriptions = localStorage.getItem('easybudget_subscriptions');
    const savedActiveMonth = localStorage.getItem('easybudget_activeMonth');
    const savedLanguage = localStorage.getItem('easybudget_language');

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
    if (savedMonths) setMonths(JSON.parse(savedMonths));
    if (savedSubscriptions) setSubscriptions(JSON.parse(savedSubscriptions));
    if (savedActiveMonth) setActiveMonthId(savedActiveMonth);
    if (savedLanguage) setLanguage(savedLanguage as 'DE' | 'EN');
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (user) localStorage.setItem('easybudget_user', JSON.stringify(user));
    else localStorage.removeItem('easybudget_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('easybudget_months', JSON.stringify(months));
  }, [months]);

  useEffect(() => {
    localStorage.setItem('easybudget_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    if (activeMonthId) localStorage.setItem('easybudget_activeMonth', activeMonthId);
  }, [activeMonthId]);

  useEffect(() => {
    localStorage.setItem('easybudget_language', language);
  }, [language]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const login = (email: string, password: string): boolean => {
    const isPremium = email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
    const newUser: User = {
      email,
      username: email.split('@')[0],
      isPremium,
    };
    setUser(newUser);
    setIsLoggedIn(true);
    return true;
  };

  const register = (email: string, password: string): boolean => {
    const newUser: User = {
      email,
      username: email.split('@')[0],
      isPremium: false,
    };
    setUser(newUser);
    setIsLoggedIn(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('easybudget_user');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'DE' ? 'EN' : 'DE');
  };

  const checkPremiumLimit = (type: 'expense' | 'month' | 'subscription'): boolean => {
    if (user?.isPremium) return true;
    
    switch (type) {
      case 'expense':
        const activeMonth = months.find(m => m.id === activeMonthId);
        return !activeMonth || activeMonth.expenses.length < FREE_LIMITS.expenses;
      case 'month':
        return months.length < FREE_LIMITS.months;
      case 'subscription':
        return subscriptions.length < FREE_LIMITS.subscriptions;
      default:
        return true;
    }
  };

  // Month functions
  const addMonth = (name: string): boolean => {
    if (!checkPremiumLimit('month')) {
      setShowPremiumPopup(true);
      return false;
    }
    const newMonth: Month = {
      id: generateId(),
      name,
      pinned: false,
      budget: 0,
      expenses: [],
    };
    setMonths(prev => [...prev, newMonth]);
    if (!activeMonthId) setActiveMonthId(newMonth.id);
    return true;
  };

  const deleteMonth = (id: string) => {
    setMonths(prev => prev.filter(m => m.id !== id));
    if (activeMonthId === id) {
      const remaining = months.filter(m => m.id !== id);
      setActiveMonthId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const editMonthName = (id: string, name: string) => {
    setMonths(prev => prev.map(m => m.id === id ? { ...m, name } : m));
  };

  const duplicateMonth = (id: string) => {
    if (!checkPremiumLimit('month')) {
      setShowPremiumPopup(true);
      return;
    }
    const month = months.find(m => m.id === id);
    if (month) {
      const newMonth: Month = {
        ...month,
        id: generateId(),
        name: `${month.name} (Kopie)`,
        pinned: false,
      };
      setMonths(prev => [...prev, newMonth]);
    }
  };

  const pinMonth = (id: string) => {
    setMonths(prev => prev.map(m => m.id === id ? { ...m, pinned: !m.pinned } : m));
  };

  const setActiveMonth = (id: string) => {
    setActiveMonthId(id);
  };

  // Expense functions
  const addExpense = (name: string, amount: number): boolean => {
    if (!activeMonthId) return false;
    if (!checkPremiumLimit('expense')) {
      setShowPremiumPopup(true);
      return false;
    }
    const newExpense: Expense = {
      id: generateId(),
      name,
      amount,
      pinned: false,
    };
    setMonths(prev => prev.map(m => 
      m.id === activeMonthId 
        ? { ...m, expenses: [...m.expenses, newExpense] }
        : m
    ));
    return true;
  };

  const deleteExpense = (id: string) => {
    setMonths(prev => prev.map(m => ({
      ...m,
      expenses: m.expenses.filter(e => e.id !== id),
    })));
  };

  const editExpense = (id: string, name?: string, amount?: number) => {
    setMonths(prev => prev.map(m => ({
      ...m,
      expenses: m.expenses.map(e => 
        e.id === id 
          ? { ...e, ...(name !== undefined && { name }), ...(amount !== undefined && { amount }) }
          : e
      ),
    })));
  };

  const duplicateExpense = (id: string) => {
    if (!checkPremiumLimit('expense')) {
      setShowPremiumPopup(true);
      return;
    }
    const activeMonth = months.find(m => m.id === activeMonthId);
    const expense = activeMonth?.expenses.find(e => e.id === id);
    if (expense && activeMonthId) {
      const newExpense: Expense = {
        ...expense,
        id: generateId(),
        pinned: false,
      };
      setMonths(prev => prev.map(m => 
        m.id === activeMonthId 
          ? { ...m, expenses: [...m.expenses, newExpense] }
          : m
      ));
    }
  };

  const pinExpense = (id: string) => {
    setMonths(prev => prev.map(m => ({
      ...m,
      expenses: m.expenses.map(e => 
        e.id === id ? { ...e, pinned: !e.pinned } : e
      ),
    })));
  };

  const setBudget = (amount: number) => {
    if (!activeMonthId) return;
    setMonths(prev => prev.map(m => 
      m.id === activeMonthId ? { ...m, budget: amount } : m
    ));
  };

  // Subscription functions
  const addSubscription = (name: string, amount: number): boolean => {
    if (!checkPremiumLimit('subscription')) {
      setShowPremiumPopup(true);
      return false;
    }
    const newSub: Subscription = {
      id: generateId(),
      name,
      amount,
      pinned: false,
    };
    setSubscriptions(prev => [...prev, newSub]);
    return true;
  };

  const deleteSubscription = (id: string) => {
    setSubscriptions(prev => prev.filter(s => s.id !== id));
  };

  const editSubscription = (id: string, name?: string, amount?: number) => {
    setSubscriptions(prev => prev.map(s => 
      s.id === id 
        ? { ...s, ...(name !== undefined && { name }), ...(amount !== undefined && { amount }) }
        : s
    ));
  };

  const duplicateSubscription = (id: string) => {
    if (!checkPremiumLimit('subscription')) {
      setShowPremiumPopup(true);
      return;
    }
    const sub = subscriptions.find(s => s.id === id);
    if (sub) {
      const newSub: Subscription = {
        ...sub,
        id: generateId(),
        pinned: false,
      };
      setSubscriptions(prev => [...prev, newSub]);
    }
  };

  const pinSubscription = (id: string) => {
    setSubscriptions(prev => prev.map(s => 
      s.id === id ? { ...s, pinned: !s.pinned } : s
    ));
  };

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      user,
      login,
      register,
      logout,
      language,
      toggleLanguage,
      months,
      activeMonthId,
      addMonth,
      deleteMonth,
      editMonthName,
      duplicateMonth,
      pinMonth,
      setActiveMonth,
      addExpense,
      deleteExpense,
      editExpense,
      duplicateExpense,
      pinExpense,
      setBudget,
      subscriptions,
      addSubscription,
      deleteSubscription,
      editSubscription,
      duplicateSubscription,
      pinSubscription,
      showPremiumPopup,
      setShowPremiumPopup,
      checkPremiumLimit,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
