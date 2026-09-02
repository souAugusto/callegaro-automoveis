import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ADMIN_SESSION_COOKIE } from '@/lib/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
    if (session !== 'ok') {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
