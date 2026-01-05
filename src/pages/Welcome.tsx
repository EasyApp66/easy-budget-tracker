import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Apple } from 'lucide-react';
import { AGBDialog, NutzungsbedingungenDialog, DatenschutzDialog } from '@/components/LegalDialogs';

export default function Welcome() {
  const navigate = useNavigate();
  const [showNutzungsbedingungen, setShowNutzungsbedingungen] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const [showAGB, setShowAGB] = useState(false);

  const handleEmailClick = () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    navigate('/login');
  };

  const handleAppleClick = () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-12 safe-top">
      {/* Hero Text */}
      <div className="flex-1 flex flex-col justify-center">
        <div>
          <p className="text-display text-3xl text-foreground leading-tight">
            Hallo! Ich bin
          </p>
          <h1 className="text-display text-4xl text-primary leading-tight mt-1">
            EASY BUDGET
          </h1>
        </div>

        <div className="mt-12">
          <p className="text-display text-5xl text-foreground leading-tight">
            Tracke
          </p>
          <p className="text-display text-5xl text-foreground leading-tight">
            dein
          </p>
          <p className="text-display text-6xl text-primary leading-tight">
            BUDGET
          </p>
        </div>

        <div className="mt-4">
          <p className="text-display text-5xl text-foreground leading-tight">
            und deine
          </p>
          <p className="text-display text-6xl text-primary leading-tight">
            ABOS
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-4 mb-8">
        <button
          onClick={handleEmailClick}
          className="w-full bg-primary text-primary-foreground font-bold text-lg py-5 rounded-2xl flex items-center justify-center gap-3 haptic-tap transition-all active:scale-98"
        >
          <Mail className="w-5 h-5" />
          Mit E-Mail fortfahren
        </button>

        <button
          onClick={handleAppleClick}
          className="w-full bg-foreground text-background font-bold text-lg py-5 rounded-2xl flex items-center justify-center gap-3 haptic-tap transition-all active:scale-98"
        >
          <Apple className="w-5 h-5" />
          Mit Apple fortfahren
        </button>

        <button
          onClick={() => {
            if ('vibrate' in navigator) navigator.vibrate(10);
            navigate('/login');
          }}
          className="w-full bg-card border border-border text-foreground font-bold text-lg py-5 rounded-2xl flex items-center justify-center gap-3 haptic-tap transition-all active:scale-98"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Mit Google fortfahren
        </button>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Indem du fortfährst, bestätigst du, dass du die{' '}
          <button 
            onClick={() => setShowNutzungsbedingungen(true)}
            className="text-primary underline"
          >
            Nutzungsbedingungen
          </button>
          {' '}und die{' '}
          <button 
            onClick={() => setShowDatenschutz(true)}
            className="text-primary underline"
          >
            Datenschutzerklärung
          </button>
          {' '}und die{' '}
          <button 
            onClick={() => setShowAGB(true)}
            className="text-primary underline"
          >
            AGBs
          </button>
          {' '}gelesen hast.
        </p>
      </div>

      {/* Legal Dialogs */}
      <NutzungsbedingungenDialog 
        open={showNutzungsbedingungen} 
        onOpenChange={setShowNutzungsbedingungen} 
      />
      <DatenschutzDialog 
        open={showDatenschutz} 
        onOpenChange={setShowDatenschutz} 
      />
      <AGBDialog 
        open={showAGB} 
        onOpenChange={setShowAGB} 
      />
    </div>
  );
}
