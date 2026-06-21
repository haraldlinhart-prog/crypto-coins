import { NextResponse } from 'next/server'

const CC_RATE = 1.00

export async function GET() {
  return NextResponse.json({
    rate: CC_RATE,
    currency: 'EUR',
    symbol: 'CC',
    name: 'CryptoCoin',
    updated: new Date().toISOString(),
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, s-maxage=300',
    }
  })
}
