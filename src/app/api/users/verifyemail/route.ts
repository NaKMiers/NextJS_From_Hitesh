import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/UserModel'

connect()

export async function POST(req: NextRequest) {
   try {
      const reqBody = await req.json()
      const { token } = reqBody
      console.log('token', token)

      const user = await User.findOne({
         verifyToken: token,
         verifyTokenExpiry: { $gt: Date.now() },
      })

      if (!user) {
         return NextResponse.json({ error: 'Invalid token or token expired' }, { status: 400 })
      }
      console.log('user: ', user)

      user.isVerified = true
      user.verifyToken = undefined
      user.verifyTokenExpiry = undefined

      await user.save()

      return NextResponse.json({ message: 'Email verified successfully', success: true })
   } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 })
   }
}
