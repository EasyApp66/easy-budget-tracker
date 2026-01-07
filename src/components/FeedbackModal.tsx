import React, { useState } from 'react';
import { X, Send, Loader2, HelpCircle, Bug, Lightbulb } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'support' | 'bug' | 'suggestion';
}

export function FeedbackModal({ isOpen, onClose, type }: FeedbackModalProps) {
  const { language, user } = useApp();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const content = {
    DE: {
      support: { title: 'Support Anfrage', placeholder: 'Beschreibe dein Problem...' },
      bug: { title: 'Bug Melden', placeholder: 'Beschreibe den Fehler...' },
      suggestion: { title: 'Vorschlag', placeholder: 'Teile deine Idee...' },
      send: 'Senden',
      success: 'Nachricht gesendet!',
      error: 'Fehler beim Senden',
    },
    EN: {
      support: { title: 'Support Request', placeholder: 'Describe your issue...' },
      bug: { title: 'Report Bug', placeholder: 'Describe the bug...' },
      suggestion: { title: 'Suggestion', placeholder: 'Share your idea...' },
      send: 'Send',
      success: 'Message sent!',
      error: 'Error sending message',
    },
    FR: {
      support: { title: 'Demande de support', placeholder: 'Décrivez votre problème...' },
      bug: { title: 'Signaler un bug', placeholder: 'Décrivez le bug...' },
      suggestion: { title: 'Suggestion', placeholder: 'Partagez votre idée...' },
      send: 'Envoyer',
      success: 'Message envoyé!',
      error: "Erreur lors de l'envoi",
    },
    IT: {
      support: { title: 'Richiesta supporto', placeholder: 'Descrivi il tuo problema...' },
      bug: { title: 'Segnala bug', placeholder: 'Descrivi il bug...' },
      suggestion: { title: 'Suggerimento', placeholder: 'Condividi la tua idea...' },
      send: 'Invia',
      success: 'Messaggio inviato!',
      error: "Errore durante l'invio",
    },
    ES: {
      support: { title: 'Solicitud de soporte', placeholder: 'Describe tu problema...' },
      bug: { title: 'Reportar error', placeholder: 'Describe el error...' },
      suggestion: { title: 'Sugerencia', placeholder: 'Comparte tu idea...' },
      send: 'Enviar',
      success: '¡Mensaje enviado!',
      error: 'Error al enviar',
    },
    PT: {
      support: { title: 'Solicitação de suporte', placeholder: 'Descreva seu problema...' },
      bug: { title: 'Reportar erro', placeholder: 'Descreva o erro...' },
      suggestion: { title: 'Sugestão', placeholder: 'Compartilhe sua ideia...' },
      send: 'Enviar',
      success: 'Mensagem enviada!',
      error: 'Erro ao enviar',
    },
  };

  const t = content[language];
  const typeContent = t[type];

  const icons = {
    support: HelpCircle,
    bug: Bug,
    suggestion: Lightbulb,
  };
  const Icon = icons[type];

  const handleSubmit = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('send-feedback', {
        body: {
          type,
          message: message.trim(),
          userEmail: user?.email || 'unknown',
          userName: user?.username,
        },
      });

      if (error) throw error;

      toast.success(t.success);
      setMessage('');
      onClose();
    } catch (err) {
      console.error('Error sending feedback:', err);
      toast.error(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in p-6">
      <div className="bg-popover rounded-3xl w-full max-w-sm animate-scale-in relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground flex items-center justify-center haptic-tap"
        >
          <X className="w-5 h-5 text-background" />
        </button>

        <div className="p-6 pt-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h2 className="text-title text-2xl text-center mb-6">{typeContent.title}</h2>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={typeContent.placeholder}
            rows={5}
            className="w-full bg-card rounded-2xl p-4 text-foreground placeholder:text-muted-foreground resize-none outline-none focus:ring-2 focus:ring-primary mb-4"
          />

          <button
            onClick={handleSubmit}
            disabled={loading || !message.trim()}
            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl haptic-tap disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" />
                {t.send}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
