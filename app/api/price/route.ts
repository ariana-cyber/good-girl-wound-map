import { NextResponse } from 'next/server'
import { getCountdownInfo } from '@/lib/stripe'

export async function GET() {
  const info = getCountdownInfo()
  return NextResponse.json(info)
}
