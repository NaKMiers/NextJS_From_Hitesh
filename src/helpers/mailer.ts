import nodemailer from 'nodemailer'
import User from '@/models/UserModel'
import bcryptjs from 'bcryptjs'

export const sendMail = async ({ email, emailType, userId }: any) => {
   try {
      // create a hashed token
      const hashedToken = await bcryptjs.hash(userId.toString(), 10)

      if (emailType === 'VERIFY') {
         await User.findByIdAndUpdate(
            userId,
            {
               verifyToken: hashedToken,
               verifyTokenExpiry: Date.now() + 3600000,
            },
            { new: true, runValidators: true }
         )
      } else if (emailType === 'RESET') {
         await User.findByIdAndUpdate(
            userId,
            {
               forgotPasswordToken: hashedToken,
               forgotPasswordExpiry: Date.now() + 3600000,
            },
            { new: true, runValidators: true }
         )
      }

      // create transport
      const transporter = nodemailer.createTransport({
         host: 'sandbox.smtp.mailtrap.io',
         port: 2525,
         auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
         },
      })

      const mailOption = {
         from: 'diwas118151@gmail.com',
         to: email,
         subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
         html: `<p>Click <a href="${
            process.env.DOMAIN
         }/verifyemail?/token=${hashedToken}">here</a> to ${
            emailType === 'VERIFY' ? 'verify your mail' : 'reset your password'
         } </p>`,
      }

      const mailResponse = await transporter.sendMail(mailOption)

      return mailResponse
   } catch (err: any) {
      throw Error(err.message)
   }
}
