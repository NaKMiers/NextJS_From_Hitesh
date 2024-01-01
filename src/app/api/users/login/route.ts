import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
   try {
      const reqBody = await request.json()
      const { email, password } = reqBody
      console.log('reqBody: ', reqBody)

      // check if user already exsists
      const user = await User.findOne({ email })

      // check if user exists
      if (!user) {
         return NextResponse.json({ error: 'User does not exist' }, { status: 400 })
      }

      // check if password is correct
      const validPassword = await bcryptjs.compare(password, user.password)
      if (!validPassword) {
         return NextResponse.json({ error: 'Invalid password' }, { status: 400 })
      }

      // create and assign a token
      const tokenData = {
         id: user._id,
         username: user.username,
         email: user.email,
      }
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1h' })

      const response = NextResponse.json({
         message: 'Logged in successfully',
         success: true,
      })
      response.cookies.set('token', token, { httpOnly: true })

      return response
   } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 })
   }
}
