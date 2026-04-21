'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface CountdownInfo {
  active: boolean
  started: boolean
  endsAt: number | null
  priceInCents: number
}

function CountdownTimer({ endsAt }: { endsAt: number }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const diff = endsAt - Date.now()
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        return
      }
      const h = Math.floor(diff / (1000 * 60 * 60))
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft({ hours: h, minutes: m, seconds: s })
    }
    calc()
    const interval = setInterval(calc, 1000)
    return () => clearInterval(interval)
  }, [endsAt])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex items-center gap-1 justify-center">
      <div className="text-center">
        <span className="font-sans text-2xl font-bold text-[#E8C46A]">{pad(timeLeft.hours)}</span>
        <p className="font-sans text-[10px] text-[#C9A84C] uppercase tracking-widest mt-0.5">hrs</p>
      </div>
      <span className="text-[#C9A84C] text-xl mb-4">:</span>
      <div className="text-center">
        <span className="font-sans text-2xl font-bold text-[#E8C46A]">{pad(timeLeft.minutes)}</span>
        <p className="font-sans text-[10px] text-[#C9A84C] uppercase tracking-widest mt-0.5">min</p>
      </div>
      <span className="text-[#C9A84C] text-xl mb-4">:</span>
      <div className="text-center">
        <span className="font-sans text-2xl font-bold text-[#E8C46A]">{pad(timeLeft.seconds)}</span>
        <p className="font-sans text-[10px] text-[#C9A84C] uppercase tracking-widest mt-0.5">sec</p>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [countdownInfo, setCountdownInfo] = useState<CountdownInfo | null>(null)

  useEffect(() => {
    fetch('/api/price')
      .then(r => r.json())
      .then(setCountdownInfo)
      .catch(() => {})
  }, [])

  const price = countdownInfo ? (countdownInfo.priceInCents / 100).toFixed(0) : '17'
  const isIntroPrice = countdownInfo ? countdownInfo.priceInCents === 1700 : true

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return setError('Please enter your email.')
    if (!/\S+@\S+\.\S+/.test(email)) return setError('Please enter a valid email.')
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0d0406]">

      {/* HERO — Fire background + headline */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/fire.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-45"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0406]/60 via-[#0d0406]/10 to-[#0d0406]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto fade-in-up">
          <p className="font-sans text-[11px] tracking-[0.4em] text-[#C9A84C] uppercase mb-6">
            A Session with Ariana
          </p>

          <div className="divider mb-8" />

          <h1 className="font-serif text-5xl md:text-7xl font-light text-[#faf8f5] leading-tight mb-2">
            The Good Girl
          </h1>
          <h1 className="font-serif text-5xl md:text-7xl font-light gold-shimmer leading-tight mb-8">
            Wound Map
          </h1>

          <div className="divider mb-8" />

          <p className="font-serif text-lg md:text-xl text-[#faf8f5]/80 font-light italic leading-relaxed max-w-lg mx-auto">
            Identifies your root wound and exactly how it&apos;s been running your life in 30 minutes.
          </p>

          <a
            href="#begin"
            className="inline-block mt-10 font-sans text-[11px] tracking-[0.3em] uppercase text-[#E8C46A] border border-[#C9A84C]/40 px-8 py-3 hover:border-[#E8C46A] hover:text-white transition-all duration-300"
          >
            Find Your Wound →
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent animate-pulse" />
        </div>
      </section>

      {/* COPY — The gap */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="font-serif text-xl md:text-2xl font-light text-[#faf8f5]/80 leading-relaxed italic mb-12">
          While you&apos;re reading the books, going to therapy, doing the inner work, and still waking up in the same patterns…
        </p>

        <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-6">
          The women who actually change have ONE thing you don&apos;t yet have:
        </p>

        <p className="font-serif text-2xl md:text-3xl text-[#faf8f5] font-light leading-relaxed mb-16">
          they know exactly which wound is driving the wheel.
        </p>

        <div className="space-y-5 text-left max-w-xl mx-auto">
          {[
            "They don't keep choosing the same relationship.",
            "They don't apologize before they've done anything wrong.",
            "They don't shrink right when they're about to be seen.",
            "They don't perform peace when they're actually furious.",
            "They know which part of their childhood is still making decisions for their adult life.",
            "And they stopped letting her.",
          ].map((line, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="text-[#C9A84C] mt-1 flex-shrink-0 text-lg">—</span>
              <p className="font-serif text-lg text-[#faf8f5]/85 font-light leading-relaxed">{line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ARIANA PHOTO */}
      <section className="relative h-[55vh] overflow-hidden">
        <Image
          src="/images/ariana.jpg"
          alt=""
          fill
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0406] via-transparent to-[#0d0406]" />
      </section>

      {/* WHY UNDERSTANDING ISN'T ENOUGH */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="divider mb-10" />
          <p className="font-serif text-xl md:text-2xl text-[#faf8f5]/75 font-light italic leading-relaxed mb-8">
            Most women spend years in healing spaces and never get this specific. They understand their trauma. They can trace it. They can explain it.
          </p>
          <p className="font-serif text-2xl md:text-3xl text-[#faf8f5] font-light">
            And they are still stuck in it.
          </p>
          <div className="divider mt-10" />
        </div>

        <div className="space-y-8 text-center">
          <p className="font-serif text-lg text-[#faf8f5]/75 font-light leading-relaxed">
            Understanding your wound and actually <em>knowing</em> what it is — how it formed, how it lives in your body, what it sounds like, and when it speaks — those are two completely different things.
          </p>
          <p className="font-serif text-xl text-[#faf8f5]/80 font-light leading-relaxed">
            You&apos;ve been working on the symptoms.
          </p>
          <p className="font-serif text-2xl text-[#C9A84C] font-light leading-relaxed italic">
            We are going directly to the root.
          </p>
          <p className="font-serif text-xl text-[#faf8f5] font-light">
            This session names it.
          </p>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="max-w-xl mx-auto px-6 pb-16">
        <div className="border border-[#C9A84C]/25 p-10">
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-6 text-center">You&apos;ll leave knowing</p>
          <div className="space-y-4">
            {[
              'Which Good Girl wound archetype you carry',
              'The age your inner child got stuck',
              'The root belief you\'ve been living by without knowing it',
              'Exactly how this shows up in your life right now',
              'A real practice to begin integrating it today',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#C9A84C] flex-shrink-0 mt-0.5">—</span>
                <p className="font-serif text-base text-[#faf8f5]/80 font-light">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYMENT */}
      <section id="begin" className="max-w-lg mx-auto px-6 pb-28">
        <div className="text-center mb-10">
          <div className="divider mb-10" />

          {countdownInfo?.started && countdownInfo.active && countdownInfo.endsAt && (
            <div className="mb-8 p-5 border border-[#C9A84C]/30 bg-[#1a080c]">
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">
                Offer ends in
              </p>
              <CountdownTimer endsAt={countdownInfo.endsAt} />
            </div>
          )}

          <div className="mb-6">
            <span className="font-serif text-6xl text-[#faf8f5] font-light">${price}</span>
            {isIntroPrice && countdownInfo?.started && (
              <span className="font-sans text-base text-[#faf8f5]/30 ml-3 line-through">$33</span>
            )}
          </div>

          <p className="font-serif text-lg text-[#faf8f5]/50 italic font-light mb-10">
            Evolve or repeat. The quality of your life depends on you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full bg-transparent border border-[#C9A84C]/30 text-[#faf8f5] font-sans text-sm px-5 py-4 placeholder:text-[#faf8f5]/30 focus:outline-none focus:border-[#C9A84C] transition-colors"
          />
          {error && <p className="font-sans text-xs text-red-400 mt-1">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8B2635] hover:bg-[#A63545] text-[#faf8f5] font-sans text-[11px] tracking-[0.35em] uppercase py-5 transition-all duration-300 disabled:opacity-60"
          >
            {loading ? 'One moment...' : '→ Find Your Wound'}
          </button>
          <p className="font-sans text-[10px] text-center text-[#faf8f5]/25 tracking-wider">
            Secure payment via Stripe · Your results are emailed to you
          </p>
        </form>
      </section>

    </main>
  )
}
