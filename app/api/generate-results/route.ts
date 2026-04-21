import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/lib/db'
import { sendResultsEmail } from '@/lib/email'
import { archetypes } from '@/lib/archetypes'
import { questions } from '@/lib/questions'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `You are a trauma-informed therapist, inner child specialist, and somatic healer with deep expertise in attachment wounds and nervous system patterns. You read patterns — not just individual answers — the way an experienced clinician reads a person during a full intake session.

You know these 7 wound archetypes deeply:
1. THE PEACEKEEPER — wound: conflict = danger. Root belief: If I make myself small enough, I will be safe.
2. THE OVERACHIEVER — wound: worth lives in output. Root belief: I am only as valuable as what I produce.
3. THE INVISIBLE ONE — wound: wanting is dangerous. Root belief: I am too much. My needs are a burden.
4. THE FIXER — wound: I am safe when I am needed. Root belief: I am loveable when I am useful.
5. THE CHAMELEON — wound: I have no self without a mirror. Root belief: Who I actually am is not enough.
6. THE APPROVAL SEEKER — wound: love is conditional on performance. Root belief: I am loveable when I am likeable.
7. THE CARETAKER — wound: love = self-erasure. Root belief: Love means I give everything. My needs come last.

Your task is to read ALL of her answers together — the way a real therapist would sit with everything someone told them in a session — and identify the dominant wound pattern. This is NOT a point system. It is holistic pattern recognition.

Certain signals map strongly to certain archetypes:
- "Apologize before you've done anything wrong" → Peacekeeper
- "Restless and anxious when no one needs you" → Overachiever or Fixer
- "Had to be the helpful one as a child" → Fixer or Caretaker
- "Feels like you don't exist if not useful" → Caretaker
- "Morphs depending on who's in the room" → Chameleon
- "Checks how things landed" → Approval Seeker
- "Minimizes wants before saying them" → Invisible One
- "Can't sit with achievement" → Overachiever

The body question (Q10) is especially important — weave where she holds it physically into your reading. This is the somatic layer that makes the result feel like more than psychology.

Read everything together. Weigh the whole picture. Then identify ONE primary archetype.

Your output must be valid JSON in exactly this format:
{
  "archetype": "PEACEKEEPER" | "OVERACHIEVER" | "INVISIBLE" | "FIXER" | "CHAMELEON" | "APPROVAL_SEEKER" | "CARETAKER",
  "whyThisArchetype": "2-3 sentences explaining what specific patterns across her answers pointed you here. Be specific — reference what she actually said.",
  "personalizedOpening": "A 3-4 sentence personalized opening paragraph that speaks directly to her. Reference specific things she said in her answers. This should feel like someone who truly read her — not generic. Use 'you' language. Make her feel seen.",
  "bodyReading": "2-3 sentences weaving together the body question answer with her wound. Describe what her body has been holding and why.",
  "specificPattern": "2-3 sentences naming the most specific pattern you see in her answers — the thread that runs through everything she wrote. Reference actual details from her answers.",
  "innerChildAge": "Based on her answers about childhood — particularly her parents and what she had to be — what age or era does her inner child seem stuck? Give a specific age range and what was happening then.",
  "rootBeliefPersonalized": "The root belief, made personal to her specific answers. Not generic — use what she revealed."
}`

