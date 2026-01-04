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
        <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>
          <p className="text-display text-3xl text-foreground leading-tight">
            Hallo! Ich bin
          </p>
          <h1 className="text-display text-4xl text-primary leading-tight mt-1">
            EASY BUDGET
          </h1>
        </div>

        <div className="mt-12 animate-slide-up" style={{ animationDelay: '100ms' }}>
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

        <div className="mt-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <p className="text-display text-5xl text-foreground leading-tight">
            und deine
          </p>
          <p className="text-display text-6xl text-primary leading-tight">
            ABOS
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-4 mb-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
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
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '400ms' }}>
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
