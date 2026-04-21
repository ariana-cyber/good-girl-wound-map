import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

export function getCurrentPrice(): number {
  const countdownStartStr = process.env.COUNTDOWN_START_TIME
  const introPrice = Number(process.env.INTRO_PRICE_CENTS || 1700)
  const regularPrice = Number(process.env.REGULAR_PRICE_CENTS || 3300)
  const countdownDurationMs = Number(process.env.COUNTDOWN_DURATION_MS || 4 * 24 * 60 * 60 * 1000)

  if (!countdownStartStr) {
    return introPrice
  }

  const startTime = parseInt(countdownStartStr, 10)
  const now = Date.now()
  const elapsed = now - startTime

  if (elapsed < countdownDurationMs) {
    return introPrice
  }

  return regularPrice
}

export function getCountdownInfo(): {
  active: boolean
  started: boolean
  endsAt: number | null
  priceInCents: number
} {
  const countdownStartStr = process.env.COUNTDOWN_START_TIME
  const introPrice = Number(process.env.INTRO_PRICE_CENTS || 1700)
  const regularPrice = Number(process.env.REGULAR_PRICE_CENTS || 3300)
  const countdownDurationMs = Number(process.env.COUNTDOWN_DURATION_MS || 4 * 24 * 60 * 60 * 1000)

  if (!countdownStartStr) {
    return { active: false, started: false, endsAt: null, priceInCents: introPrice }
  }

  const startTime = parseInt(countdownStartStr, 10)
  const endsAt = startTime + countdownDurationMs
  const now = Date.now()
  const active = now < endsAt

  return {
    active,
    started: true,
    endsAt,
    priceInCents: active ? introPrice : regularPrice
  }
}
