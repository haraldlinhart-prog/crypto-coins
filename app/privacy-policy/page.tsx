import type { Metadata } from 'next'
import Link from 'next/link'
import LegalShell from '../_legal/LegalShell'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy of crypto-coins.org.',
  alternates: { canonical: 'https://www.crypto-coins.org/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <LegalShell lang="en">
      <h1>Privacy Policy</h1>
      <p className="legal-alt">Deutsche Fassung: <Link href="/datenschutz">Datenschutzerklärung</Link></p>

      <h2>1. Controller</h2>
      <p>The controller responsible for data processing on this website is PAN21.com International LLC, 7533 South Center View CT, STE R, West Jordan, UT 84084, USA, represented by Harald Linhart. Email: <a href="mailto:dsgvo@pan21.com">dsgvo@pan21.com</a>, phone: +49 30 5684450-0.</p>

      <h2>2. Hosting</h2>
      <p>This website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. When you visit the website, Vercel processes technically necessary data such as your IP address, date and time, the page requested, the referrer and browser information (server log files) in order to deliver the website and protect it against misuse. The legal basis is Art. 6(1)(f) GDPR (legitimate interest in secure and stable operation). A data processing agreement is in place with Vercel; transfers of data to the USA are based on the EU Standard Contractual Clauses.</p>

      <h2>3. Cookies</h2>
      <p>This website does not set any cookies for analytics or advertising purposes.</p>

      <h2>4. Visitor counting with PAN21counter</h2>
      <p>To count page views, we use our own visitor counter PAN21counter (pan21counter.de). It does not set cookies and does not create user profiles. When a page is requested, a shortened hash value that changes daily is derived from the IP address to avoid counting the same visitor more than once per day; the IP address itself is not stored. Individual page views are deleted after three days, after which only aggregated daily totals remain. The legal basis is Art. 6(1)(f) GDPR (legitimate interest in simple reach measurement).</p>

      <h2>5. Advertising banners</h2>
      <p>Advertising banners are delivered via our own ad server ads.pan21.com. For technical reasons, your IP address is processed in order to deliver the banner; no user profiles are created. The legal basis is Art. 6(1)(f) GDPR.</p>

      <h2>6. Contact form and email</h2>
      <p>If you contact us via the contact form or by email, we process the information you provide (e.g. name, email address, message) in order to answer your enquiry. The legal basis is Art. 6(1)(b) GDPR where your enquiry relates to a contract, otherwise Art. 6(1)(f) GDPR. The data is deleted as soon as it is no longer required and no statutory retention obligations apply. Emails are sent via Resend (Resend Inc., USA) on the basis of a data processing agreement and the EU Standard Contractual Clauses.</p>

      <h2>7. Payments</h2>
      <p>Payments are processed by Stripe (Stripe Payments Europe Ltd., 1 Grand Canal Street Lower, Dublin 2, Ireland). The data required for the payment is transmitted to Stripe for this purpose. The legal basis is Art. 6(1)(b) GDPR.</p>
      <p>For purchases by bank transfer, we process your name, email address and the amount in order to match your payment. To credit the CryptoCoin, the Noble account email address you provide and the amount are transmitted to Noble Limited (noble-limited.com), which maintains the members’ accounts. The legal basis is Art. 6(1)(b) GDPR.</p>

      <h2>8. Newsletter</h2>
      <p>We use beehiiv (Beehiiv Inc., USA) for our newsletter. When you subscribe, your email address and sign-up data are stored with beehiiv. The legal basis is your consent (Art. 6(1)(a) GDPR), which you can withdraw at any time via the unsubscribe link.</p>

      <h2>9. AI chat / voice call</h2>
      <p>The AI chat or voice call is only loaded once you actively start it. Your input or voice is then transmitted to the provider in order to conduct the conversation. The legal basis is Art. 6(1)(b) or (f) GDPR.</p>

      <h2>10. Fonts</h2>
      <p>The fonts used on this website are loaded locally from our own server. No connection is made to servers operated by Google or other font providers.</p>

      <h2>11. Embedded content</h2>
      <p>Some pages embed images from external servers (directory banners from ffa-links.de, swiss-quality.de and german-quality.net, and images from pixabay.com in blog articles). When this content is loaded, your IP address is transmitted to the respective server for technical reasons.</p>

      <h2>12. Your rights</h2>
      <p>You have the right of access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and to object to processing based on Art. 6(1)(f) GDPR (Art. 21). You can withdraw any consent you have given at any time with effect for the future. You also have the right to lodge a complaint with a data protection supervisory authority. Please send any requests to <a href="mailto:dsgvo@pan21.com">dsgvo@pan21.com</a>.</p>

      <p>Status: October 2026</p>
    </LegalShell>
  )
}
