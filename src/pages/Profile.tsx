import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  LogOut, 
  Globe, 
  RefreshCw, 
  Star, 
  FileText, 
  Shield, 
  Lock, 
  Building, 
  HelpCircle, 
  Bug, 
  Lightbulb, 
  Heart,
  ChevronRight,
  Pencil
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { BottomNav } from '@/components/BottomNav';
import { PremiumPopup } from '@/components/PremiumPopup';
import { 
  AGBDialog, 
  NutzungsbedingungenDialog, 
  DatenschutzDialog, 
  ImpressumDialog 
} from '@/components/LegalDialogs';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, language, toggleLanguage, setShowPremiumPopup, updateUsername } = useApp();
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user?.username || '');
  const [showAGB, setShowAGB] = useState(false);
  const [showNutzungsbedingungen, setShowNutzungsbedingungen] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);

  const handleLogout = async () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    await logout();
    navigate('/');
  };

  const handlePremiumRestore = async () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    await logout();
    navigate('/');
  };

  const handleSaveName = async () => {
    if (editedName.trim()) {
      await updateUsername(editedName.trim());
    }
    setIsEditingName(false);
  };

  const menuItems = [
    {
      icon: LogOut,
      label: 'Ausloggen',
      onClick: handleLogout,
      iconColor: 'text-primary',
    },
    {
      icon: Globe,
      label: `Sprache ändern: ${language === 'DE' ? 'Deutsch' : 'English'}`,
      onClick: toggleLanguage,
      iconColor: 'text-primary',
    },
    {
      icon: RefreshCw,
      label: 'Premium Wiederherstellen',
      onClick: handlePremiumRestore,
      iconColor: 'text-primary',
    },
    {
      icon: Star,
      label: 'Premium Kaufen',
      onClick: () => setShowPremiumPopup(true),
      iconColor: 'text-primary',
    },
    {
      icon: FileText,
      label: 'AGB',
      onClick: () => setShowAGB(true),
      iconColor: 'text-muted-foreground',
    },
    {
      icon: Shield,
      label: 'Nutzungsbedingungen',
      onClick: () => setShowNutzungsbedingungen(true),
      iconColor: 'text-muted-foreground',
    },
    {
      icon: Lock,
      label: 'Datenschutz',
      onClick: () => setShowDatenschutz(true),
      iconColor: 'text-muted-foreground',
    },
    {
      icon: Building,
      label: 'Impressum',
      onClick: () => setShowImpressum(true),
      iconColor: 'text-muted-foreground',
    },
    {
      icon: HelpCircle,
      label: 'Support',
      onClick: () => window.open('mailto:support@easybudget.app'),
      iconColor: 'text-muted-foreground',
    },
    {
      icon: Bug,
      label: 'Bug Melden',
      onClick: () => window.open('mailto:bugs@easybudget.app'),
      iconColor: 'text-muted-foreground',
    },
    {
      icon: Lightbulb,
      label: 'Vorschlag',
      onClick: () => window.open('mailto:feedback@easybudget.app'),
      iconColor: 'text-muted-foreground',
    },
    {
      icon: Heart,
      label: 'Donation',
      onClick: () => {},
      iconColor: 'text-destructive',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-32 safe-top">
      <div className="px-4 pt-6 space-y-4">
        {/* Profile Card */}
        <div className="bg-card rounded-3xl p-6 flex flex-col items-center animate-slide-up">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-4 ring-4 ring-primary/30">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>

          {/* Editable Username */}
          {isEditingName ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={handleSaveName}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              autoFocus
              className="text-display text-2xl text-foreground text-center mb-1 bg-transparent border-b-2 border-primary outline-none"
              placeholder="Name eingeben"
            />
          ) : (
            <button
              onClick={() => {
                setEditedName(user?.username || '');
                setIsEditingName(true);
              }}
              className="flex items-center gap-2 mb-1 group"
            >
              <h2 className="text-display text-2xl text-foreground text-center">
                {user?.username || 'Name eingeben'}
              </h2>
              <Pencil className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}

          {/* Hint text */}
          <p className="text-muted-foreground text-sm text-center mb-4">
            Tippe um Namen zu ändern
          </p>

          {/* Premium Status */}
          <div className="bg-secondary rounded-full px-6 py-2">
            <p className="text-foreground font-semibold">
              Premium: {user?.isPremium ? 'Ja' : 'Nein'}
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2 animate-slide-up" style={{ animationDelay: '50ms' }}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if ('vibrate' in navigator) navigator.vibrate(10);
                item.onClick();
              }}
              className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 haptic-tap transition-all hover:bg-card/80"
            >
              <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center ${item.iconColor}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-foreground font-semibold flex-1 text-left">{item.label}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center py-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <p className="text-muted-foreground text-sm">Version 1.0.0</p>
          <p className="text-muted-foreground text-sm mt-1">
            Made with <span className="text-destructive">❤️</span>
          </p>
        </div>
      </div>

      <BottomNav onAddClick={() => {}} />
      <PremiumPopup />
      
      {/* Legal Dialogs */}
      <AGBDialog open={showAGB} onOpenChange={setShowAGB} />
      <NutzungsbedingungenDialog open={showNutzungsbedingungen} onOpenChange={setShowNutzungsbedingungen} />
      <DatenschutzDialog open={showDatenschutz} onOpenChange={setShowDatenschutz} />
      <ImpressumDialog open={showImpressum} onOpenChange={setShowImpressum} />
    </div>
  );
}
