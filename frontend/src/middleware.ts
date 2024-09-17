import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Utility function to check if the request has the NextAuth session token
function hasSessionToken(req: NextRequest) {
  const cookie = req.cookies.get('next-auth.session-token')
  return cookie !== undefined
}

export function middleware(req: NextRequest) {
  // Allow access to login and API routes
  if (req.nextUrl.pathname.startsWith('/api/auth') || req.nextUrl.pathname === '/') {
    return NextResponse.next()
  }

  // Protect the /dashboard route
  if (req.nextUrl.pathname === '/dashboard' && !hasSessionToken(req)) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/api/:path*', '/']
}
