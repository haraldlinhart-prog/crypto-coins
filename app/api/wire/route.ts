import { NextRequest, NextResponse } from 'next/server'

const BANK = {
  beneficiary: 'NOBLE PRIVATE CAPITAL LIMITED',
  bank: 'Citibank, N.A., Hong Kong Branch',
  swift: 'CITIHKHX',
  account: '390206957',
  currency: 'EUR',
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, amount, ccAmount } = await req.json()
    if (!name || !email || !amount) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) return NextResponse.json({ success: true })

    const html = `
<div style="font-family:'Courier New',monospace;max-width:600px;margin:0 auto;padding:40px 32px;background:#050A14;color:#E8EDF5;">
  <div style="border-bottom:1px solid #1E2D42;padding-bottom:20px;margin-bottom:24px;">
    <div style="display:inline-block;background:#0066FF;color:#fff;font-weight:800;font-size:0.9rem;padding:6px 14px;border-radius:4px;margin-bottom:12px;">CC</div>
    <div style="font-size:1.1rem;font-weight:700;color:#fff;">CryptoCoin — Wire Transfer Instructions</div>
  </div>
  <p style="color:#7A8BA0;line-height:1.8;margin-bottom:20px;">
    Dear ${name},<br><br>
    Thank you for your CryptoCoin purchase request.<br>
    Please transfer <span style="color:#fff;font-weight:700;">€${parseFloat(amount).toFixed(2)}</span> to receive
    <span style="color:#00D4FF;font-weight:700;">${parseFloat(ccAmount).toFixed(2)} CC</span>.
  </p>

  <div style="background:#0A1220;border:1px solid #1E2D42;border-left:2px solid #0066FF;padding:20px 24px;margin:24px 0;font-family:'Courier New',monospace;">
    <div style="font-size:0.62rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#00D4FF;margin-bottom:12px;">// BANK_TRANSFER_DETAILS</div>
    ${Object.entries(BANK).map(([k, v]) => `
    <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #0F1928;font-size:0.82rem;">
      <span style="color:#4A5E75;">$ ${k}</span>
      <span style="color:#E8EDF5;font-weight:700;">${v}</span>
    </div>`).join('')}
    <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:0.82rem;">
      <span style="color:#4A5E75;">$ reference</span>
      <span style="color:#E8EDF5;font-weight:700;">CC Purchase — ${email}</span>
    </div>
  </div>

  <p style="color:#7A8BA0;font-size:0.85rem;line-height:1.75;">
    <span style="color:#fff;font-weight:700;">Important:</span> Use your Noble account email
    (<span style="color:#00D4FF;">${email}</span>) as the payment reference.<br><br>
    Your CryptoCoins will be credited within <span style="color:#fff;">1–3 business days</span> after we receive your funds.
  </p>

  <p style="color:#1E2D42;font-size:0.68rem;margin-top:28px;border-top:1px solid #1E2D42;padding-top:16px;">
    CryptoCoin (CC) · Issued by Noble Limited · crypto-coins.org · noble-limited.com
  </p>
</div>`

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'CryptoCoin <noreply@pan21.com>',
        to: email,
        reply_to: 'members@noble-limited.com',
        subject: `Wire Transfer Instructions — ${parseFloat(ccAmount).toFixed(2)} CC`,
        html,
      }),
    })

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'CryptoCoin <noreply@pan21.com>',
        to: 'members@noble-limited.com',
        subject: `CC Wire Transfer Request: ${name} — €${parseFloat(amount).toFixed(2)} / ${parseFloat(ccAmount).toFixed(2)} CC`,
        html: `<p><strong>Name:</strong> ${name}<br><strong>Email:</strong> ${email}<br><strong>EUR:</strong> €${parseFloat(amount).toFixed(2)}<br><strong>CC:</strong> ${parseFloat(ccAmount).toFixed(2)} CC</p>`,
      }),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Wire error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
