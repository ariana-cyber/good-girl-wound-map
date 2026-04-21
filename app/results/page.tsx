'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { archetypes } from '@/lib/archetypes'

interface ResultData {
  archetype: string
  archetypeData: (typeof archetypes)[string]
  aiResult: {
    personalizedOpening: string
    bodyReading: string
    specificPattern: string
    innerChildAge: string
    rootBeliefPersonalized: string
    whyThisArchetype: string
  }
  resultHtml: string
}

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<ResultData | null>(null)
  const [downloading, setDownloading] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('woundMapResult')
    if (!stored) {
      router.push('/')
      return
    }
    try {
      setResult(JSON.parse(stored))
    } catch {
      router.push('/')
    }
  }, [router])

  const handleDownloadPDF = async () => {
    setDownloading(true)
    try {
      const { jsPDF } = await import('jspdf')
      const html2canvas = (await import('html2canvas')).default

      const element = contentRef.current
      if (!element) return

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#0d0406',
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const canvasWidth = canvas.width
      const canvasHeight = canvas.height
      const ratio = pdfWidth / canvasWidth
      const imgHeight = canvasHeight * ratio

      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight)
      heightLeft -= pdfHeight

      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight)
        heightLeft -= pdfHeight
      }

      pdf.save(`good-girl-wound-map-${result?.archetype?.toLowerCase() || 'results'}.pdf`)
    } catch (err) {
      console.error('PDF error:', err)
    } finally {
      setDownloading(false)
    }
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-[#0d0406] flex items-center justify-center">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent animate-pulse" />
      </div>
    )
  }

  const { archetypeData, aiResult } = result

  return (
    <main className="min-h-screen bg-[#0d0406]">

      {/* Beautiful header */}
      <section className="text-center py-20 px-6 border-b border-[#C9A84C]/15">
        <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-6">Beautiful.</p>
        <div className="divider mb-8" />
        <h1 className="font-serif text-4xl md:text-5xl text-[#faf8f5] font-light mb-4">
          Your Wound Map
        </h1>
        <p className="font-serif text-lg text-[#faf8f5]/50 italic font-light">
          I invite you to leave today with peace.
        </p>
        <div className="divider mt-8" />
      </section>

      {/* Downloadable content */}
      <div ref={contentRef} className="bg-[#0d0406]">

        {/* Archetype banner */}
        <section className="py-16 px-6 text-center bg-gradient-to-b from-[#1a080c] to-[#0d0406]">
          <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-[#C9A84C] mb-4">Your Primary Wound</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-[#faf8f5] mb-3">{archetypeData.name}</h2>
          <p className="font-serif text-xl text-[#C9A84C] italic font-light">{archetypeData.subtitle}</p>
        </section>

        <div className="max-w-2xl mx-auto px-6 pb-20 space-y-16">

          {/* Personalized opening */}
          <section>
            <div className="p-8 border-l-2 border-[#C9A84C]">
              <p className="font-serif text-xl text-[#faf8f5] font-light leading-relaxed">{aiResult.personalizedOpening}</p>
            </div>
          </section>

          {/* The Wound */}
          <section>
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-6">The Wound</p>
            {archetypeData.wound.split('\n\n').map((para, i) => (
              <p key={i} className="font-serif text-lg text-[#faf8f5]/85 font-light leading-relaxed mb-4">{para}</p>
            ))}
          </section>

          {/* Root belief */}
          <section className="border border-[#C9A84C]/25 p-8 text-center">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">Root Belief</p>
            <p className="font-serif text-xl md:text-2xl text-[#faf8f5] font-light italic leading-relaxed">
              &ldquo;{aiResult.rootBeliefPersonalized}&rdquo;
            </p>
          </section>

          {/* Body */}
          <section>
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-6">Your Body</p>
            <p className="font-serif text-lg text-[#faf8f5]/85 font-light leading-relaxed">{aiResult.bodyReading}</p>
          </section>

          {/* The Pattern */}
          <section>
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-6">The Pattern</p>
            <p className="font-serif text-lg text-[#faf8f5]/85 font-light leading-relaxed">{aiResult.specificPattern}</p>
          </section>

          {/* Inner child */}
          <section className="bg-[#1a080c] p-8">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">Your Inner Child</p>
            <p className="font-serif text-lg text-[#faf8f5]/85 font-light leading-relaxed">{aiResult.innerChildAge}</p>
          </section>

          {/* Signs */}
          <section>
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-6">How This Lives in Your Life Right Now</p>
            <div className="space-y-4">
              {archetypeData.signs.map((sign, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="text-[#C9A84C] flex-shrink-0 mt-1">—</span>
                  <p className="font-serif text-lg text-[#faf8f5]/80 font-light leading-relaxed">{sign}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Closing 1 */}
          <section>
            {archetypeData.closingParagraph1.split('\n\n').map((para, i) => (
              <p key={i} className="font-serif text-lg text-[#faf8f5]/80 font-light leading-relaxed mb-6">{para}</p>
            ))}
          </section>

          {/* Body paragraph */}
          <section className="border-l-2 border-[#8B2635] pl-8">
            {archetypeData.closingParagraph2.split('\n\n').map((para, i) => (
              <p key={i} className="font-serif text-lg text-[#faf8f5]/80 font-light leading-relaxed mb-6">{para}</p>
            ))}
          </section>

          {/* What you need */}
          <section>
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-6">What You Actually Need</p>
            {archetypeData.closingParagraph3.split('\n\n').map((para, i) => (
              <p key={i} className="font-serif text-lg text-[#faf8f5]/80 font-light leading-relaxed mb-4">{para}</p>
            ))}
          </section>

          {/* Integration practice */}
          <section className="bg-gradient-to-br from-[#1a080c] to-[#0d0406] border border-[#C9A84C]/20 p-10">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#E8C46A] mb-6">Your First Step — Do This Today</p>
            <p className="font-serif text-sm text-[#C9A84C]/60 italic mb-6">
              There is no time like the present.
            </p>
            {archetypeData.integrationPractice.split('\n\n').map((para, i) => (
              <p key={i} className="font-serif text-lg text-[#faf8f5]/85 font-light leading-relaxed mb-5">{para}</p>
            ))}
          </section>

          {/* Closing */}
          <section className="text-center py-10 border-t border-b border-[#C9A84C]/15">
            <p className="font-serif text-xl text-[#C9A84C] italic font-light leading-relaxed mb-6">
              You didn&apos;t come here by accident. And I&apos;m not telling you anything that you weren&apos;t ready to receive.
            </p>
            <p className="font-serif text-lg text-[#faf8f5]/70 font-light leading-relaxed max-w-xl mx-auto mb-6">
              The Wound Map shows you what you&apos;re working with. That awareness is real. It matters. What comes next is the work of actually changing — not just understanding the pattern, but living as a different woman.
            </p>
            <p className="font-serif text-xl text-[#faf8f5] font-light leading-relaxed">
              You know your wound. Now let&apos;s end it.
            </p>
            <p className="font-serif text-2xl text-[#C9A84C] font-light italic mt-4">
              You are ready for Good Girl → Wild Woman.
            </p>
          </section>

        </div>
      </div>

      {/* Action buttons */}
      <section className="max-w-lg mx-auto px-6 py-16 space-y-4">
        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="w-full border border-[#C9A84C]/40 text-[#E8C46A] font-sans text-[11px] tracking-[0.3em] uppercase py-4 hover:border-[#E8C46A] hover:bg-[#C9A84C]/5 transition-all duration-300 disabled:opacity-50"
        >
          {downloading ? 'Preparing PDF...' : '↓ Save My Wound Map (PDF)'}
        </button>

        <p className="font-sans text-[10px] text-center text-[#faf8f5]/25 tracking-wider">
          Your results have also been sent to your email
        </p>
      </section>

    </main>
  )
}
