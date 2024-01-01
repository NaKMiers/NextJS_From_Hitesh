import { NextResponse } from 'next/server'

export async function GET() {
   console.log('logout')
   try {
      const res = NextResponse.json({ message: 'Logged out successfully', success: true })

      res.cookies.set('token', '', { httpOnly: true, expires: new Date(0) })

      return res
   } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 })
   }
}
