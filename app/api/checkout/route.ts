import { NextRequest, NextResponse } from 'next/server'

const CARD_LIMIT = 1000
const CC_RATE = 1.00

export async function POST(req: NextRequest) {
  try {
    const { amount, email } = await req.json()

    if (!amount || !email) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    if (amount > CARD_LIMIT) return NextResponse.json({ error: `Card limit is €${CARD_LIMIT}` }, { status: 400 })
    if (amount < 1) return NextResponse.json({ error: 'Minimum €1' }, { status: 400 })

    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) return NextResponse.json({ error: 'Payment not configured' }, { status: 500 })

    const ccAmount = (amount / CC_RATE).toFixed(2)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://crypto-coins.org'

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'payment_method_types[]': 'card',
        'line_items[0][price_data][currency]': 'eur',
        'line_items[0][price_data][unit_amount]': String(Math.round(amount * 100)),
        'line_items[0][price_data][product_data][name]': `CryptoCoin (CC) — ${ccAmount} CC`,
        'line_items[0][price_data][product_data][description]': `Private digital currency of the Noble network. ${ccAmount} CC at €${CC_RATE.toFixed(2)}/CC.`,
        'line_items[0][quantity]': '1',
        'mode': 'payment',
        'customer_email': email,
        'success_url': `${siteUrl}/buy/success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(email)}&cc=${ccAmount}`,
        'cancel_url': `${siteUrl}/buy`,
        'metadata[noble_email]': email,
        'metadata[cc_amount]': ccAmount,
        'metadata[eur_amount]': String(amount),
      }),
    })

    const session = await res.json()
    if (!res.ok) return NextResponse.json({ error: session.error?.message || 'Stripe error' }, { status: 500 })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
