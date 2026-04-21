import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { stripeSessionId, answers } = await req.json()

    if (!stripeSessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    await prisma.session.update({
      where: { stripeSessionId },
      data: { answers },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Save answers error:', error)
    return NextResponse.json({ error: 'Failed to save answers' }, { status: 500 })
  }
}
