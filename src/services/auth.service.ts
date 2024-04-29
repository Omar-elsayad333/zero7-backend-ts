import { compare } from 'bcrypt'

// Config
import userModel, { UserDocument } from '@/models/user.model'

// Utils
import { hashPassword } from '@/utils/hash'
import { createAccesToken, createRefreshToken, getTokenExpDate } from '@/utils/tokens'

export const loginService = async (body: { email: string; password: string }) => {
  const { email, password } = body

  const user = await userModel.findOne({
    $or: [{ email }, { phoneNumber: email }],
  })

  if (!user) {
    throw new Error('Incorrect email or password')
  }

  const passwordMatch = await compare(password, user.password)
  if (!passwordMatch) {
    throw new Error('Incorrect email or password')
  }

  // Create new tokens for user
  user.tokens = {
    accessToken: createAccesToken({ _id: user._id }) as string,
    refreshToken: createRefreshToken({ _id: user._id }) as string,
    accessTokenExpireAt: getTokenExpDate(user.tokens.accessToken),
    refreshTokenExpireAt: getTokenExpDate(user.tokens.refreshToken),
  }

  // Save the new tokens to the user
  await user.save()

  const responseData = {
    firstName: user.firstName,
    lastName: user.lastName,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    isBanned: user.isBanned,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    tokens: user.tokens,
  }

  return responseData
}

export const signupService = async (body: UserDocument) => {
  const { firstName, lastName, email, password } = body

  if (email) {
    const emailExists = await userModel.findOne({ email })
    if (emailExists) {
      throw new Error('Email already in use')
    }
  }

  const hash = await hashPassword(password, 10)
  const userData = {
    firstName,
    lastName,
    email,
    isAdmin: true,
    password: hash,
    name: `${firstName} ${lastName}`,
  }

  await userModel.create({ ...userData })

  return 'sign up successfully'
}

export const socialService = async (body: UserDocument) => {
  const { firstName, lastName, email, password } = body

  if (email) {
    const emailExists = await userModel.findOne({ email })
    if (emailExists) {
      throw new Error('Email already in use')
    }
  }

  const hash = await hashPassword(password, 10)
  const userData = {
    firstName,
    lastName,
    email,
    isAdmin: true,
    password: hash,
    name: `${firstName} ${lastName}`,
  }

  await userModel.create({ ...userData })

  return 'sign up successfully'
}

// _json: {
//   sub: '109974485051537660429',
//   name: 'Omar Elsayad',
//   given_name: 'Omar',
//   family_name: 'Elsayad',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocJ_O80DpS4MrRqyKJi8Chy7ro1EP0sqjLGEquZKQ7CTrocu3nM=s96-c',
//   email: 'omarelsayad313@gmail.com',
//   email_verified: true,
//   locale: 'en-GB'
// }
