import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const DEFAULT_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://www.hdcorporate.com',
  'https://hdcorporate.com',
]

function allowedOrigins(): string[] {
  const raw = process.env.API_ALLOWED_ORIGINS
  if (!raw?.trim()) return DEFAULT_ORIGINS
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

export function pickOrigin(request: NextRequest): string | null {
  const origin = request.headers.get('origin')
  const list = allowedOrigins()
  if (!origin) return list[0] ?? null
  return list.includes(origin) ? origin : null
}

export function corsHeaders(request: NextRequest): HeadersInit {
  const o = pickOrigin(request)
  if (!o) return {}
  return {
    'Access-Control-Allow-Origin': o,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

export function json(request: NextRequest, data: unknown, init?: ResponseInit): NextResponse {
  const res = NextResponse.json(data, init)
  const c = corsHeaders(request)
  Object.entries(c).forEach(([k, v]) => res.headers.set(k, v))
  return res
}

export function options(request: NextRequest): NextResponse {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) })
}
