import type { NextRequest } from 'next/server'
import { auth0 } from '@/lib/auth0'

/** Next.js 16+ — remplace l’ancien `middleware.ts` (voir docs Next « middleware-to-proxy »). */
export async function proxy(request: NextRequest) {
  return await auth0.middleware(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
