import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      await prisma.session.upsert({
        where: { stripeSessionId: session.id },
        update: {},
        create: {
          stripeSessionId: session.id,
          email: session.customer_email || session.metadata?.email || '',
          answers: {},
          completed: false,
        },
      })
    } catch (error) {
      console.error('DB error creating session:', error)
    }
  }

  return NextResponse.json({ received: true })
}
