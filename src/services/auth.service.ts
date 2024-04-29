import { compare } from 'bcrypt'

// Config
import userModel, { UserDocument } from '@/models/user.model'

// Utils
import { hashPassword } from '@/utils/hash'
import { createAccesToken, createRefreshToken, getTokenExpDate } from '@/utils/tokens'
import { IGoogleUser } from '@/types/user'

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

export const socialService = async (body: IGoogleUser) => {
  const { name, given_name, family_name, email, picture, locale } = body

  if (!email) throw new Error('No such email')

  const user = await userModel.findOne({ email })
  if (user) {
    // login user
    console.log('user id', user._id)

    const tokens: Record<string, string | Date> = {
      accessToken: createAccesToken({ _id: user._id }),
      refreshToken: createRefreshToken({ _id: user._id }),
    }
    tokens.accessTokenExpireAt = getTokenExpDate(tokens.accessToken as string)
    tokens.refreshTokenExpireAt = getTokenExpDate(tokens.refreshToken as string)

    user.tokens = tokens as any

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

    console.log('login')

    return responseData
  }

  const userData = {
    name: name,
    firstName: given_name,
    lastName: family_name,
    email,
    media: [{ name: 'avatar', path: picture }],
    isAdmin: true,
  }

  // create new user
  await userModel.create({ ...userData })

  console.log('signup')
  return 'sign up successfully'
}
