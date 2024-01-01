import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// this function can be marked 'async' if using 'await' inside
export function middleware(req: NextRequest) {
   const path = req.nextUrl.pathname

   const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

   const token = req.cookies.get('token')?.value || ''

   if (isPublicPath && token) {
      return NextResponse.redirect(new URL('/ ', req.nextUrl))
   }

   if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
   }
}

// see 'matching paths' below to learn more
export const config = {
   matcher: ['/', '/profile', '/login', '/singup', '/verifyemail'],
}
