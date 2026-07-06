'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import './home.css'

const CC_RATE = 1.00

export default function HomePage() {
  const [ticker, setTicker] = useState({ rate: CC_RATE })
  const [formstart, setFormstart] = useState(0)
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [contactErr, setContactErr] = useState('')

  useEffect(() => {
    fetch('/api/rate').then(r => r.json()).then(d => setTicker(d)).catch(() => {})
    setFormstart(Date.now())
  }, [])

  async function handleContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('website')) return
    if (Date.now() - formstart < 3000) return
    const msg = String(data.get('message') || '')
    const noSpaces = msg.replace(/\s/g, '')
    if (noSpaces.length > 60 && noSpaces.length === msg.length) return

    setContactStatus('sending')
    setContactErr('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
          elapsed: Date.now() - formstart,
        }),
      })
      if (res.ok) {
        setContactStatus('ok')
        form.reset()
        setFormstart(Date.now())
      } else {
        const d = await res.json()
        setContactErr(d.error || 'Submission failed.')
        setContactStatus('err')
      }
    } catch {
      setContactErr('Network error. Please try again.')
      setContactStatus('err')
    }
  }

  {/* <!-- REVIVE:START --> */}
<div dangerouslySetInnerHTML={{__html: "<div style=\"display:flex;justify-content:center;margin:16px 0;\">\n<ins data-revive-zoneid=\"6\" data-revive-id=\"0b01ba1194fdc0e89c6321458dbc5814\"></ins>\n<script async src=\"//ads.pan21.com/www/delivery/asyncjs.php\"></script>\n</div>"}} />
{/* <!-- REVIVE:END --> */}
{/* <!-- BEEHIIV:START --> */}
<div dangerouslySetInnerHTML={{__html: "\n<!-- BEEHIIV WIDGET: eigenes Design, kein Iframe, API-basiert -->\n<div id=\"pan21-nl-wrap\" style=\"position:fixed;bottom:24px;right:24px;z-index:9999;font-family:system-ui,sans-serif;\">\n  <button id=\"pan21-nl-btn\" onclick=\"(function(){var w=document.getElementById('pan21-nl-card');var open=w.style.display==='block';w.style.display=open?'none':'block';document.getElementById('pan21-nl-btn').innerHTML=open?'<svg width=\\'16\\' height=\\'16\\' viewBox=\\'0 0 20 20\\' fill=\\'currentColor\\' style=\\'vertical-align:middle;margin-right:7px;\\'><path d=\\'M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z\\'/><path d=\\'M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z\\'/></svg>Newsletter':'&#10005; Schlie&szlig;en';})()\" style=\"background:#0B1F3A;color:#C9963A;border:1.5px solid rgba(196,150,58,0.45);padding:10px 18px;border-radius:6px;cursor:pointer;font-weight:600;font-size:13px;display:flex;align-items:center;gap:7px;box-shadow:0 3px 14px rgba(0,0,0,0.28);letter-spacing:0.04em;\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z\"/><path d=\"M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z\"/></svg>Newsletter</button>\n  <div id=\"pan21-nl-card\" style=\"display:none;margin-top:8px;width:320px;background:#fff;border-radius:10px;box-shadow:0 8px 32px rgba(11,31,58,0.22);border:1px solid #E2DDD8;overflow:hidden;\">\n    <div style=\"background:#0B1F3A;padding:16px 20px;\">\n      <div style=\"font-family:Georgia,serif;font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:2px;\">PAN21 Newsletter</div>\n      <div style=\"font-size:0.72rem;color:rgba(255,255,255,0.55);letter-spacing:0.08em;text-transform:uppercase;\">Neuigkeiten &amp; Updates</div>\n    </div>\n    <div style=\"padding:20px;\">\n      <p style=\"font-size:0.84rem;color:#5E7085;line-height:1.55;margin-bottom:16px;\">Aktuelle Informationen aus dem PAN21-Netzwerk. Kein Spam, jederzeit abbestellbar.</p>\n      <div id=\"pan21-nl-form\">\n        <input id=\"pan21-nl-email\" type=\"email\" placeholder=\"Ihre E-Mail-Adresse\" style=\"width:100%;padding:10px 12px;border:1.5px solid #DDE3EC;border-radius:5px;font-size:0.875rem;font-family:system-ui,sans-serif;color:#1A2530;outline:none;margin-bottom:10px;box-sizing:border-box;\" onfocus=\"this.style.borderColor='#0B1F3A'\" onblur=\"this.style.borderColor='#DDE3EC'\">\n        <button onclick=\"pan21NlSubmit()\" style=\"width:100%;background:#C4963A;color:#fff;border:none;padding:11px;border-radius:5px;font-weight:700;font-size:0.875rem;cursor:pointer;letter-spacing:0.04em;\">Jetzt anmelden</button>\n      </div>\n      <div id=\"pan21-nl-ok\" style=\"display:none;text-align:center;padding:12px 0;\">\n        <div style=\"font-size:1.5rem;margin-bottom:6px;\">✓</div>\n        <div style=\"font-weight:700;color:#0B1F3A;font-size:0.9rem;\">Angemeldet!</div>\n        <div style=\"font-size:0.78rem;color:#5E7085;margin-top:4px;\">Bitte bestätigen Sie Ihre E-Mail.</div>\n      </div>\n      <div id=\"pan21-nl-err\" style=\"display:none;background:#FEF2F2;border-radius:4px;padding:8px 12px;font-size:0.78rem;color:#991B1B;margin-top:8px;\"></div>\n    </div>\n  </div>\n</div>\n<script>\nasync function pan21NlSubmit(){\n  var email=document.getElementById('pan21-nl-email').value.trim();\n  if(!email||!email.includes('@')){\n    var err=document.getElementById('pan21-nl-err');\n    err.textContent='Bitte geben Sie eine gültige E-Mail-Adresse ein.';\n    err.style.display='block';return;\n  }\n  document.getElementById('pan21-nl-err').style.display='none';\n  var btn=event.target||document.querySelector('#pan21-nl-form button');\n  btn.textContent='Wird gesendet…';btn.disabled=true;\n  try{\n    var res=await fetch('https://news.pan21.com/api/beehiiv-subscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:email})});\n    if(res.ok){\n      document.getElementById('pan21-nl-form').style.display='none';\n      document.getElementById('pan21-nl-ok').style.display='block';\n    }else{\n      var d=await res.json();\n      document.getElementById('pan21-nl-err').textContent=d.error||'Fehler. Bitte versuchen Sie es später.';\n      document.getElementById('pan21-nl-err').style.display='block';\n      btn.textContent='Jetzt anmelden';btn.disabled=false;\n    }\n  }catch(e){\n    document.getElementById('pan21-nl-err').textContent='Netzwerkfehler. Bitte versuchen Sie es später.';\n    document.getElementById('pan21-nl-err').style.display='block';\n    btn.textContent='Jetzt anmelden';btn.disabled=false;\n  }\n}\n</script>"}} />
{/* <!-- BEEHIIV:END --> */}
{/* <!-- DIRECTORIES:START --> */}
<div style={{display:'flex',justifyContent:'center',gap:'16px',flexWrap:'wrap',margin:'16px 0'}}>
<a href="https://ffa-links.de" target="_blank" rel="noopener"><img src="https://ffa-links.de/banner.svg" alt="FFA-Links" height={60} style={{borderRadius:'4px'}} /></a>
<a href="https://swiss-quality.de" target="_blank" rel="noopener"><img src="https://swiss-quality.de/banner.svg" alt="Swiss Quality" height={60} style={{borderRadius:'4px'}} /></a>
<a href="https://german-quality.net" target="_blank" rel="noopener"><img src="https://german-quality.net/banner.svg" alt="German Quality" height={60} style={{borderRadius:'4px'}} /></a>
</div>
{/* <!-- DIRECTORIES:END --> */}
return (
    <div>
      {/* ── Nav ── */}
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">
            <div className="nav-logo-mark">CC</div>
            <div>
              <span className="nav-logo-text">CryptoCoin</span>
              <span className="nav-logo-sub">Private Digital Currency</span>
            </div>
          </Link>
          <ul className="nav-links">
            <li><Link href="#about">About</Link></li>
            <li><Link href="#how">How It Works</Link></li>
            <li><Link href="#features">Features</Link></li>
            <li><Link href="#contact">Contact</Link></li>
            <li><Link href="/buy">Buy CC</Link></li>
          </ul>
          <div className="nav-actions">
            <a href="https://noble-limited.com" target="_blank" rel="noopener" className="nav-noble-link">Noble Limited ↗</a>
            <Link href="/buy" className="btn-blue">Buy CryptoCoin</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-orb" />
        <div className="container hero-inner">
          <div>
            <div className="hero-badge">Noble Private Currency Network · Live</div>
            <h1 className="hero-h1">
              The Private<br />
              <span className="gradient-text">CryptoCoin</span><br />
              Network
            </h1>
            <p className="hero-sub">
              CryptoCoin (CC) is the private digital currency of the Noble network —
              a members-only digital asset built for secure, instant transfers
              between Noble Limited members. Not traded on any public exchange.
            </p>
            <div className="hero-actions">
              <Link href="/buy" className="btn-blue-lg">Buy CryptoCoin →</Link>
              <Link href="#how" className="btn-ghost">How It Works</Link>
            </div>
          </div>
          <div className="coin-display">
            <div className="hex-wrap">
              <div className="hex-ring" />
              <div className="hex-inner">
                <span className="hex-symbol">CC</span>
                <span className="hex-name">CryptoCoin</span>
              </div>
            </div>
            <div className="terminal-box">
              <div className="terminal-header">
                <div className="t-dot r" /><div className="t-dot y" /><div className="t-dot g" />
                <span style={{ fontSize: '0.62rem', color: 'var(--muted)', marginLeft: '6px', fontFamily: 'var(--ff-mono)' }}>cc_ticker.live</span>
              </div>
              <div className="terminal-body">
                <div className="t-row"><span className="t-key">$ rate</span><span className="t-val">€{ticker.rate.toFixed(2)} / CC</span></div>
                <div className="t-row"><span className="t-key">$ network</span><span className="t-val white">Noble Limited</span></div>
                <div className="t-row"><span className="t-key">$ type</span><span className="t-val white">Private · Members</span></div>
                <div className="t-row"><span className="t-key">$ card_limit</span><span className="t-val">€1,000</span></div>
                <div className="t-row"><span className="t-key">$ wire</span><span className="t-val">Unlimited</span></div>
                <div className="t-row"><span className="t-key">$ status</span><span className="t-val" style={{ color: 'var(--green)' }}>● ONLINE</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="stats-bar">
        <div className="container stats-inner">
          {[
            { val: `€${ticker.rate.toFixed(2)}`, label: 'Per CryptoCoin' },
            { val: '€1,000', label: 'Card purchase limit' },
            { val: 'Unlimited', label: 'Via bank transfer' },
            { val: '24/7', label: 'Account access' },
          ].map(s => (
            <div key={s.label} className="stat">
              <span className="stat-val">{s.val}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── About ── */}
      <section className="section about-sec" id="about">
        <div className="container about-inner">
          <div className="about-text">
            <span className="eyebrow">What is CryptoCoin?</span>
            <h2 className="sec-title">
              Private Crypto.<br />
              <em>Zero Public Exposure.</em>
            </h2>
            <div className="blue-rule" />
            <p>
              CryptoCoin (CC) is the internal digital currency of Noble Limited's private investment
              network. It is not listed on any public exchange and is not available to the general public.
              No speculation. No volatility. Pure utility.
            </p>
            <p style={{ marginTop: '1rem' }}>
              CryptoCoin exists to facilitate transactions between Noble members — transfers, settlements,
              and value storage within the network. Every Noble member holds a CC balance alongside
              N-Coin and SwissyCash in their private Noble dashboard.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Issued and managed by Noble Limited, registered in England and Wales.
              Accessible via secure API from any connected application.
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/buy" className="btn-blue">Buy CryptoCoin →</Link>
              <a href="https://noble-limited.com/membership" target="_blank" rel="noopener" className="btn-outline-blue">Noble Membership</a>
            </div>
          </div>
          <div className="about-props">
            {[
              { icon: '🔒', title: 'Members Only', desc: 'CryptoCoin is not publicly traded. Access is exclusively for verified Noble Limited members. Private by design.' },
              { icon: '⚡', title: 'Instant Settlement', desc: 'Send CC to any Noble member in seconds. All transactions are recorded in real time on your Noble dashboard.' },
              { icon: '💳', title: 'Credit Card Ready', desc: 'Buy up to €1,000 of CryptoCoin instantly via Stripe. Visa, Mastercard, Amex and Apple Pay supported.' },
              { icon: '🔗', title: 'API Connected', desc: 'CryptoCoin balances are managed via the Noble Limited API — accessible from any Noble-connected platform.' },
            ].map(p => (
              <div key={p.title} className="prop-card">
                <span className="prop-icon">{p.icon}</span>
                <h3 className="prop-title">{p.title}</h3>
                <p className="prop-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section how-sec" id="how">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="eyebrow">How to Buy</span>
            <h2 className="sec-title">Four Steps. <em>That's All.</em></h2>
          </div>
          <div className="how-steps">
            {[
              {
                n: '01 // AMOUNT',
                title: 'Choose your amount',
                desc: 'Up to €1,000 by credit card — instant delivery. Above €1,000 by bank transfer to Noble Private Capital Limited in Hong Kong.',
              },
              {
                n: '02 // PAYMENT',
                title: 'Pay securely',
                desc: 'Card payments via Stripe (Visa, Mastercard, Amex, Apple Pay). Bank transfers to our Citibank HK account. All transfers reference your Noble account email.',
              },
              {
                n: '03 // DELIVERY',
                title: 'Receive CryptoCoin',
                desc: 'Your CC balance is credited to your Noble Limited dashboard automatically after payment confirmation. Card orders are instant.',
              },
              {
                n: '04 // USE',
                title: 'Use within the network',
                desc: 'Transfer CC to other Noble members, hold as a private store of value, or use via partner applications connected to the Noble API.',
              },
            ].map(s => (
              <div key={s.n} className="how-step">
                <div className="how-num">{s.n}</div>
                <div>
                  <h3 className="how-title">{s.title}</h3>
                  <p className="how-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/buy" className="btn-blue-lg">Buy CryptoCoin Now →</Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section features-sec" id="features">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <span className="eyebrow">Why CryptoCoin</span>
            <h2 className="sec-title">Built for <em>Private Networks</em></h2>
            <p className="sec-sub">CryptoCoin combines the speed of digital currency with the privacy of a closed member network. No public exposure. No speculation.</p>
          </div>
          <div className="features-grid">
            {[
              {
                n: '01',
                title: 'Issued by Noble Limited',
                text: 'CryptoCoin is issued and managed by Noble Limited, registered in England and Wales. All balances, transactions and crediting are handled through the Noble platform.',
              },
              {
                n: '02',
                title: 'Fixed 1:1 Rate',
                text: '1 CC = €1.00 EUR — always. No market volatility, no speculation, no gas fees. A stable private digital currency for stable private transfers.',
              },
              {
                n: '03',
                title: 'No Public Exchange',
                text: 'CryptoCoin is not listed on Binance, Coinbase, Kraken or any other public exchange. It is exclusively available to Noble members — which is exactly what makes it stable.',
              },
              {
                n: '04',
                title: 'Stripe-Secured Payments',
                text: 'Card purchases use Stripe, one of the most trusted payment processors globally. Your card details are never stored on our servers. PCI-DSS compliant.',
              },
              {
                n: '05',
                title: 'API-Backed Balances',
                text: 'Every CC balance is maintained in the Noble Limited platform, accessible 24/7 via your secure member dashboard. All transactions are logged and auditable.',
              },
              {
                n: '06',
                title: 'Three-Currency Ecosystem',
                text: 'Noble members hold CryptoCoin, N-Coin, and SwissyCash — three private currencies in one dashboard. Diversified private digital asset management.',
              },
            ].map(f => (
              <div key={f.n} className="feature-card">
                <div className="feature-num">// {f.n}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-text">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Noble network banner ── */}
      <section className="noble-banner">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'rgba(0,212,255,0.6)' }}>Part of the Noble Network</span>
          <h2 style={{ fontFamily: 'var(--ff-d)', fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 700, color: 'var(--white)', marginBottom: '1rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            CryptoCoin is one of three private currencies<br />issued by Noble Limited
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            Noble members hold CryptoCoin, N-Coin, and SwissyCash in a single private account dashboard.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.noble-limited.com/join?src=cryptocoins" target="_blank" rel="noopener" className="btn-blue">Apply for Noble Membership →</a>
            <a href="https://n-coins.net" target="_blank" rel="noopener" className="btn-outline-blue">N-Coin ↗</a>
            <a href="https://swissycash.com" target="_blank" rel="noopener" className="btn-outline-blue">SwissyCash ↗</a>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="section contact-sec" id="contact">
        <div className="container contact-inner">
          <div className="contact-info">
            <span className="eyebrow">Contact</span>
            <h2 className="sec-title">Get in <em>Touch</em></h2>
            <div className="blue-rule" />
            <p>
              Questions about CryptoCoin, your Noble account, or purchasing CC?
              We respond to all enquiries within one business day.
            </p>
            <div className="contact-detail">
              <div className="c-row">
                <span className="c-label">Email</span>
                <a href="mailto:info@crypto-coins.org">info@crypto-coins.org</a>
              </div>
              <div className="c-row">
                <span className="c-label">Network</span>
                <a href="https://noble-limited.com" target="_blank" rel="noopener">noble-limited.com</a>
              </div>
              <div className="c-row">
                <span className="c-label">Dashboard</span>
                <a href="https://noble-limited.com/dashboard" target="_blank" rel="noopener">noble-limited.com/dashboard</a>
              </div>
            </div>
          </div>
          <div className="c-form">
            {contactStatus === 'ok' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.75rem', color: 'var(--green)', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>
                  $ MESSAGE_SENT ✓
                </div>
                <div style={{ fontFamily: 'var(--ff-d)', fontSize: '1.3rem', color: 'var(--white)', marginBottom: '0.5rem' }}>Message Received</div>
                <p style={{ color: 'var(--gray)', fontSize: '0.875rem' }}>We will respond within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleContact} noValidate>
                <div className="hp-field">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="form-row">
                  <div className="fg">
                    <label>Name *</label>
                    <input type="text" name="name" placeholder="Your name" required />
                  </div>
                  <div className="fg">
                    <label>Email *</label>
                    <input type="email" name="email" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="fg">
                  <label>Subject</label>
                  <select name="subject">
                    <option value="">Select topic</option>
                    <option value="Buy CryptoCoin">Buy CryptoCoin</option>
                    <option value="Account / Balance">Account / Balance</option>
                    <option value="Noble Membership">Noble Membership</option>
                    <option value="API / Technical">API / Technical</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="fg">
                  <label>Message *</label>
                  <textarea name="message" placeholder="How can we help?" required />
                </div>
                <button
                  type="submit"
                  className="form-submit"
                  disabled={contactStatus === 'sending'}
                >
                  {contactStatus === 'sending' ? '// Sending…' : 'Send Message →'}
                </button>
                {contactStatus === 'err' && <p className="form-err">{contactErr}</p>}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="nav-logo-mark" style={{ width: '32px', height: '32px', fontSize: '0.78rem', borderRadius: '5px' }}>CC</div>
            <span style={{ fontFamily: 'var(--ff-d)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>CryptoCoin</span>
          </div>
          <div className="footer-links">
            <Link href="/buy">Buy CC</Link>
            <Link href="#about">About</Link>
            <Link href="#how">How It Works</Link>
            <Link href="#features">Features</Link>
            <Link href="#contact">Contact</Link>
            <a href="https://noble-limited.com" target="_blank" rel="noopener">Noble Limited</a>
            <a href="https://n-coins.net" target="_blank" rel="noopener">N-Coin</a>
            <a href="https://swissycash.com" target="_blank" rel="noopener">SwissyCash</a>
          </div>
          <p className="footer-legal">
            © {new Date().getFullYear()} CryptoCoin (CC) · Issued by Noble Limited · Registered in England &amp; Wales ·
            CryptoCoin is a private network currency, not a regulated financial instrument or publicly traded asset.
            Not available to the general public. Not investment advice.
          </p>
        </div>
      </footer>
    </div>
  )
}
