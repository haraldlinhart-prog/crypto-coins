'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import '../../globals.css'

function SuccessContent() {
  const params = useSearchParams()
  const cc = params.get('cc') || '0'
  const email = params.get('email') || ''

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '480px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.7rem', color: 'var(--green)', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
          $ PAYMENT_STATUS: SUCCESS ✓
        </div>
        <div style={{ width: '72px', height: '72px', background: 'rgba(0,102,255,0.12)', border: '1px solid rgba(0,102,255,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '1.75rem' }}>
          ✓
        </div>
        <div style={{ fontFamily: 'var(--ff-d)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          Payment Successful
        </div>
        <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          Your balance of{' '}
          <strong style={{ color: 'var(--cyan)', fontFamily: 'var(--ff-mono)' }}>{parseFloat(cc).toFixed(2)} CC</strong>{' '}
          has been credited to your Noble account
          {email && <> at <strong style={{ color: 'var(--text)' }}>{email}</strong></>}.
        </p>
        <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.75, marginBottom: '2.5rem', fontFamily: 'var(--ff-mono)' }}>
          // View your CryptoCoin balance and all Noble currencies in your dashboard.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://noble-limited.com/dashboard" target="_blank" rel="noopener" className="btn-blue">
            View Dashboard →
          </a>
          <Link href="/" className="btn-ghost">← Back to CryptoCoin</Link>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontFamily: 'var(--ff-mono)' }}>// Loading…</div>}>
      <SuccessContent />
    </Suspense>
  )
}
