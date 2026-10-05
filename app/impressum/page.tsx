import type { Metadata } from 'next'
import Link from 'next/link'
import LegalShell from '../_legal/LegalShell'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum von crypto-coins.org – Angaben gemäß § 5 DDG.',
  alternates: { canonical: 'https://www.crypto-coins.org/impressum' },
}

export default function ImpressumPage() {
  return (
    <LegalShell lang="de">
      <h1>Impressum</h1>
      <p className="legal-alt">English version: <Link href="/legal-notice">Legal Notice</Link></p>

      <p>Angaben gemäß § 5 DDG</p>
      <p>
        PAN21.com International LLC<br />
        7533 South Center View CT, STE R<br />
        West Jordan, UT 84084<br />
        USA
      </p>
      <p>
        Vertreten durch: Harald Linhart<br />
        Registrierung: Utah Division of Corporations, Registernummer 14723637-0163
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <a href="tel:+493056844500">+49 30 5684450-0</a><br />
        E-Mail: <a href="mailto:dsgvo@pan21.com">dsgvo@pan21.com</a>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>Harald Linhart, Anschrift wie oben</p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    </LegalShell>
  )
}
