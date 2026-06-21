import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message, elapsed } = body

    // Spam checks
    if (body.website) return NextResponse.json({ ok: true })
    if (typeof elapsed === 'number' && elapsed < 2000) return NextResponse.json({ ok: true })
    if (!name || !email || !message) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    const noSpaces = String(message).replace(/\s/g, '')
    if (noSpaces.length > 60 && noSpaces.length === String(message).length) return NextResponse.json({ ok: true })
    if (!email.includes('@') || !email.includes('.')) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })

    const resendKey = process.env.RESEND_API_KEY
    const contactTo = process.env.CONTACT_TO || 'members@noble-limited.com'

    if (!resendKey) {
      console.log('Contact form (no Resend):', { name, email, subject, message })
      return NextResponse.json({ ok: true })
    }

    const html = `
<div style="font-family:'Courier New',monospace;max-width:600px;margin:0 auto;padding:32px;background:#050A14;color:#E8EDF5;">
  <div style="border-left:2px solid #0066FF;padding-left:16px;margin-bottom:24px;">
    <div style="font-size:0.62rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#00D4FF;margin-bottom:4px;">// CRYPTO_COINS_CONTACT</div>
    <div style="font-size:1rem;font-weight:700;color:#fff;">${subject || 'New Contact'}</div>
  </div>
  <div style="background:#0A1220;border:1px solid #1E2D42;padding:16px 20px;margin-bottom:20px;">
    <div style="display:flex;gap:16px;padding:6px 0;border-bottom:1px solid #0F1928;font-size:0.82rem;"><span style="color:#4A5E75;min-width:80px;">$ name</span><span style="color:#E8EDF5;">${name}</span></div>
    <div style="display:flex;gap:16px;padding:6px 0;border-bottom:1px solid #0F1928;font-size:0.82rem;"><span style="color:#4A5E75;min-width:80px;">$ email</span><a href="mailto:${email}" style="color:#00D4FF;">${email}</a></div>
    <div style="display:flex;gap:16px;padding:6px 0;font-size:0.82rem;"><span style="color:#4A5E75;min-width:80px;">$ subject</span><span style="color:#E8EDF5;">${subject || '—'}</span></div>
  </div>
  <div style="background:#0A1220;border:1px solid #1E2D42;padding:16px 20px;font-size:0.875rem;line-height:1.8;white-space:pre-wrap;color:#7A8BA0;">${message}</div>
  <p style="font-size:0.65rem;color:#1E2D42;margin-top:20px;">crypto-coins.org · elapsed: ${elapsed}ms</p>
</div>`

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'CryptoCoin <noreply@pan21.com>',
        to: contactTo,
        reply_to: email,
        subject: `CryptoCoin Contact: ${subject || name}`,
        html,
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
