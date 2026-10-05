import Link from 'next/link'

export function LegalLinks() {
  return (
    <>
      <Link href="/legal-notice">Legal Notice</Link>
      <Link href="/privacy-policy">Privacy Policy</Link>
      <Link href="/impressum">Impressum</Link>
      <Link href="/datenschutz">Datenschutz</Link>
    </>
  )
}

export default function LegalShell({ lang, children }: { lang: 'de' | 'en'; children: React.ReactNode }) {
  return (
    <div lang={lang}>
      <header className="legal-top">
        <div className="container legal-top-inner">
          <Link href="/" className="nav-logo">
            <div className="nav-logo-mark">CC</div>
            <span className="nav-logo-text">CryptoCoin</span>
          </Link>
          <Link href="/" className="legal-back">{lang === 'de' ? '← Zur Startseite' : '← Back to home'}</Link>
        </div>
      </header>
      <main className="container-sm legal-page">{children}</main>
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/buy">Buy CC</Link>
            <LegalLinks />
          </div>
        </div>
      </footer>
    </div>
  )
}
