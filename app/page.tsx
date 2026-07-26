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

  

return (
    <div>
{/* <!-- SUPPORT:START --> */}
<div dangerouslySetInnerHTML={{__html: "\n<!-- SUPPORT BUTTON + POPUP -->\n<style>\niframe[src*=\"tawk.to\"] { visibility: hidden !important; }\nbody.pan21-sup-tawk-visible iframe[src*=\"tawk.to\"] { visibility: visible !important; }\n</style>\n\n<div id=\"pan21-sup-wrap\" style=\"position:fixed;bottom:212px;right:24px;z-index:9999;font-family:system-ui,-apple-system,sans-serif;\">\n  <button id=\"pan21-sup-btn\" onclick=\"(function(){var w=document.getElementById('pan21-sup-card');var open=w.style.display==='block';w.style.display=open?'none':'block';})()\" style=\"display:flex;align-items:center;gap:7px;background:#0B1F3A;color:#C9963A;border:1.5px solid rgba(196,150,58,0.45);padding:10px 18px;border-radius:6px;cursor:pointer;font-weight:600;font-size:13px;box-shadow:0 3px 14px rgba(0,0,0,0.28);letter-spacing:0.04em;\">\n    <svg width=\"16\" height=\"16\" viewBox=\"0 0 20 20\" fill=\"currentColor\" style=\"flex-shrink:0;\"><path d=\"M18 10c0 3.866-3.582 7-8 7a8.84 8.84 0 01-2.556-.372c-.605.526-1.775 1.372-3.444 1.372a.5.5 0 01-.4-.8c.5-.667.9-1.6 1.05-2.4C3.02 13.55 2 11.9 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z\"/></svg>\n    <span class=\"pan21-sup-i18n\" data-p21supde=\"Support\" data-p21supen=\"Support\">Support</span>\n  </button>\n  <div id=\"pan21-sup-card\" style=\"display:none;position:absolute;bottom:56px;right:0;width:380px;max-width:calc(100vw - 48px);max-height:min(640px, calc(100vh - 100px));overflow-y:auto;background:#fff;border-radius:10px;box-shadow:0 8px 32px rgba(11,31,58,0.28);border:1px solid #E2DDD8;\">\n    <div style=\"background:#0B1F3A;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:1;\">\n      <div>\n        <div style=\"font-family:Georgia,serif;font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:2px;\" class=\"pan21-sup-i18n\" data-p21supde=\"Support\" data-p21supen=\"Support\">Support</div>\n        <div style=\"font-size:0.72rem;color:rgba(255,255,255,0.55);letter-spacing:0.08em;text-transform:uppercase;\" class=\"pan21-sup-i18n\" data-p21supde=\"Wählen Sie, was gerade passt\" data-p21supen=\"Choose what works for you\">Wählen Sie, was gerade passt</div>\n      </div>\n      <button onclick=\"document.getElementById('pan21-sup-card').style.display='none'\" style=\"background:none;border:none;color:rgba(255,255,255,0.6);font-size:18px;cursor:pointer;line-height:1;padding:0;\">&#10005;</button>\n    </div>\n    <div style=\"padding:18px 20px;display:flex;flex-direction:column;gap:14px;\">\n\n      <a href=\"#\" onclick=\"(function(e){e.preventDefault();if(document.getElementById('famulor-widget-embed'))return;var s=document.createElement('script');s.id='famulor-widget-embed';s.src='https://app.famulor.de/embed.js';s.setAttribute('data-assistant-id','2ff6ddca-ffcb-43f1-8b4a-4c71025e3fed');document.body.appendChild(s);})(event)\" style=\"display:block;border:1px solid #E2DDD8;border-radius:8px;padding:14px;text-decoration:none;cursor:pointer;\">\n        <div style=\"font-family:Georgia,serif;font-size:1rem;color:#0B1F3A;margin-bottom:4px;\" class=\"pan21-sup-i18n\" data-p21supde=\"&#128172; KI-Chat &amp; Netz-Telefon\" data-p21supen=\"&#128172; AI Chat &amp; Voice Call\">&#128172; KI-Chat &amp; Netz-Telefon</div>\n        <div style=\"display:inline-flex;align-items:center;gap:5px;font-size:.66rem;letter-spacing:.05em;text-transform:uppercase;color:#16a34a;font-weight:600;margin-bottom:8px;\">\n          <span style=\"width:7px;height:7px;border-radius:50%;background:#16a34a;display:inline-block\"></span><span class=\"pan21-sup-i18n\" data-p21supde=\"Immer sofort verfügbar\" data-p21supen=\"Always available\">Immer sofort verfügbar</span>\n        </div>\n        <div style=\"font-size:.8rem;color:#5a6a7e;line-height:1.55;\" class=\"pan21-sup-i18n\" data-p21supde=\"Tippen oder sprechen Sie mit unserem KI-Assistenten &mdash; direkt im Browser, kein Telefon nötig. Auf Wunsch verbindet er Sie live mit unserem Team. &lt;strong style=&quot;color:#FF6B35;&quot;&gt;Jetzt starten &rarr;&lt;/strong&gt;\" data-p21supen=\"Type or talk to our AI assistant &mdash; right in your browser, no phone needed. On request, it connects you live with our team. &lt;strong style=&quot;color:#FF6B35;&quot;&gt;Start now &rarr;&lt;/strong&gt;\">Tippen oder sprechen Sie mit unserem KI-Assistenten &mdash; direkt im Browser, kein Telefon nötig. Auf Wunsch verbindet er Sie live mit unserem Team. <strong style=\"color:#FF6B35;\">Jetzt starten &rarr;</strong></div>\n      </a>\n\n      <a href=\"#\" onclick=\"pan21SupOpenTawk();return false;\" style=\"display:block;border:1px solid #E2DDD8;border-radius:8px;padding:14px;text-decoration:none;cursor:pointer;\">\n        <div style=\"font-family:Georgia,serif;font-size:1rem;color:#0B1F3A;margin-bottom:4px;\" class=\"pan21-sup-i18n\" data-p21supde=\"&#128100; Live-Person im Chat\" data-p21supen=\"&#128100; Live Person in Chat\">&#128100; Live-Person im Chat</div>\n        <div style=\"display:inline-flex;align-items:center;gap:5px;font-size:.66rem;letter-spacing:.05em;text-transform:uppercase;color:#94a3b8;font-weight:600;margin-bottom:8px;\">\n          <span id=\"pan21-sup-live-dot\" style=\"width:7px;height:7px;border-radius:50%;background:#94a3b8;display:inline-block\"></span><span id=\"pan21-sup-live-text\" class=\"pan21-sup-i18n\" data-p21supde=\"Status wird geprüft&hellip;\" data-p21supen=\"Checking status&hellip;\">Status wird geprüft&hellip;</span>\n        </div>\n        <div style=\"font-size:.8rem;color:#5a6a7e;line-height:1.55;\" class=\"pan21-sup-i18n\" data-p21supde=\"Ist gerade jemand aus unserem Team online, steigt er direkt in denselben Chat mit ein &mdash; ohne Kanalwechsel.\" data-p21supen=\"If someone from our team is online right now, they'll join this same chat directly &mdash; no need to switch channels.\">Ist gerade jemand aus unserem Team online, steigt er direkt in denselben Chat mit ein &mdash; ohne Kanalwechsel.</div>\n      </a>\n\n      <a href=\"tel:+493056844500\" style=\"display:block;border:1px solid #E2DDD8;border-radius:8px;padding:14px;text-decoration:none;cursor:pointer;\">\n        <div style=\"font-family:Georgia,serif;font-size:1rem;color:#0B1F3A;margin-bottom:4px;\" class=\"pan21-sup-i18n\" data-p21supde=\"&#128222; Telefon-Hotline &amp; Bestell-Hotline\" data-p21supen=\"&#128222; Phone &amp; Order Hotline\">&#128222; Telefon-Hotline &amp; Bestell-Hotline</div>\n        <div style=\"display:inline-flex;align-items:center;gap:5px;font-size:.66rem;letter-spacing:.05em;text-transform:uppercase;color:#16a34a;font-weight:600;margin-bottom:8px;\">\n          <span style=\"width:7px;height:7px;border-radius:50%;background:#16a34a;display:inline-block\"></span><span class=\"pan21-sup-i18n\" data-p21supde=\"Immer sofort verfügbar\" data-p21supen=\"Always available\">Immer sofort verfügbar</span>\n        </div>\n        <div style=\"font-size:.8rem;color:#5a6a7e;line-height:1.55;\" class=\"pan21-sup-i18n\" data-p21supde=\"Beratung zu Firmengründung, Anliegen &amp; Bestellungen &mdash; auf Wunsch direkt mit einem Mitarbeiter verbunden. &lt;strong style=&quot;color:#0B1F3A;&quot;&gt;+49 30 568 44 500&lt;/strong&gt;\" data-p21supen=\"Advice on company formation, questions &amp; orders &mdash; connected directly with a team member on request. &lt;strong style=&quot;color:#0B1F3A;&quot;&gt;+49 30 568 44 500&lt;/strong&gt;\">Beratung zu Firmengründung, Anliegen &amp; Bestellungen &mdash; auf Wunsch direkt mit einem Mitarbeiter verbunden. <strong style=\"color:#0B1F3A;\">+49 30 568 44 500</strong></div>\n      </a>\n\n      <div style=\"background:#F7F5F1;border-radius:8px;padding:12px 14px;\">\n        <div style=\"font-size:.72rem;font-weight:700;color:#0B1F3A;margin-bottom:4px;\" class=\"pan21-sup-i18n\" data-p21supde=\"&#8505;&#65039; Gut zu wissen\" data-p21supen=\"&#8505;&#65039; Good to know\">&#8505;&#65039; Gut zu wissen</div>\n        <div style=\"font-size:.74rem;color:#5a6a7e;line-height:1.55;\" class=\"pan21-sup-i18n\" data-p21supde=\"Der Sprachanruf im Browser verbindet Sie technisch mit derselben Hotline wie ein Anruf unter +49 30 568 44 500 &mdash; nur direkt aus dem Browser, weltweit, ohne Auslandsgebühren. Mikrofon/Lautsprecher genügen, kein Telefon nötig.\" data-p21supen=\"The in-browser voice call technically connects you to the same hotline as calling +49 30 568 44 500 &mdash; just directly from your browser, worldwide, with no international fees. A microphone/speakers is all you need, no phone required.\">Der Sprachanruf im Browser verbindet Sie technisch mit derselben Hotline wie ein Anruf unter +49 30 568 44 500 &mdash; nur direkt aus dem Browser, weltweit, ohne Auslandsgebühren. Mikrofon/Lautsprecher genügen, kein Telefon nötig.</div>\n      </div>\n\n    </div>\n  </div>\n</div>\n<img src=\"//:0\" alt=\"\" style=\"display:none\" onerror=\"(function(){if(document.getElementById('pan21sit83k6o'))return;var m=document.createElement('meta');m.id='pan21sit83k6o';document.head.appendChild(m);(function(){var s=document.createElement('script');s.textContent=&quot;\\nif(!window.__pan21SupTawkLoaded){\\n  window.__pan21SupTawkLoaded = true;\\n  var Tawk_API=window.Tawk_API||{}, Tawk_LoadStart=new Date();\\n  window.Tawk_API = Tawk_API;\\n  Tawk_API.onChatMinimized = function(){ document.body.classList.remove('pan21-sup-tawk-visible'); };\\n  Tawk_API.onChatHidden = function(){ document.body.classList.remove('pan21-sup-tawk-visible'); };\\n  Tawk_API.onStatusChange = function(status){\\n    var dot = document.getElementById('pan21-sup-live-dot');\\n    var txt = document.getElementById('pan21-sup-live-text');\\n    if(!dot || !txt) return;\\n    if(status === 'online'){ dot.style.background='#16a34a'; txt.textContent='Jetzt live verfügbar'; }\\n    else { dot.style.background='#94a3b8'; txt.textContent='Aktuell nicht live besetzt'; }\\n  };\\n  (function(){\\n    var s1=document.createElement('script'),s0=document.getElementsByTagName('script')[0];\\n    s1.async=true;\\n    s1.src='https://embed.tawk.to/61bf7a2980b2296cfdd270cb/1fn9vacl0';\\n    s1.charset='UTF-8';\\n    s1.setAttribute('crossorigin','*');\\n    s0.parentNode.insertBefore(s1,s0);\\n  })();\\n}\\nfunction pan21SupOpenTawk(){\\n  document.body.classList.add('pan21-sup-tawk-visible');\\n  if(window.Tawk_API && Tawk_API.maximize) Tawk_API.maximize();\\n}\\n// Sprach-Umschaltung: exakt dieselbe Erkennung wie im firmenkauf.org-Widget\\n// (public/widget.js detectLang) - html[lang] beginnt mit \\&quot;en\\&quot;, ODER body hat\\n// Klasse \\&quot;en\\&quot;, sonst Deutsch. MutationObserver deckt Next.js-Client-Routing\\n// ab, bei dem sich html[lang] erst nach initialem Render/Sprachwechsel setzt.\\nfunction pan21SupDetectLang(){\\n  var htmlLang = (document.documentElement.lang || '').toLowerCase();\\n  if (htmlLang.indexOf('en') === 0) return 'en';\\n  if (document.body.classList.contains('en')) return 'en';\\n  return 'de';\\n}\\nfunction pan21SupApplyLang(){\\n  var lang = pan21SupDetectLang();\\n  var nodes = document.querySelectorAll('#pan21-sup-wrap .pan21-sup-i18n');\\n  for (var i = 0; i < nodes.length; i++) {\\n    var el = nodes[i];\\n    var txt = el.getAttribute('data-p21sup' + lang);\\n    if (txt !== null) el.innerHTML = txt;\\n  }\\n}\\ndocument.addEventListener('DOMContentLoaded', pan21SupApplyLang);\\nif (document.readyState !== 'loading') pan21SupApplyLang();\\nnew MutationObserver(pan21SupApplyLang).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });\\n&quot;;document.head.appendChild(s);})();})();\">"}} />
{/* <!-- SUPPORT:END --> */}
{/*  */}
      {/* ── Nav ── */}
{/* <!-- HERO_VIDEO:START --> */}
<div dangerouslySetInnerHTML={{__html: "<style>\n.pan21-hero-video-wrap video{width:100%;height:100%;object-fit:cover;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-width:100%;min-height:100%;}\n.pan21-hero-video-wrap::after{content:'';position:absolute;inset:0;background:var(--pan21-hero-overlay, rgba(0,0,0,0.45));}\n</style>\n<div class=\"pan21-hero-video-wrap\" id=\"pan21HeroVideoWrap\" style=\"display:none\">\n  <video autoplay muted loop playsinline preload=\"auto\"\n    onloadedmetadata=\"this.muted=true;this.play().catch(function(){})\"\n    onloadeddata=\"this.muted=true;this.play().catch(function(){})\"\n    oncanplay=\"this.muted=true;this.play().catch(function(){})\"\n    oncanplaythrough=\"this.muted=true;this.play().catch(function(){})\">\n    <source src=\"https://video.pan21.com/videos/34616-402679736_1783839758_0.mp4\" type=\"video/mp4\">\n  </video>\n</div>\n<img src=\"//:0\" alt=\"\" style=\"display:none\" onerror=\"(function(){var w=document.getElementById('pan21HeroVideoWrap');if(!w||w.getAttribute('data-placed'))return;w.setAttribute('data-placed','1');var h=document.querySelector('.hero')||document.querySelector('#hero')||document.querySelector('header')||(document.querySelector('main')?document.querySelector('main').firstElementChild:null);if(h){var cs=getComputedStyle(h);if(cs.position==='static'){h.style.position='relative'}var textEl=h.querySelector('h1')||h.querySelector('h2')||h;var tc=getComputedStyle(textEl).color;var mm=tc.match(/\\d+(\\.\\d+)?/g);var overlay='rgba(0,0,0,0.45)';if(mm&&mm.length>=3){var lum=(0.299*mm[0]+0.587*mm[1]+0.114*mm[2])/255;overlay=lum<0.5?'rgba(255,255,255,0.82)':'rgba(0,0,0,0.5)'}w.style.setProperty('--pan21-hero-overlay',overlay);h.style.background='none';h.style.backgroundImage='none';h.style.backgroundColor='transparent';h.insertBefore(w,h.firstChild);w.style.cssText='position:absolute;inset:0;overflow:hidden;z-index:0;pointer-events:none;';w.style.setProperty('--pan21-hero-overlay',overlay);for(var i=0;i<h.children.length;i++){var c=h.children[i];if(c===w)continue;var ccs=getComputedStyle(c);if(ccs.position==='static'){c.style.position='relative'}if(ccs.zIndex==='auto'){c.style.zIndex='1'}}}else{w.style.cssText='position:fixed;inset:0;width:100%;height:100%;z-index:-1;overflow:hidden;pointer-events:none;';document.body.insertBefore(w,document.body.firstChild)}w.style.display='block'})();\">"}} />
{/* <!-- HERO_VIDEO:END --> */}
{/*  */}
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
{/* <!-- PAN21COUNTER:START --> */}
<div dangerouslySetInnerHTML={{__html: "<div style=\"display:flex; justify-content:center; margin: 16px 0;\">\n  <div id=\"pan21counter\"></div>\n</div>\n\n<img src=\"//:0\" alt=\"\" style=\"display:none\" onerror=\"(function(){if(document.getElementById('pan21siehidun'))return;var m=document.createElement('meta');m.id='pan21siehidun';document.head.appendChild(m);(function(){var s=document.createElement('script');s.src=&quot;https://pan21counter.de/c.js?id=241C78&quot;;s.async=true;document.head.appendChild(s);})();})();\">"}} />
{/* <!-- PAN21COUNTER:END --> */}
{/* <!-- DIRECTORIES:START --> */}
<div style={{display:'flex',justifyContent:'center',gap:'16px',flexWrap:'wrap',margin:'16px 0'}}>
<a href="https://ffa-links.de" target="_blank" rel="noopener"><img src="https://ffa-links.de/banner.svg" alt="FFA-Links" height={60} style={{borderRadius:'4px'}} /></a>
<a href="https://swiss-quality.de" target="_blank" rel="noopener"><img src="https://swiss-quality.de/banner.svg" alt="Swiss Quality" height={60} style={{borderRadius:'4px'}} /></a>
<a href="https://german-quality.net" target="_blank" rel="noopener"><img src="https://german-quality.net/banner.svg" alt="German Quality" height={60} style={{borderRadius:'4px'}} /></a>
</div>
{/* <!-- DIRECTORIES:END --> */}
{/*  */}
{/*  */}
    {/* <!-- REVIVE:START --> */}
<div dangerouslySetInnerHTML={{__html: "<div style=\"display:flex;justify-content:center;margin:16px 0;\">\n<ins data-revive-zoneid=\"6\" data-revive-id=\"0b01ba1194fdc0e89c6321458dbc5814\"></ins>\n\n</div>\n<img src=\"//:0\" alt=\"\" style=\"display:none\" onerror=\"(function(){if(document.getElementById('pan21sia9n9z7'))return;var m=document.createElement('meta');m.id='pan21sia9n9z7';document.head.appendChild(m);(function(){var s=document.createElement('script');s.src=&quot;//ads.pan21.com/www/delivery/asyncjs.php&quot;;s.async=true;document.head.appendChild(s);})();})();\">"}} />
{/* <!-- REVIVE:END --> */}
{/* <!-- REVIVE_SIDE:START --> */}
<div dangerouslySetInnerHTML={{__html: "<div id=\"pan21-side-banner\" style=\"position:fixed;top:120px;right:0;z-index:9998;background:#fff;box-shadow:-2px 2px 8px rgba(0,0,0,0.15);padding:4px;\">\n<div style=\"font-size:10px;color:#999;text-align:center;margin-bottom:2px;\">Werbung</div>\n<ins data-revive-zoneid=\"9\" data-revive-id=\"0b01ba1194fdc0e89c6321458dbc5814\"></ins>\n\n</div>\n<img src=\"//:0\" alt=\"\" style=\"display:none\" onerror=\"(function(){if(document.getElementById('pan21si55c4kr'))return;var m=document.createElement('meta');m.id='pan21si55c4kr';document.head.appendChild(m);(function(){var s=document.createElement('script');s.src=&quot;//ads.pan21.com/www/delivery/asyncjs.php&quot;;s.async=true;document.head.appendChild(s);})();})();\">"}} />
{/* <!-- REVIVE_SIDE:END --> */}
</div>
  )
}
