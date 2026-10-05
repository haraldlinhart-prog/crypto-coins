import type { Metadata } from 'next'
import Link from 'next/link'
import LegalShell from '../_legal/LegalShell'

export const metadata: Metadata = {
  title: 'Legal Notice',
  description: 'Legal notice of crypto-coins.org – information pursuant to § 5 DDG.',
  alternates: { canonical: 'https://www.crypto-coins.org/legal-notice' },
}

export default function LegalNoticePage() {
  return (
    <LegalShell lang="en">
      <h1>Legal Notice</h1>
      <p className="legal-alt">Deutsche Fassung: <Link href="/impressum">Impressum</Link></p>

      <p>Information pursuant to § 5 DDG (German Digital Services Act)</p>
      <p>
        PAN21.com International LLC<br />
        7533 South Center View CT, STE R<br />
        West Jordan, UT 84084<br />
        USA
      </p>
      <p>
        Represented by: Harald Linhart<br />
        Registration: Utah Division of Corporations, registration no. 14723637-0163
      </p>

      <h2>Contact</h2>
      <p>
        Phone: <a href="tel:+493056844500">+49 30 5684450-0</a><br />
        Email: <a href="mailto:dsgvo@pan21.com">dsgvo@pan21.com</a>
      </p>

      <h2>Responsible for content pursuant to § 18 (2) MStV</h2>
      <p>Harald Linhart, address as above</p>

      <h2>Consumer dispute resolution</h2>
      <p>We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.</p>
    </LegalShell>
  )
}
