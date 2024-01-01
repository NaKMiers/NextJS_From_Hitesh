import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema(
   {
      username: {
         type: String,
         required: [true, 'Please provide a username'],
         unique: true,
      },
      email: {
         type: String,
         required: [true, 'Please provide an email'],
         unique: true,
      },
      password: {
         type: String,
         required: [true, 'Please provide a password'],
      },
      isVerified: {
         type: Boolean,
         default: false,
      },
      isAdmin: {
         type: Boolean,
         default: false,
      },
      forgotPasswordToken: String,
      forgotPasswordExpiry: Date,
      verifyToken: String,
      verifyTokenExpiry: Date,
   },
   { timestamps: true }
)

export default models.User || model('User', UserSchema)
