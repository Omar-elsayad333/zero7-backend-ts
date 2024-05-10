import joi from 'joi'
import mongoose, { Document, Schema } from 'mongoose'

// Utils
import { customValidate } from '../utils/validate'

export interface IMedia {
  path: string
  name: string
}

export interface UserDocument extends Document {
  id: string
  name: string
  firstName: string
  lastName: string
  password: string
  email: string
  tokens: {
    accessToken: string
    refreshToken: string
    accessTokenExpireAt: Date
    refreshTokenExpireAt: Date
  }
  isAdmin: boolean
  isBanned: boolean
  isVerified: boolean
  media: IMedia[]
  createdAt: string
  updatedAt: string
}

const userSchema = new Schema(
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
    media: {
      type: Array,
    },
    isVerified: {
      type: Boolean,
      default: false,
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

/**
 *  Validation schema
 */
const validationSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(20).required(),
})

const loginSchema = validationSchema.fork(['lastName', 'firstName'], (Schema) => Schema.optional())

export function validateSchema(type: 'login' | 'signup') {
  return function (user: UserDocument) {
    if (type === 'signup') return customValidate(validationSchema, user)
    return customValidate(loginSchema, user)
  }
}
