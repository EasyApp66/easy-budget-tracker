import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

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

export interface UserProfile {
  email: string;
  username: string;
  isPremium: boolean;
}

interface AppContextType {
  // Auth state
  isLoggedIn: boolean;
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  updateUsername: (username: string) => Promise<void>;
  
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

const FREE_LIMITS = {
  expenses: 8,
  months: 2,
  subscriptions: 5,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<'DE' | 'EN'>('DE');
  const [months, setMonths] = useState<Month[]>(() => {
    const saved = localStorage.getItem('easybudget_months');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 'default-jan', name: 'JANUAR', pinned: false, budget: 0, expenses: [] },
      { id: 'default-feb', name: 'FEBRUAR', pinned: false, budget: 0, expenses: [] },
    ];
  });
  const [activeMonthId, setActiveMonthId] = useState<string | null>(() => {
    const saved = localStorage.getItem('easybudget_activeMonth');
    if (saved) return saved;
    return 'default-jan';
  });
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  // Initialize auth
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Defer profile fetch to avoid deadlock
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, is_premium')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        setUser(null);
      } else if (data) {
        const authUser = session?.user;
        setUser({
          email: authUser?.email || '',
          username: data.username || authUser?.email?.split('@')[0] || '',
          isPremium: data.is_premium || false,
        });
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load from localStorage
  useEffect(() => {
    const savedSubscriptions = localStorage.getItem('easybudget_subscriptions');
    const savedLanguage = localStorage.getItem('easybudget_language');

    if (savedSubscriptions) setSubscriptions(JSON.parse(savedSubscriptions));
    if (savedLanguage) setLanguage(savedLanguage as 'DE' | 'EN');
  }, []);

  // Save to localStorage
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

  const login = async (email: string, password: string): Promise<{ error: string | null }> => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      setIsLoading(false);
      if (error.message.includes('Invalid login credentials')) {
        return { error: 'E-Mail oder Passwort ist falsch' };
      }
      return { error: error.message };
    }
    
    return { error: null };
  };

  const register = async (email: string, password: string): Promise<{ error: string | null }> => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    
    if (error) {
      setIsLoading(false);
      if (error.message.includes('already registered')) {
        return { error: 'Diese E-Mail ist bereits registriert' };
      }
      return { error: error.message };
    }
    
    return { error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const updateUsername = async (username: string) => {
    if (!session?.user) return;
    
    const { error } = await supabase
      .from('profiles')
      .update({ username })
      .eq('user_id', session.user.id);
    
    if (!error && user) {
      setUser({ ...user, username });
    }
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

  const isLoggedIn = !!session;

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      user,
      isLoading,
      login,
      register,
      logout,
      updateUsername,
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
