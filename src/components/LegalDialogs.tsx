import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LegalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AGBDialog({ open, onOpenChange }: LegalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Allgemeine Geschäftsbedingungen (AGB)</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Stand: Januar 2025</p>
            
            <section>
              <h3 className="font-semibold text-foreground mb-2">1. Geltungsbereich</h3>
              <p>Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung der Easy Budget App (nachfolgend "App"). Mit der Nutzung der App akzeptieren Sie diese AGB vollumfänglich.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">2. Vertragsgegenstand</h3>
              <p>Die App ermöglicht Nutzern die Verwaltung ihres persönlichen Budgets, die Erfassung von Ausgaben und Abonnements. Die App wird in einer kostenlosen Basisversion sowie einer kostenpflichtigen Premium-Version angeboten.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">3. Registrierung und Nutzerkonto</h3>
              <p>Für die Nutzung der App ist eine Registrierung erforderlich. Der Nutzer ist verpflichtet, wahrheitsgemässe Angaben zu machen und seine Zugangsdaten vertraulich zu behandeln.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">4. Premium-Funktionen</h3>
              <p>Die Premium-Version bietet erweiterte Funktionen wie unbegrenzte Monate, Ausgaben und Abonnements. Die Preise und Zahlungsbedingungen werden vor dem Kauf transparent angezeigt.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">5. Haftung</h3>
              <p>Die Nutzung der App erfolgt auf eigene Verantwortung. Wir haften nicht für Schäden, die durch fehlerhafte Dateneingaben oder technische Störungen entstehen, ausser bei grober Fahrlässigkeit oder Vorsatz.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">6. Änderungen der AGB</h3>
              <p>Wir behalten uns vor, diese AGB jederzeit zu ändern. Änderungen werden dem Nutzer rechtzeitig mitgeteilt. Die fortgesetzte Nutzung der App gilt als Zustimmung zu den geänderten AGB.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">7. Anwendbares Recht und Gerichtsstand</h3>
              <p>Es gilt schweizerisches Recht. Gerichtsstand ist Zürich, Schweiz.</p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function NutzungsbedingungenDialog({ open, onOpenChange }: LegalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Nutzungsbedingungen</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Stand: Januar 2025</p>
            
            <section>
              <h3 className="font-semibold text-foreground mb-2">1. Nutzungsrechte</h3>
              <p>Mit der Registrierung erhalten Sie ein nicht-exklusives, nicht übertragbares Recht zur Nutzung der Easy Budget App für persönliche, nicht-kommerzielle Zwecke.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">2. Pflichten des Nutzers</h3>
              <p>Der Nutzer verpflichtet sich, die App nicht missbräuchlich zu nutzen, keine illegalen Inhalte zu speichern und keine technischen Schutzmassnahmen zu umgehen.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">3. Verfügbarkeit</h3>
              <p>Wir bemühen uns um eine hohe Verfügbarkeit der App, können jedoch keine ununterbrochene Verfügbarkeit garantieren. Wartungsarbeiten werden nach Möglichkeit angekündigt.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">4. Datenspeicherung</h3>
              <p>Die vom Nutzer eingegebenen Daten werden lokal auf dem Gerät gespeichert. Für die Sicherung der Daten ist der Nutzer selbst verantwortlich.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">5. Kündigung</h3>
              <p>Der Nutzer kann sein Konto jederzeit löschen. Bei Verstössen gegen diese Nutzungsbedingungen behalten wir uns vor, den Zugang zur App zu sperren.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">6. Änderungen</h3>
              <p>Wir behalten uns vor, diese Nutzungsbedingungen bei Bedarf anzupassen. Wesentliche Änderungen werden dem Nutzer mitgeteilt.</p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function DatenschutzDialog({ open, onOpenChange }: LegalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Datenschutzerklärung</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Stand: Januar 2025</p>
            
            <section>
              <h3 className="font-semibold text-foreground mb-2">1. Verantwortliche Stelle</h3>
              <p>Ivan Mirosnic<br />Ahornstrasse<br />8600 Dübendorf<br />Schweiz</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">2. Erhobene Daten</h3>
              <p className="font-semibold text-primary">Wir sammeln ausschliesslich Ihre Login-Daten (E-Mail-Adresse und Passwort). Keine weiteren personenbezogenen Daten werden erfasst oder gespeichert.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">3. Lokale Datenspeicherung</h3>
              <p>Alle Ihre Budget-Daten, Ausgaben und Abonnements werden ausschliesslich lokal auf Ihrem Gerät gespeichert. Diese Daten werden nicht an unsere Server übertragen.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">4. Verwendungszweck</h3>
              <p>Ihre Login-Daten werden ausschliesslich zur Authentifizierung und zum Zugang zur App verwendet.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">5. Datenweitergabe</h3>
              <p>Wir geben Ihre Daten nicht an Dritte weiter, ausser wenn dies gesetzlich vorgeschrieben ist.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">6. Ihre Rechte</h3>
              <p>Gemäss dem schweizerischen Datenschutzgesetz (DSG) haben Sie das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten. Kontaktieren Sie uns unter support@easybudget.app.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">7. Datensicherheit</h3>
              <p>Wir treffen angemessene technische und organisatorische Massnahmen zum Schutz Ihrer Daten gemäss den Anforderungen des schweizerischen Datenschutzgesetzes.</p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function ImpressumDialog({ open, onOpenChange }: LegalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Impressum</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm text-muted-foreground">
            <section>
              <h3 className="font-semibold text-foreground mb-2">Angaben gemäss schweizerischem Recht</h3>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">Betreiber der App</h3>
              <p>
                Ivan Mirosnic<br />
                Ahornstrasse<br />
                8600 Dübendorf<br />
                Schweiz
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">Kontakt</h3>
              <p>
                E-Mail: support@easybudget.app
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">Haftungsausschluss</h3>
              <p>Der Autor übernimmt keine Gewähr für die Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.</p>
              <p className="mt-2">Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen entstanden sind, werden ausgeschlossen.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">Urheberrechte</h3>
              <p>Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien in der App gehören ausschliesslich Ivan Mirosnic oder den speziell genannten Rechteinhabern.</p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">Anwendbares Recht</h3>
              <p>Es gilt ausschliesslich schweizerisches Recht. Gerichtsstand ist Zürich.</p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
