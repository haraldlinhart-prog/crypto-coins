import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://crypto-coins.org'),
  title: {
    default: 'CryptoCoin (CC) — Private Digital Currency | crypto-coins.org',
    template: '%s | CryptoCoin',
  },
  description:
    'CryptoCoin (CC) is a private digital currency issued within the Noble Limited network. Buy CryptoCoin with credit card up to €1,000 or via bank transfer. Private cryptocurrency for Noble members — secure, stable, instant.',
  keywords: [
    // Brand
    'CryptoCoin', 'CC', 'crypto-coins.org', 'CryptoCoin buy', 'CC coin',
    // Generic crypto
    'cryptocurrency', 'crypto', 'digital currency', 'virtual currency', 'private cryptocurrency',
    'digital asset', 'crypto token', 'digital token', 'utility token', 'private token',
    'private coin', 'digital coin', 'crypto coin', 'virtual coin', 'coin',
    // Descriptive
    'private digital currency', 'private network currency', 'member currency',
    'internal currency', 'network token', 'closed network crypto',
    'stable private currency', 'crypto exchange', 'buy crypto', 'buy cryptocurrency',
    'crypto wallet', 'digital wallet', 'crypto payment', 'digital payment',
    // Noble network
    'Noble Limited', 'noble network', 'noble coin', 'noble currency',
    // German
    'Kryptowährung', 'Kryptowährung kaufen', 'digitale Währung', 'virtuelle Währung',
    'private Kryptowährung', 'Digitalwährung', 'Krypto kaufen', 'privates Zahlungsmittel',
    'Netzwerkwährung', 'Token kaufen', 'digitaler Token', 'Krypto privat',
    // Technical
    'blockchain alternative', 'private ledger', 'digital settlement', 'crypto settlement',
    'instant crypto transfer', 'crypto buy credit card', 'crypto bank transfer',
  ],
  openGraph: {
    type: 'website',
    url: 'https://crypto-coins.org',
    siteName: 'CryptoCoin',
    title: 'CryptoCoin (CC) — Private Digital Currency',
    description: 'Buy CryptoCoin (CC) — the private digital currency of the Noble network. Secure, stable, members only.',
    locale: 'en_GB',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://crypto-coins.org' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Matomo 21 */}
        <script dangerouslySetInnerHTML={{ __html: `var _paq=window._paq=window._paq||[];_paq.push(['requireConsent']);_paq.push(['trackPageView']);_paq.push(['enableLinkTracking']);(function(){var u="//counter.ixan.org/";_paq.push(['setTrackerUrl',u+'matomo.php']);_paq.push(['setSiteId','21']);var d=document,g=d.createElement('script'),s=d.getElementsByTagName('script')[0];g.async=true;g.src=u+'matomo.js';s.parentNode.insertBefore(g,s);})();` }} />
        {/* Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          "name": "CryptoCoin",
          "alternateName": ["CC", "CryptoCoin CC"],
          "description": "CryptoCoin (CC) is a private digital currency issued within the Noble Limited private investment network. Not publicly traded. 1 CC = €1.00 EUR.",
          "url": "https://crypto-coins.org",
          "provider": {
            "@type": "Organization",
            "name": "Noble Limited",
            "url": "https://noble-limited.com"
          },
          "feesAndCommissionsSpecification": "1 CC = €1.00 EUR — Fixed rate",
          "category": "Private Digital Currency / Virtual Currency / Cryptocurrency"
        })}} />
        <meta name="ai-crawlers" content="allowed" />
              <script dangerouslySetInnerHTML={{__html: `var sc_project=13317697;var sc_invisible=1;var sc_security="458f783c";`}} />
        <script async src="https://www.statcounter.com/counter/counter.js" />
      </head>
      <body>{children}</body>
    </html>
  )
}
