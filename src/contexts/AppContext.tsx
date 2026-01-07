import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

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
  language: 'DE' | 'EN' | 'FR';
  setLanguage: (lang: 'DE' | 'EN' | 'FR') => void;
  
  // Months & Expenses
  months: Month[];
  activeMonthId: string | null;
  addMonth: (name: string) => Promise<boolean>;
  deleteMonth: (id: string) => Promise<void>;
  editMonthName: (id: string, name: string) => Promise<void>;
  duplicateMonth: (id: string) => Promise<void>;
  pinMonth: (id: string) => Promise<void>;
  setActiveMonth: (id: string) => Promise<void>;
  
  // Expenses
  addExpense: (name: string, amount: number) => Promise<boolean>;
  deleteExpense: (id: string) => Promise<void>;
  editExpense: (id: string, name?: string, amount?: number) => Promise<void>;
  duplicateExpense: (id: string) => Promise<void>;
  pinExpense: (id: string) => Promise<void>;
  
  // Budget
  setBudget: (amount: number) => Promise<void>;
  
  // Subscriptions
  subscriptions: Subscription[];
  addSubscription: (name: string, amount: number) => Promise<boolean>;
  deleteSubscription: (id: string) => Promise<void>;
  editSubscription: (id: string, name?: string, amount?: number) => Promise<void>;
  duplicateSubscription: (id: string) => Promise<void>;
  pinSubscription: (id: string) => Promise<void>;
  
  // Premium
  showPremiumPopup: boolean;
  setShowPremiumPopup: (show: boolean) => void;
  checkPremiumLimit: (type: 'expense' | 'month' | 'subscription') => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const FREE_LIMITS = {
  expenses: 6,  // Show paywall at 6+ expenses
  months: 2,    // Show paywall at 3+ months
  subscriptions: 5, // Show paywall at 6+ subscriptions
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguageState] = useState<'DE' | 'EN' | 'FR'>('DE');
  const [months, setMonths] = useState<Month[]>([]);
  const [activeMonthId, setActiveMonthIdState] = useState<string | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  // Fetch all user data from database
  const fetchUserData = useCallback(async (userId: string) => {
    try {
      // Fetch months with expenses
      const { data: monthsData, error: monthsError } = await supabase
        .from('months')
        .select('*')
        .eq('user_id', userId)
        .order('sort_order', { ascending: true });

      if (monthsError) {
        console.error('Error fetching months:', monthsError);
        return;
      }

      // Fetch expenses for all months
      const { data: expensesData, error: expensesError } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', userId)
        .order('sort_order', { ascending: true });

      if (expensesError) {
        console.error('Error fetching expenses:', expensesError);
        return;
      }

      // Fetch subscriptions
      const { data: subsData, error: subsError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .order('sort_order', { ascending: true });

      if (subsError) {
        console.error('Error fetching subscriptions:', subsError);
        return;
      }

      // Fetch user settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (settingsError) {
        console.error('Error fetching settings:', settingsError);
      }

      // Map months with their expenses
      const mappedMonths: Month[] = (monthsData || []).map(month => ({
        id: month.id,
        name: month.name,
        pinned: month.pinned,
        budget: Number(month.budget),
        expenses: (expensesData || [])
          .filter(e => e.month_id === month.id)
          .map(e => ({
            id: e.id,
            name: e.name,
            amount: Number(e.amount),
            pinned: e.pinned,
          })),
      }));

      setMonths(mappedMonths);
      setSubscriptions((subsData || []).map(s => ({
        id: s.id,
        name: s.name,
        amount: Number(s.amount),
        pinned: s.pinned,
      })));

      if (settingsData) {
        setLanguageState(settingsData.language as 'DE' | 'EN' | 'FR');
        setActiveMonthIdState(settingsData.active_month_id);
      } else if (mappedMonths.length > 0) {
        setActiveMonthIdState(mappedMonths[0].id);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  }, []);

  // Initialize auth
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        if (session?.user) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
            fetchUserData(session.user.id);
          }, 0);
        } else {
          setUser(null);
          setMonths([]);
          setSubscriptions([]);
          setActiveMonthIdState(null);
          setIsLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
        fetchUserData(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchUserData]);

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

  const login = async (email: string, password: string): Promise<{ error: string | null }> => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
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
      options: { emailRedirectTo: `${window.location.origin}/` },
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
    setMonths([]);
    setSubscriptions([]);
    setActiveMonthIdState(null);
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

  const setLanguage = async (newLang: 'DE' | 'EN' | 'FR') => {
    setLanguageState(newLang);
    
    if (session?.user) {
      await supabase
        .from('user_settings')
        .update({ language: newLang })
        .eq('user_id', session.user.id);
    }
  };

  const checkPremiumLimit = (type: 'expense' | 'month' | 'subscription'): boolean => {
    if (user?.isPremium) return true;
    
    switch (type) {
      case 'expense':
        const activeMonth = months.find(m => m.id === activeMonthId);
        // Show paywall when user has 6 or more expenses
        return !activeMonth || activeMonth.expenses.length < FREE_LIMITS.expenses;
      case 'month':
        // Show paywall when user tries to create 3rd month (already has 2)
        return months.length < FREE_LIMITS.months;
      case 'subscription':
        // Show paywall when user has more than 5 subscriptions
        return subscriptions.length <= FREE_LIMITS.subscriptions;
      default:
        return true;
    }
  };

  // Month functions
  const addMonth = async (name: string): Promise<boolean> => {
    if (!session?.user) return false;
    if (!checkPremiumLimit('month')) {
      setShowPremiumPopup(true);
      return false;
    }

    const { data, error } = await supabase
      .from('months')
      .insert({
        user_id: session.user.id,
        name,
        budget: 0,
        pinned: false,
        sort_order: months.length,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding month:', error);
      return false;
    }

    const newMonth: Month = {
      id: data.id,
      name: data.name,
      pinned: data.pinned,
      budget: Number(data.budget),
      expenses: [],
    };

    setMonths(prev => [...prev, newMonth]);
    
    if (!activeMonthId) {
      setActiveMonthIdState(newMonth.id);
      await supabase
        .from('user_settings')
        .update({ active_month_id: newMonth.id })
        .eq('user_id', session.user.id);
    }
    
    return true;
  };

  const deleteMonth = async (id: string) => {
    if (!session?.user) return;

    const { error } = await supabase
      .from('months')
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Error deleting month:', error);
      return;
    }

    setMonths(prev => prev.filter(m => m.id !== id));
    
    if (activeMonthId === id) {
      const remaining = months.filter(m => m.id !== id);
      const newActiveId = remaining.length > 0 ? remaining[0].id : null;
      setActiveMonthIdState(newActiveId);
      await supabase
        .from('user_settings')
        .update({ active_month_id: newActiveId })
        .eq('user_id', session.user.id);
    }
  };

  const editMonthName = async (id: string, name: string) => {
    if (!session?.user) return;

    const { error } = await supabase
      .from('months')
      .update({ name })
      .eq('id', id)
      .eq('user_id', session.user.id);

    if (!error) {
      setMonths(prev => prev.map(m => m.id === id ? { ...m, name } : m));
    }
  };

  const duplicateMonth = async (id: string) => {
    if (!session?.user) return;
    if (!checkPremiumLimit('month')) {
      setShowPremiumPopup(true);
      return;
    }

    const month = months.find(m => m.id === id);
    if (!month) return;

    const { data: newMonthData, error: monthError } = await supabase
      .from('months')
      .insert({
        user_id: session.user.id,
        name: `${month.name} (Kopie)`,
        budget: month.budget,
        pinned: false,
        sort_order: months.length,
      })
      .select()
      .single();

    if (monthError || !newMonthData) {
      console.error('Error duplicating month:', monthError);
      return;
    }

    // Duplicate expenses
    if (month.expenses.length > 0) {
      const expensesToInsert = month.expenses.map((e, i) => ({
        user_id: session.user.id,
        month_id: newMonthData.id,
        name: e.name,
        amount: e.amount,
        pinned: e.pinned,
        sort_order: i,
      }));

      const { data: newExpenses, error: expError } = await supabase
        .from('expenses')
        .insert(expensesToInsert)
        .select();

      if (expError) {
        console.error('Error duplicating expenses:', expError);
      }

      const newMonth: Month = {
        id: newMonthData.id,
        name: newMonthData.name,
        pinned: newMonthData.pinned,
        budget: Number(newMonthData.budget),
        expenses: (newExpenses || []).map(e => ({
          id: e.id,
          name: e.name,
          amount: Number(e.amount),
          pinned: e.pinned,
        })),
      };

      setMonths(prev => [...prev, newMonth]);
    } else {
      const newMonth: Month = {
        id: newMonthData.id,
        name: newMonthData.name,
        pinned: newMonthData.pinned,
        budget: Number(newMonthData.budget),
        expenses: [],
      };
      setMonths(prev => [...prev, newMonth]);
    }
  };

  const pinMonth = async (id: string) => {
    if (!session?.user) return;
    
    const month = months.find(m => m.id === id);
    if (!month) return;

    const newPinned = !month.pinned;
    const { error } = await supabase
      .from('months')
      .update({ pinned: newPinned })
      .eq('id', id)
      .eq('user_id', session.user.id);

    if (!error) {
      setMonths(prev => prev.map(m => m.id === id ? { ...m, pinned: newPinned } : m));
    }
  };

  const setActiveMonth = async (id: string) => {
    if (!session?.user) return;
    
    setActiveMonthIdState(id);
    await supabase
      .from('user_settings')
      .update({ active_month_id: id })
      .eq('user_id', session.user.id);
  };

  // Expense functions
  const addExpense = async (name: string, amount: number): Promise<boolean> => {
    if (!session?.user || !activeMonthId) return false;
    if (!checkPremiumLimit('expense')) {
      setShowPremiumPopup(true);
      return false;
    }

    const activeMonth = months.find(m => m.id === activeMonthId);
    const sortOrder = activeMonth ? activeMonth.expenses.length : 0;

    const { data, error } = await supabase
      .from('expenses')
      .insert({
        user_id: session.user.id,
        month_id: activeMonthId,
        name,
        amount,
        pinned: false,
        sort_order: sortOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding expense:', error);
      return false;
    }

    const newExpense: Expense = {
      id: data.id,
      name: data.name,
      amount: Number(data.amount),
      pinned: data.pinned,
    };

    setMonths(prev => prev.map(m => 
      m.id === activeMonthId 
        ? { ...m, expenses: [...m.expenses, newExpense] }
        : m
    ));
    
    return true;
  };

  const deleteExpense = async (id: string) => {
    if (!session?.user) return;

    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id);

    if (!error) {
      setMonths(prev => prev.map(m => ({
        ...m,
        expenses: m.expenses.filter(e => e.id !== id),
      })));
    }
  };

  const editExpense = async (id: string, name?: string, amount?: number) => {
    if (!session?.user) return;

    const updates: { name?: string; amount?: number } = {};
    if (name !== undefined) updates.name = name;
    if (amount !== undefined) updates.amount = amount;

    const { error } = await supabase
      .from('expenses')
      .update(updates)
      .eq('id', id)
      .eq('user_id', session.user.id);

    if (!error) {
      setMonths(prev => prev.map(m => ({
        ...m,
        expenses: m.expenses.map(e => 
          e.id === id 
            ? { ...e, ...(name !== undefined && { name }), ...(amount !== undefined && { amount }) }
            : e
        ),
      })));
    }
  };

  const duplicateExpense = async (id: string) => {
    if (!session?.user || !activeMonthId) return;
    if (!checkPremiumLimit('expense')) {
      setShowPremiumPopup(true);
      return;
    }

    const activeMonth = months.find(m => m.id === activeMonthId);
    const expense = activeMonth?.expenses.find(e => e.id === id);
    if (!expense) return;

    const { data, error } = await supabase
      .from('expenses')
      .insert({
        user_id: session.user.id,
        month_id: activeMonthId,
        name: expense.name,
        amount: expense.amount,
        pinned: false,
        sort_order: activeMonth.expenses.length,
      })
      .select()
      .single();

    if (error) {
      console.error('Error duplicating expense:', error);
      return;
    }

    const newExpense: Expense = {
      id: data.id,
      name: data.name,
      amount: Number(data.amount),
      pinned: data.pinned,
    };

    setMonths(prev => prev.map(m => 
      m.id === activeMonthId 
        ? { ...m, expenses: [...m.expenses, newExpense] }
        : m
    ));
  };

  const pinExpense = async (id: string) => {
    if (!session?.user) return;

    const expense = months.flatMap(m => m.expenses).find(e => e.id === id);
    if (!expense) return;

    const newPinned = !expense.pinned;
    const { error } = await supabase
      .from('expenses')
      .update({ pinned: newPinned })
      .eq('id', id)
      .eq('user_id', session.user.id);

    if (!error) {
      setMonths(prev => prev.map(m => ({
        ...m,
        expenses: m.expenses.map(e => 
          e.id === id ? { ...e, pinned: newPinned } : e
        ),
      })));
    }
  };

  const setBudget = async (amount: number) => {
    if (!session?.user || !activeMonthId) return;

    const { error } = await supabase
      .from('months')
      .update({ budget: amount })
      .eq('id', activeMonthId)
      .eq('user_id', session.user.id);

    if (!error) {
      setMonths(prev => prev.map(m => 
        m.id === activeMonthId ? { ...m, budget: amount } : m
      ));
    }
  };

  // Subscription functions
  const addSubscription = async (name: string, amount: number): Promise<boolean> => {
    if (!session?.user) return false;
    if (!checkPremiumLimit('subscription')) {
      setShowPremiumPopup(true);
      return false;
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: session.user.id,
        name,
        amount,
        pinned: false,
        sort_order: subscriptions.length,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding subscription:', error);
      return false;
    }

    const newSub: Subscription = {
      id: data.id,
      name: data.name,
      amount: Number(data.amount),
      pinned: data.pinned,
    };

    setSubscriptions(prev => [...prev, newSub]);
    return true;
  };

  const deleteSubscription = async (id: string) => {
    if (!session?.user) return;

    const { error } = await supabase
      .from('subscriptions')
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id);

    if (!error) {
      setSubscriptions(prev => prev.filter(s => s.id !== id));
    }
  };

  const editSubscription = async (id: string, name?: string, amount?: number) => {
    if (!session?.user) return;

    const updates: { name?: string; amount?: number } = {};
    if (name !== undefined) updates.name = name;
    if (amount !== undefined) updates.amount = amount;

    const { error } = await supabase
      .from('subscriptions')
      .update(updates)
      .eq('id', id)
      .eq('user_id', session.user.id);

    if (!error) {
      setSubscriptions(prev => prev.map(s => 
        s.id === id 
          ? { ...s, ...(name !== undefined && { name }), ...(amount !== undefined && { amount }) }
          : s
      ));
    }
  };

  const duplicateSubscription = async (id: string) => {
    if (!session?.user) return;
    if (!checkPremiumLimit('subscription')) {
      setShowPremiumPopup(true);
      return;
    }

    const sub = subscriptions.find(s => s.id === id);
    if (!sub) return;

    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: session.user.id,
        name: sub.name,
        amount: sub.amount,
        pinned: false,
        sort_order: subscriptions.length,
      })
      .select()
      .single();

    if (error) {
      console.error('Error duplicating subscription:', error);
      return;
    }

    const newSub: Subscription = {
      id: data.id,
      name: data.name,
      amount: Number(data.amount),
      pinned: data.pinned,
    };

    setSubscriptions(prev => [...prev, newSub]);
  };

  const pinSubscription = async (id: string) => {
    if (!session?.user) return;

    const sub = subscriptions.find(s => s.id === id);
    if (!sub) return;

    const newPinned = !sub.pinned;
    const { error } = await supabase
      .from('subscriptions')
      .update({ pinned: newPinned })
      .eq('id', id)
      .eq('user_id', session.user.id);

    if (!error) {
      setSubscriptions(prev => prev.map(s => 
        s.id === id ? { ...s, pinned: newPinned } : s
      ));
    }
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
      setLanguage,
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
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
