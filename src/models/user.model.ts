import mongoose, { Document } from 'mongoose'

export interface UserDocument extends Document {
  id: string
  name: string
  firstName: string
  lastName: string
  password: string
  email: string
  isAdmin: boolean
  isBanned: boolean
  tokens: {
    accessToken: string
    refreshToken: string
    accessTokenExpireAt: Date
    refreshTokenExpireAt: Date
  }
  createdAt: string
  updatedAt: string
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
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
    tokens: {
      accessToken: { type: String },
      refreshToken: { type: String },
      accessTokenExpireAt: { type: Date },
      refreshTokenExpireAt: { type: Date },
    },
  },
  { timestamps: true },
)

export default mongoose.model<UserDocument>('User', userSchema)