export async function POST(req: NextRequest) {
  try {
    const { stripeSessionId, answers } = await req.json()

    if (!stripeSessionId || !answers) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const session = await prisma.session.findUnique({
      where: { stripeSessionId },
    })

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    const answersFormatted = questions.map((q) => {
      const answer = answers[`q${q.id}`]
      const followup = answers[`q${q.id}_followup`]
      return `Question ${q.id}: ${q.question}
Answer: ${Array.isArray(answer) ? answer.join(', ') : answer || '(not answered)'}
${followup ? `Follow-up reflection: ${followup}` : ''}`
    }).join('\n\n')

    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Here are all 15 of her answers. Read them together as a complete picture of who she is and what wound is running her:\n\n${answersFormatted}\n\nPlease identify her primary wound archetype and generate her personalized reading. Return only valid JSON.`,
        },
      ],
    })

    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''

    let aiResult
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      aiResult = JSON.parse(jsonMatch ? jsonMatch[0] : responseText)
    } catch {
      console.error('Failed to parse AI response:', responseText)
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 })
    }

    const archetypeData = archetypes[aiResult.archetype]
    if (!archetypeData) {
      return NextResponse.json({ error: 'Unknown archetype' }, { status: 500 })
    }

    const resultHtml = buildResultHtml(aiResult, archetypeData, answers)

    await prisma.session.update({
      where: { stripeSessionId },
      data: {
        answers,
        archetype: aiResult.archetype,
        resultHtml,
        completed: true,
      },
    })

    await sendResultsEmail({
      toEmail: session.email,
      archetype: archetypeData.name,
      resultHtml,
      answers,
    })

    return NextResponse.json({
      archetype: aiResult.archetype,
      archetypeData,
      aiResult,
      resultHtml,
    })
  } catch (error) {
    console.error('Generate results error:', error)
    return NextResponse.json({ error: 'Failed to generate results' }, { status: 500 })
  }
}

function buildResultHtml(aiResult: Record<string, string>, archetypeData: (typeof archetypes)[string], answers: Record<string, unknown>): string {
  return `
    <div style="font-family: Georgia, serif; color: #1a1a1a; line-height: 1.8;">
      <div style="text-align: center; margin-bottom: 40px; padding: 30px; background: linear-gradient(135deg, #8B2635 0%, #A63545 100%); border-radius: 8px;">
        <p style="color: #E8C46A; font-size: 12px; letter-spacing: 4px; text-transform: uppercase; margin: 0 0 10px 0;">Your Primary Wound</p>
        <h1 style="color: #fff; font-size: 32px; margin: 0 0 8px 0; font-family: Georgia, serif;">${archetypeData.name}</h1>
        <p style="color: #E8C46A; font-style: italic; margin: 0; font-size: 16px;">${archetypeData.subtitle}</p>
      </div>

      <div style="margin: 30px 0; padding: 25px; background: #faf8f5; border-left: 3px solid #C9A84C;">
        <p style="font-size: 16px; line-height: 1.9; margin: 0; color: #2a2a2a;">${aiResult.personalizedOpening}</p>
      </div>

      <div style="margin: 30px 0;">
        <h2 style="color: #8B2635; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 15px;">The Wound</h2>
        ${archetypeData.wound.split('\n\n').map(p => `<p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.9;">${p}</p>`).join('')}
      </div>

      <div style="margin: 30px 0; padding: 20px; border: 1px solid #C9A84C; border-radius: 4px; background: #fffdf8;">
        <p style="font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #C9A84C; margin: 0 0 10px 0;">Root Belief</p>
        <p style="font-size: 17px; font-style: italic; color: #8B2635; margin: 0; line-height: 1.7;">"${aiResult.rootBeliefPersonalized}"</p>
      </div>

      <div style="margin: 30px 0;">
        <h2 style="color: #8B2635; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 15px;">Your Body</h2>
        <p style="font-size: 16px; line-height: 1.9; margin: 0;">${aiResult.bodyReading}</p>
      </div>

      <div style="margin: 30px 0;">
        <h2 style="color: #8B2635; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 15px;">The Pattern</h2>
        <p style="font-size: 16px; line-height: 1.9; margin: 0 0 15px 0;">${aiResult.specificPattern}</p>
      </div>

      <div style="margin: 30px 0; padding: 20px; background: #f5f0eb; border-radius: 4px;">
        <h2 style="color: #8B2635; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 15px 0;">Your Inner Child</h2>
        <p style="font-size: 16px; line-height: 1.9; margin: 0;">${aiResult.innerChildAge}</p>
      </div>

      <div style="margin: 30px 0;">
        <h2 style="color: #8B2635; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 15px;">How This Lives in Your Life Right Now</h2>
        <ul style="padding-left: 20px; margin: 0;">
          ${archetypeData.signs.map(s => `<li style="margin-bottom: 10px; font-size: 15px; line-height: 1.7;">${s}</li>`).join('')}
        </ul>
      </div>

      <div style="margin: 30px 0;">
        <p style="font-size: 16px; line-height: 1.9;">${archetypeData.closingParagraph1}</p>
      </div>

      <div style="margin: 30px 0; padding: 25px; background: #faf8f5; border-left: 3px solid #8B2635;">
        <p style="font-size: 16px; line-height: 1.9; margin: 0;">${archetypeData.closingParagraph2}</p>
      </div>

      <div style="margin: 30px 0;">
        <h2 style="color: #8B2635; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 15px;">What You Actually Need</h2>
        <p style="font-size: 16px; line-height: 1.9; margin: 0;">${archetypeData.closingParagraph3}</p>
      </div>

      <div style="margin: 30px 0; padding: 30px; background: linear-gradient(135deg, #1a0a0d 0%, #2d1018 100%); border-radius: 8px; color: #fff;">
        <h2 style="color: #E8C46A; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 20px 0;">Your First Step — Do This Today</h2>
        ${archetypeData.integrationPractice.split('\n\n').map(p => `<p style="margin: 0 0 15px 0; font-size: 15px; line-height: 1.9; color: #f5f0eb;">${p}</p>`).join('')}
      </div>

      <div style="margin: 30px 0; text-align: center; padding: 30px 0; border-top: 1px solid #e0d5c5; border-bottom: 1px solid #e0d5c5;">
        <p style="font-size: 16px; line-height: 1.9; color: #8B2635; font-style: italic; margin: 0;">You didn't come here by accident. And I'm not telling you anything that you weren't ready to receive.</p>
        <p style="font-size: 15px; line-height: 1.9; margin: 20px 0 0 0; color: #555;">The Wound Map shows you what you're working with. That awareness is real. It matters. What comes next is the work of actually changing — not just understanding the pattern, but living as a different woman.</p>
        <p style="font-size: 15px; color: #555; margin: 15px 0 0 0;">You are ready for <strong style="color: #8B2635;">Good Girl → Wild Woman.</strong></p>
      </div>
    </div>
  `
}
