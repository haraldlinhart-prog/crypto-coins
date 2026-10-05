import type { Metadata } from 'next'
import Link from 'next/link'
import LegalShell from '../_legal/LegalShell'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung von crypto-coins.org.',
  alternates: { canonical: 'https://www.crypto-coins.org/datenschutz' },
}

export default function DatenschutzPage() {
  return (
    <LegalShell lang="de">
      <h1>Datenschutzerklärung</h1>
      <p className="legal-alt">English version: <Link href="/privacy-policy">Privacy Policy</Link></p>

      <h2>1. Verantwortlicher</h2>
      <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist die PAN21.com International LLC, 7533 South Center View CT, STE R, West Jordan, UT 84084, USA, vertreten durch Harald Linhart. E-Mail: <a href="mailto:dsgvo@pan21.com">dsgvo@pan21.com</a>, Telefon: +49 30 5684450-0.</p>

      <h2>2. Hosting</h2>
      <p>Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf der Website verarbeitet Vercel technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Referrer und Browserinformationen (Server-Logfiles), um die Website auszuliefern und vor Missbrauch zu schützen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb). Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung; Datenübermittlungen in die USA erfolgen auf Grundlage der EU-Standardvertragsklauseln.</p>

      <h2>3. Cookies</h2>
      <p>Diese Website setzt keine Cookies zu Analyse- oder Werbezwecken.</p>

      <h2>4. Besucherzählung mit PAN21counter</h2>
      <p>Zur Zählung der Seitenaufrufe nutzen wir den eigenen Besucherzähler PAN21counter (pan21counter.de). Er setzt keine Cookies und erstellt keine Nutzerprofile. Aus der IP-Adresse wird beim Aufruf ein gekürzter, täglich wechselnder Hashwert gebildet, um Mehrfachzählungen am selben Tag zu vermeiden; die IP-Adresse selbst wird nicht gespeichert. Einzelne Aufrufe werden nach drei Tagen gelöscht, danach bleiben nur zusammengefasste Tageszahlen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer einfachen Reichweitenmessung).</p>

      <h2>5. Werbebanner</h2>
      <p>Werbebanner werden über unseren eigenen Adserver ads.pan21.com ausgeliefert. Dabei wird die IP-Adresse technisch bedingt verarbeitet, um das Banner auszuliefern; es werden keine Nutzerprofile erstellt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>

      <h2>6. Kontaktformular und E-Mail</h2>
      <p>Wenn Sie uns über das Kontaktformular oder per E-Mail schreiben, verarbeiten wir Ihre Angaben (z. B. Name, E-Mail-Adresse, Nachricht), um Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen Vertrag zielt, sonst Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden gelöscht, sobald sie nicht mehr benötigt werden und keine gesetzlichen Aufbewahrungspflichten bestehen. Der E-Mail-Versand erfolgt über Resend (Resend Inc., USA) auf Grundlage eines Auftragsverarbeitungsvertrags und der EU-Standardvertragsklauseln.</p>

      <h2>7. Zahlungen</h2>
      <p>Zahlungen werden über Stripe (Stripe Payments Europe Ltd., 1 Grand Canal Street Lower, Dublin 2, Irland) abgewickelt. Dabei werden die für die Zahlung erforderlichen Daten an Stripe übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.</p>
      <p>Bei einem Kauf per Banküberweisung verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse und den Betrag, um die Zahlung zuzuordnen. Zur Gutschrift der CryptoCoin werden die angegebene Noble-Konto-E-Mail-Adresse und der Betrag an Noble Limited (noble-limited.com) übermittelt, die die Konten der Mitglieder führt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.</p>

      <h2>8. Newsletter</h2>
      <p>Für den Newsletter nutzen wir beehiiv (Beehiiv Inc., USA). Wenn Sie sich anmelden, werden Ihre E-Mail-Adresse und Anmeldedaten bei beehiiv gespeichert. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie jederzeit über den Abmeldelink widerrufen können.</p>

      <h2>9. KI-Chat / Sprachanruf</h2>
      <p>Der KI-Chat bzw. Sprachanruf wird erst geladen, wenn Sie ihn aktiv starten. Dann werden Ihre Eingaben bzw. Ihre Stimme an den Anbieter übermittelt, um das Gespräch zu führen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw. f DSGVO.</p>

      <h2>10. Schriftarten</h2>
      <p>Die Schriftarten dieser Website werden lokal von unserem Server geladen. Es findet keine Verbindung zu Servern von Google oder anderen Schriftanbietern statt.</p>

      <h2>11. Eingebettete Inhalte</h2>
      <p>Einige Seiten binden Bilder von externen Servern ein (Verzeichnis-Banner von ffa-links.de, swiss-quality.de und german-quality.net sowie Bilder von pixabay.com in Blogartikeln). Beim Laden dieser Inhalte wird Ihre IP-Adresse technisch bedingt an den jeweiligen Server übertragen.</p>

      <h2>12. Ihre Rechte</h2>
      <p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21). Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Wenden Sie sich für Ihre Anliegen an <a href="mailto:dsgvo@pan21.com">dsgvo@pan21.com</a>.</p>

      <p>Stand: Oktober 2026</p>
    </LegalShell>
  )
}
