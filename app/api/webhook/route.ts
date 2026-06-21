import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const stripeKey = process.env.STRIPE_SECRET_KEY

  if (!webhookSecret || !stripeKey) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  let event: any
  try {
    event = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const nobleEmail = session.metadata?.noble_email
    const ccAmount = parseFloat(session.metadata?.cc_amount || '0')

    if (nobleEmail && ccAmount > 0) {
      try {
        const nobleApiUrl = process.env.NOBLE_API_URL || 'https://noble-limited.com'
        const nobleApiKey = process.env.NOBLE_API_KEY

        if (nobleApiKey) {
          const res = await fetch(`${nobleApiUrl}/api/v1/credit`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${nobleApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: nobleEmail,
              coin_id: 'cryptocoin',
              amount: ccAmount,
              type: 'credit',
              description: `CryptoCoin purchase via Stripe — Session ${session.id}`,
              reference: session.id,
            }),
          })
          if (!res.ok) {
            console.error('Noble API credit failed:', await res.text())
          }
        }
      } catch (err) {
        console.error('Noble API credit error:', err)
      }
    }
  }

  return NextResponse.json({ received: true })
}
