'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import '../globals.css'
import './buy.css'

const CC_RATE = 1.00
const CARD_LIMIT = 1000

const BANK = {
  Beneficiary: 'NOBLE PRIVATE CAPITAL LIMITED',
  Bank: 'Citibank, N.A., Hong Kong Branch',
  SWIFT: 'CITIHKHX',
  Account: '390206957',
  Currency: 'EUR',
  Reference: 'CC Purchase — [Your Noble Account Email]',
}

export default function BuyPage() {
  const [amount, setAmount] = useState('')
  const [ccAmount, setCcAmount] = useState(0)
  const [mode, setMode] = useState<'card' | 'wire' | null>(null)
  const [email, setEmail] = useState('')
  const [wireName, setWireName] = useState('')
  const [wireSubmitted, setWireSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [website, setWebsite] = useState('') // Honeypot
  const [formstart] = useState(() => Date.now())
  const [rate, setRate] = useState(CC_RATE)

  useEffect(() => {
    fetch('/api/rate').then(r => r.json()).then(d => setRate(d.rate || CC_RATE)).catch(() => {})
  }, [])

  useEffect(() => {
    const eur = parseFloat(amount) || 0
    setCcAmount(eur / rate)
    if (eur > 0 && eur <= CARD_LIMIT) setMode('card')
    else if (eur > CARD_LIMIT) setMode('wire')
    else setMode(null)
  }, [amount, rate])

  async function handleCardBuy(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !amount) return setError('Please enter your Noble email and amount.')
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount), email }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setError(data.error || 'Payment setup failed.')
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  async function handleWireSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (website) return // Bot hat das Honeypot-Feld ausgefüllt
    if (!email || !amount || !wireName) return setError('Please fill in all fields.')
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/wire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: wireName, email, amount: parseFloat(amount), ccAmount, website, elapsed: Date.now() - formstart }),
      })
      if (res.ok) setWireSubmitted(true)
      else setError('Submission failed. Please email us directly.')
    } catch { setError('Something went wrong.') }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)' }}>
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
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#how">How It Works</Link></li>
            <li><Link href="/buy" style={{ color: 'var(--blue3)' }}>Buy CC</Link></li>
          </ul>
          <div className="nav-actions">
            <a href="https://noble-limited.com" target="_blank" rel="noopener" className="nav-noble-link">Noble Limited ↗</a>
          </div>
        </div>
      </nav>

      <div className="buy-layout">
        {/* ── Sidebar ── */}
        <div className="buy-sidebar">
          <div className="sidebar-inner">
            <span className="eyebrow" style={{ color: 'rgba(0,212,255,0.6)' }}>CC Exchange</span>
            <h1 style={{ fontFamily: 'var(--ff-d)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--white)', lineHeight: 1.15, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
              Buy<br /><span style={{ background: 'linear-gradient(135deg,#338AFF,#00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CryptoCoin</span>
            </h1>
            <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(0,102,255,0.4), transparent)', margin: '1.5rem 0' }} />
            <div className="rate-display">
              <span className="rate-label">// current_rate</span>
              <span className="rate-val">€{rate.toFixed(2)} = 1 CC</span>
            </div>
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="method-info">
                <div className="method-badge card">💳 CARD</div>
                <p>Up to €1,000 · Instant · Visa, MC, Amex</p>
              </div>
              <div className="method-info">
                <div className="method-badge wire">🏦 WIRE</div>
                <p>€1,000 and above · 1–3 business days</p>
              </div>
            </div>
            <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--lgray)' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--muted)', lineHeight: 1.7, fontFamily: 'var(--ff-mono)' }}>
                // CryptoCoin is a private network currency issued by Noble Limited.
                Not a regulated financial instrument. Noble membership required.
              </p>
            </div>
          </div>
        </div>

        {/* ── Main ── */}
        <div className="buy-main">
          {wireSubmitted ? (
            <div className="success-box">
              <div className="success-icon">✓</div>
              <h2>Wire Confirmed</h2>
              <p>
                Thank you, {wireName}. Wire transfer instructions have been sent to your email.
                Your CryptoCoin will be credited to your Noble account within 1–3 business days
                after receipt of funds.
              </p>
              <Link href="/" className="btn-blue" style={{ marginTop: '2rem', display: 'inline-block' }}>← Back to CryptoCoin</Link>
            </div>
          ) : (
            <>
              <div className="amount-section">
              {/* Quick packages */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '0.75rem' }}>Schnellauswahl</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                  {[10, 25, 50, 100].map(pkg => (
                    <button
                      key={pkg}
                      onClick={() => setAmount(String(pkg))}
                      style={{
                        padding: '0.75rem 0.5rem',
                        border: `2px solid ${amount === String(pkg) ? '#0066FF' : '#e5e7eb'}`,
                        background: amount === String(pkg) ? '#0066FF' : '#fff',
                        color: amount === String(pkg) ? '#fff' : '#111',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'all 0.15s',
                        display: 'flex',
                        flexDirection: 'column' as const,
                        alignItems: 'center',
                        gap: '2px',
                      }}
                    >
                      <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{pkg}</span>
                      <span style={{ fontSize: '0.62rem', opacity: 0.7, letterSpacing: '0.08em' }}>CC</span>
                    </button>
                  ))}
                </div>
              </div>

              
                <label className="field-label">// amount_eur</label>
                <div className="amount-input-wrap">
                  <span className="currency-sign">€</span>
                  <input
                    type="number" min="1" max="100000" step="1"
                    placeholder="0"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="amount-input"
                  />
                </div>
                {parseFloat(amount) > 0 && (
                  <div className="nc-preview">
                    $ receive: <strong>{ccAmount.toFixed(2)} CC</strong>
                    <span className="nc-preview-rate">@ €{rate.toFixed(2)}/CC</span>
                  </div>
                )}
                {mode && (
                  <div className={`mode-indicator ${mode}`}>
                    {mode === 'card'
                      ? '// CARD_PAYMENT · instant_delivery'
                      : '// WIRE_TRANSFER · required_above_€1000'}
                  </div>
                )}
              </div>

              {mode === 'card' && (
                <form onSubmit={handleCardBuy} className="pay-form">
                  <h3 className="form-title">Credit Card Payment</h3>
                  <div className="fg">
                    <label className="field-label">// noble_account_email *</label>
                    <input type="email" required placeholder="your@email.com"
                      value={email} onChange={e => setEmail(e.target.value)} />
                    <p className="field-hint">// CC will be credited to this Noble account</p>
                  </div>
                  <div className="pay-summary">
                    <div className="summary-row"><span>$ amount</span><strong>€{parseFloat(amount || '0').toFixed(2)}</strong></div>
                    <div className="summary-row"><span>$ cc_received</span><strong>{ccAmount.toFixed(2)} CC</strong></div>
                    <div className="summary-row"><span>$ payment</span><strong>Stripe · Secure</strong></div>
                  </div>
                  {error && <p className="form-error">// ERROR: {error}</p>}
                  <button type="submit" className="btn-blue-lg" disabled={loading} style={{ width: '100%' }}>
                    {loading ? '// Redirecting…' : `Pay €${parseFloat(amount || '0').toFixed(2)} →`}
                  </button>
                  <p className="stripe-note">// Secured by Stripe · Visa · Mastercard · Amex · Apple Pay</p>
                </form>
              )}

              {mode === 'wire' && (
                <form onSubmit={handleWireSubmit} className="pay-form">
                  <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
                    <label htmlFor="wire-website">Website</label>
                    <input id="wire-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} />
                  </div>
                  <h3 className="form-title">Bank Transfer</h3>
                  <p className="form-sub">Amounts above €1,000 require a bank transfer. Fill in your details to receive instructions by email.</p>
                  <div className="bank-details">
                    <span className="bank-title">// noble_private_capital_hk</span>
                    {Object.entries(BANK).map(([k, v]) => (
                      <div key={k} className="bank-row">
                        <span>$ {k.toLowerCase()}</span>
                        <strong>{v}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="fg">
                    <label className="field-label">// full_name *</label>
                    <input type="text" required placeholder="As on your bank account"
                      value={wireName} onChange={e => setWireName(e.target.value)} />
                  </div>
                  <div className="fg">
                    <label className="field-label">// noble_account_email *</label>
                    <input type="email" required placeholder="your@email.com"
                      value={email} onChange={e => setEmail(e.target.value)} />
                    <p className="field-hint">// CC credited to this Noble account after funds received</p>
                  </div>
                  <div className="pay-summary">
                    <div className="summary-row"><span>$ transfer_amount</span><strong>€{parseFloat(amount || '0').toFixed(2)}</strong></div>
                    <div className="summary-row"><span>$ cc_received</span><strong>{ccAmount.toFixed(2)} CC</strong></div>
                    <div className="summary-row"><span>$ estimated_time</span><strong>1–3 business days</strong></div>
                  </div>
                  {error && <p className="form-error">// ERROR: {error}</p>}
                  <button type="submit" className="btn-blue-lg" disabled={loading} style={{ width: '100%' }}>
                    {loading ? '// Sending…' : 'Confirm Wire Transfer →'}
                  </button>
                </form>
              )}

              {!mode && (
                <div className="empty-state">
                  <p>// Enter an amount above to see payment options.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
