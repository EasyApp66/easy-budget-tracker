import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if we have a valid session from the reset link
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Ungültiger oder abgelaufener Link');
        navigate('/login');
      }
    };
    checkSession();
  }, [navigate]);

  const handleBack = () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    navigate('/login');
  };

  const handleResetPassword = async () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    setError('');

    if (!password || !confirmPassword) {
      setError('Bitte alle Felder ausfüllen');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwörter stimmen nicht überein');
      return;
    }

    if (password.length < 6) {
      setError('Passwort muss mindestens 6 Zeichen lang sein');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        toast.success('Passwort wurde erfolgreich geändert!');
        navigate('/login');
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8 safe-top">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center haptic-tap mb-8 animate-fade-in"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>

      {/* Title */}
      <div className="mb-8 animate-slide-up">
        <h1 className="text-display text-4xl text-foreground leading-tight">
          Neues Passwort
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Gib dein neues Passwort ein
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div>
          <label className="text-label text-sm text-foreground mb-2 block">Neues Passwort</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-card rounded-xl px-4 py-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div>
          <label className="text-label text-sm text-foreground mb-2 block">Passwort bestätigen</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-card rounded-xl px-4 py-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {error && (
          <p className="text-destructive text-sm text-center">{error}</p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-8 space-y-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <button
          onClick={handleResetPassword}
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground font-bold text-lg py-5 rounded-2xl haptic-tap transition-all active:scale-98 disabled:opacity-50"
        >
          {isLoading ? 'Wird gespeichert...' : 'Passwort speichern'}
        </button>
      </div>
    </div>
  );
}
