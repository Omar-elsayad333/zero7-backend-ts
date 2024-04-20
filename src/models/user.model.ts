import mongoose, { Document } from 'mongoose'

export interface UserDocument extends Document {
  id: string
  name: string
  firstname: string
  lastname: string
  password: string
  email: string
  isAdmin: boolean
  isBanned: boolean
}

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: [8, 'Minimum of letter is 8'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

export default mongoose.model<UserDocument>('User', userSchema)
