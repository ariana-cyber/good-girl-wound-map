'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { questions } from '@/lib/questions'

type Phase = 'verifying' | 'intro' | 'shadow' | 'questions' | 'generating' | 'error'

interface Answers {
  [key: string]: string | string[]
}

function SessionContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const stripeSessionId = searchParams.get('session_id')

  const [phase, setPhase] = useState<Phase>('verifying')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [selected, setSelected] = useState<string[]>([])
  const [followupText, setFollowupText] = useState('')
  const [showFollowup, setShowFollowup] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!stripeSessionId) {
      setPhase('error')
      setErrorMsg('No session found. Please complete your purchase first.')
      return
    }
    // Small delay then show intro
    setTimeout(() => setPhase('intro'), 800)
  }, [stripeSessionId])

  const question = questions[currentQ]
  const isMulti = question?.type === 'multi'
  const isOpen = question?.type === 'open'
  const progress = ((currentQ + (showFollowup ? 0.5 : 0)) / questions.length) * 100

  const handleOptionSelect = (opt: string) => {
    if (isMulti) {
      setSelected(prev =>
        prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
      )
    } else {
      setSelected([opt])
    }
  }

  const handleNext = () => {
    if (!showFollowup) {
      if (!isOpen && selected.length === 0) return
      setShowFollowup(true)
      return
    }

    // Save answers
    const key = `q${question.id}`
    const newAnswers = {
      ...answers,
      [key]: isMulti ? selected : (isOpen ? followupText.split('\n')[0] : selected[0]),
      [`${key}_followup`]: followupText,
    }

    // For open questions the "main" answer is the text, followup is the deeper prompt
    if (isOpen) {
      newAnswers[key] = selected[0] || followupText.split('\n')[0] || ''
    }

    setAnswers(newAnswers)

    // Auto-save to DB
    fetch('/api/save-answers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stripeSessionId, answers: newAnswers }),
    }).catch(() => {})

    if (currentQ < questions.length - 1) {
      setAnimating(true)
      setTimeout(() => {
        setCurrentQ(prev => prev + 1)
        setSelected([])
        setFollowupText('')
        setShowFollowup(false)
        setAnimating(false)
      }, 400)
    } else {
      generateResults(newAnswers)
    }
  }

  const generateResults = async (finalAnswers: Answers) => {
    setPhase('generating')
    try {
      const res = await fetch('/api/generate-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stripeSessionId, answers: finalAnswers }),
      })
      const data = await res.json()
      if (data.archetype) {
        // Store result in sessionStorage for results page
        sessionStorage.setItem('woundMapResult', JSON.stringify(data))
        router.push('/results')
      } else {
        setPhase('error')
        setErrorMsg('Something went wrong generating your results. Please email ariana@traumaistreasure.com.')
      }
    } catch {
      setPhase('error')
      setErrorMsg('Something went wrong. Please email ariana@traumaistreasure.com.')
    }
  }

  // ── VERIFYING ──
  if (phase === 'verifying') {
    return (
      <div className="min-h-screen bg-[#0d0406] flex items-center justify-center">
        <div className="text-center fade-in-up">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent mx-auto mb-8 animate-pulse" />
          <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C]">Confirming your access</p>
        </div>
      </div>
    )
  }

  // ── ERROR ──
  if (phase === 'error') {
    return (
      <div className="min-h-screen bg-[#0d0406] flex items-center justify-center px-6">
        <div className="text-center max-w-md fade-in-up">
          <p className="font-serif text-xl text-[#faf8f5]/80 font-light leading-relaxed">{errorMsg}</p>
          <a href="/" className="inline-block mt-8 font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] border border-[#C9A84C]/40 px-6 py-3">
            ← Return Home
          </a>
        </div>
      </div>
    )
  }

  // ── GENERATING ──
  if (phase === 'generating') {
    return (
      <div className="min-h-screen bg-[#0d0406] flex items-center justify-center px-6">
        <div className="text-center max-w-md fade-in-up">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent mx-auto mb-10 animate-pulse" />
          <h2 className="font-serif text-3xl text-[#faf8f5] font-light mb-4">Reading your pattern</h2>
          <p className="font-serif text-lg text-[#faf8f5]/50 italic font-light leading-relaxed">
            The way a real therapist sits with everything you&apos;ve shared — all at once. This takes a moment.
          </p>
          <div className="flex justify-center gap-2 mt-12">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    )
  }

  // ── INTRO SCREEN 1 ──
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-[#0d0406] flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center fade-in-up">
          <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-6">But wait…</p>
          <div className="divider mb-10" />
          <h1 className="font-serif text-4xl md:text-5xl text-[#faf8f5] font-light mb-10 leading-tight">
            Before We Begin
          </h1>

          <div className="space-y-6 text-left max-w-xl mx-auto mb-12">
            <p className="font-serif text-lg text-[#faf8f5]/80 font-light leading-relaxed">
              You are here for a reason. To collapse time so you can unlock higher wealth, love and manifestations. To finally feel safe being seen in your feral raw expression.
            </p>
            <p className="font-serif text-lg text-[#faf8f5]/80 font-light leading-relaxed">
              Why do some people achieve their goals and happily cross off everything on the vision board — and others don&apos;t?
            </p>
            <p className="font-serif text-lg text-[#faf8f5]/80 font-light leading-relaxed">
              It has nothing to do with desire. It is their ability to go deep and alchemize the uncomfortable things that lie in the unseen. Stagnancy exists when you&apos;ve been working and focusing only on the surface.
            </p>
            <p className="font-serif text-xl text-[#C9A84C] font-light italic leading-relaxed text-center">
              The shadow is required for clarity to lead.
            </p>
          </div>

          <button
            onClick={() => setPhase('shadow')}
            className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#E8C46A] border border-[#C9A84C]/40 px-8 py-4 hover:border-[#E8C46A] hover:bg-[#8B2635]/20 transition-all duration-300"
          >
            Continue →
          </button>
        </div>
      </div>
    )
  }

  // ── SHADOW WORK SCREEN ──
  if (phase === 'shadow') {
    return (
      <div className="min-h-screen bg-[#0d0406] py-20 px-6">
        <div className="max-w-2xl mx-auto fade-in-up">
          <div className="text-center mb-12">
            <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-6">Understanding the work</p>
            <div className="divider mb-8" />
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">What is shadow work?</h2>
              <p className="font-serif text-lg text-[#faf8f5]/80 font-light leading-relaxed">
                Shadow work is the process of identifying and integrating your unconscious psyche. The hidden parts of yourself that carry shame, guilt, strong emotional reactions, and negative cycles. It&apos;s exploring how you show up in the world and the masks you put on.
              </p>
              <p className="font-serif text-lg text-[#faf8f5]/80 font-light leading-relaxed mt-4">
                It is meeting all the parts of yourself you were taught to hide. The rage, needs, fears, wants. Everything you exiled to stay safe, to be loved, to survive.
              </p>
            </div>

            <div className="border-l border-[#C9A84C]/30 pl-6">
              <h2 className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">How it connects to the inner child</h2>
              <p className="font-serif text-lg text-[#faf8f5]/80 font-light leading-relaxed">
                Underneath every shadow pattern is a younger version of you who made a decision. Maybe at age 7 she decided: <em>if I stay quiet, no one gets hurt.</em> Maybe at age 12 she decided: <em>if I am helpful, I am loved.</em>
              </p>
              <p className="font-serif text-lg text-[#faf8f5]/80 font-light leading-relaxed mt-4">
                That younger version never left. She grew up inside of you, driving your decisions unconsciously — running your adult relationships, reactions, and self-sabotage from the background.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">What to expect</h2>
              <p className="font-serif text-lg text-[#faf8f5]/80 font-light leading-relaxed">
                This session will ask you 15 honest questions. Nobody will see this but you. There are absolutely no right answers — everything is your truth. The more honest you are, the more accurate your wound map will be.
              </p>
              <p className="font-serif text-lg text-[#C9A84C] font-light italic leading-relaxed mt-4">
                Take your time. Answer authentically. Invite in the uncomfortable emotions. You will be surprised at what rises when you give it a safe space to.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => setPhase('questions')}
              className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#E8C46A] border border-[#C9A84C]/40 px-10 py-5 hover:border-[#E8C46A] hover:bg-[#8B2635]/20 transition-all duration-300 text-base"
            >
              I&apos;m Ready. Begin My Session. →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── QUESTIONS ──
  return (
    <div className="min-h-screen bg-[#0d0406] py-16 px-6">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-px bg-[#1a080c]">
        <div
          className="h-full bg-gradient-to-r from-[#8B2635] to-[#C9A84C] transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={`max-w-2xl mx-auto transition-opacity duration-400 ${animating ? 'opacity-0' : 'opacity-100'}`}>

        {/* Question number */}
        <div className="text-center mb-10">
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C9A84C]">
            {showFollowup ? `Question ${currentQ + 1} of ${questions.length} — Go deeper` : `Question ${currentQ + 1} of ${questions.length}`}
          </p>
        </div>

        {!showFollowup ? (
          /* MAIN QUESTION */
          <div className="fade-in-up">
            <h2 className="font-serif text-2xl md:text-3xl text-[#faf8f5] font-light leading-relaxed mb-10 text-center">
              {question.question}
            </h2>

            {isOpen ? (
              <textarea
                value={selected[0] || ''}
                onChange={e => setSelected([e.target.value])}
                placeholder="Write freely. No one is watching."
                rows={6}
                className="w-full bg-transparent border border-[#C9A84C]/25 text-[#faf8f5] font-serif text-base px-5 py-4 focus:outline-none focus:border-[#C9A84C]/60 transition-colors leading-relaxed"
              />
            ) : (
              <div className="space-y-3">
                {question.options?.map((opt) => {
                  const isActive = selected.includes(opt)
                  return (
                    <button
                      key={opt}
                      onClick={() => handleOptionSelect(opt)}
                      className={`w-full text-left px-6 py-4 border transition-all duration-200 font-serif text-base leading-relaxed ${
                        isActive
                          ? 'border-[#C9A84C] bg-[#8B2635]/20 text-[#faf8f5]'
                          : 'border-[#C9A84C]/20 text-[#faf8f5]/70 hover:border-[#C9A84C]/50 hover:text-[#faf8f5]'
                      }`}
                    >
                      <span className={`mr-3 font-sans text-xs ${isActive ? 'text-[#C9A84C]' : 'text-[#C9A84C]/40'}`}>
                        {isMulti ? (isActive ? '■' : '□') : (isActive ? '●' : '○')}
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>
            )}

            <div className="flex justify-end mt-8">
              <button
                onClick={handleNext}
                disabled={!isOpen && selected.length === 0}
                className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#E8C46A] border border-[#C9A84C]/40 px-8 py-3 hover:border-[#E8C46A] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </div>
          </div>
        ) : (
          /* FOLLOW-UP */
          <div className="fade-in-up">
            <div className="mb-8 p-5 border-l border-[#C9A84C]/40">
              <p className="font-serif text-sm text-[#faf8f5]/50 italic">Your answer:</p>
              <p className="font-serif text-base text-[#faf8f5]/75 mt-1">
                {Array.isArray(selected) && selected.length > 0 ? selected.join(', ') : '—'}
              </p>
            </div>

            <h2 className="font-serif text-xl md:text-2xl text-[#C9A84C] font-light leading-relaxed mb-6 italic">
              {question.followUp}
            </h2>

            <textarea
              value={followupText}
              onChange={e => setFollowupText(e.target.value)}
              placeholder={question.followUpPlaceholder || 'Write freely...'}
              rows={7}
              className="w-full bg-transparent border border-[#C9A84C]/25 text-[#faf8f5] font-serif text-base px-5 py-4 focus:outline-none focus:border-[#C9A84C]/60 transition-colors leading-relaxed"
            />

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => setShowFollowup(false)}
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#faf8f5]/30 hover:text-[#faf8f5]/60 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#E8C46A] border border-[#C9A84C]/40 px-8 py-3 hover:border-[#E8C46A] transition-all duration-200"
              >
                {currentQ === questions.length - 1 ? 'Complete My Map →' : 'Next Question →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SessionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0d0406] flex items-center justify-center">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent animate-pulse" />
      </div>
    }>
      <SessionContent />
    </Suspense>
  )
}
