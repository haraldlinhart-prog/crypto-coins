import { NextRequest, NextResponse } from 'next/server'

// Catches bot-generated random tokens that are short enough to slide past a simple
// length check but look nothing like a real word: very few vowels AND unnaturally
// frequent upper/lowercase switching. Both conditions required together to avoid
// flagging real oddly-cased words (e.g. "McDonald").
// E-Mail-Blockliste — normalisiert Gmail-Punkte/Plus-Tags, damit Bots sie nicht
// durch e.dip.a.ju.l.o.d.ev.8.5@gmail.com vs. ed.ip.ajulo.de.v85@gmail.com umgehen.
const BLOCKED_EMAILS = new Set([
  'ugibanicepi459@gmail.com',
  'edipajulodev85@gmail.com',
]);
function normalizeEmail(email: string): string {
  const e = (email || '').trim().toLowerCase();
  const at = e.indexOf('@');
  if (at === -1) return e;
  let local = e.slice(0, at);
  const domain = e.slice(at + 1);
  local = local.split('+')[0];
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    local = local.replace(/\./g, '');
  }
  return local + '@' + (domain === 'googlemail.com' ? 'gmail.com' : domain);
}

function isGibberish(str: string): boolean {
  const words = (str || '').split(/\s+/).filter(w => w.length >= 6);
  const vowelChars = 'aeiouyAEIOUYäöüÄÖÜàáâãåèéêëìíîïòóôõùúûýÀÁÂÃÅÈÉÊËÌÍÎÏÒÓÔÕÙÚÛÝ';
  for (const word of words) {
    const letters = word.replace(/[^a-zA-ZäöüÄÖÜßàáâãåèéêëìíîïòóôõùúûýÀÁÂÃÅÈÉÊËÌÍÎÏÒÓÔÕÙÚÛÝ]/g, '');
    if (letters.length < 6) continue;
    let vowels = 0;
    for (const ch of letters) if (vowelChars.includes(ch)) vowels++;
    const vowelRatio = vowels / letters.length;
    let transitions = 0;
    for (let i = 1; i < letters.length; i++) {
      const prevUpper = letters[i - 1] === letters[i - 1].toUpperCase() && letters[i - 1] !== letters[i - 1].toLowerCase();
      const curUpper = letters[i] === letters[i].toUpperCase() && letters[i] !== letters[i].toLowerCase();
      if (prevUpper !== curUpper) transitions++;
    }
    const transitionRatio = transitions / (letters.length - 1);
    // Tiered threshold: longer strings need a less extreme vowel-ratio to be flagged,
    // since genuine long words (esp. German compounds) always carry a healthy vowel
    // share, while short strings need a stricter cutoff to avoid catching real
    // camelCase brand names (McDonald, PayPal, JavaScript...).
    const vowelThreshold = letters.length >= 14 ? 0.28 : (letters.length >= 11 ? 0.22 : 0.16);
    if (vowelRatio < vowelThreshold && transitionRatio > 0.3) return true;
  }
  if (/\S{61,}/.test(str || '')) return true;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message, elapsed } = body

  // Gibberish-Bot-Erkennung (kurze Zufallsstrings) — silent success wie Honeypot
  if (isGibberish(message) || isGibberish(name) || BLOCKED_EMAILS.has(normalizeEmail(email))) { return NextResponse.json({ ok: true }); }

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
