import { compare } from 'bcrypt'

// 3rd party libs
import jwt, { JwtPayload } from 'jsonwebtoken'

// Models
import userModel, { UserDocument } from '../models/user.model'

// Types
import { IGoogleUser } from '../types/user'

// Config
import sendMail from '../config/nodemailer'

// Utils
import { hashPassword } from '../utils/hash'
import { FRONT_URL, JWT_SECRET } from '../utils/secrets'
import { createAccesToken, createUserTokens } from '../utils/tokens'

const loginService = async (body: { email: string; password: string }) => {
  const { email, password } = body

  const user: UserDocument | null = await userModel.findOne({
    $or: [{ email }, { phoneNumber: email }],
  })

  if (!user) {
    throw new Error('response_messages.incorrect_email_or_password')
  }

  const passwordMatch = await compare(password, user.password)
  if (!passwordMatch) {
    throw new Error('response_messages.incorrect_email_or_password')
  }

  if (!user.isVerified) {
    const emailToken = createAccesToken({ _id: user._id })
    sendMail({
      name: user.name,
      to: `${user.email}`,
      subject: 'Email Verification',
      link: `${FRONT_URL}/verfiy-email/${user.email}/${emailToken}`,
    })
    throw new Error('response_messages.email_not_verified')
  }

  // Create new tokens for user
  user.tokens = createUserTokens(user._id)

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

const signupService = async (body: UserDocument) => {
  const { firstName, lastName, email, password } = body

  if (email) {
    const emailExists = await userModel.findOne({ email })
    if (emailExists) {
      throw new Error('response_messages.email_already_in_use')
    }
  }

  const hash = await hashPassword(password)
  const userData = {
    firstName,
    lastName,
    email,
    isAdmin: true,
    password: hash,
    name: `${firstName} ${lastName}`,
  }

  const user = await userModel.create({ ...userData })

  const emailToken = createAccesToken({ _id: user._id })
  sendMail({
    to: `${email}`,
    name: userData.name,
    subject: 'Email Verification',
    link: `${FRONT_URL}/verfiy-email/${email}/${emailToken}`,
  })
}

const socialService = async (body: IGoogleUser): Promise<string> => {
  const { name, given_name, family_name, email, picture, locale } = body

  if (!email) throw new Error('response_messages.faild_to_authorize_user')

  const user = await userModel.findOne({ email })
  if (user) {
    // login user

    const userTokens = createUserTokens(user._id)
    user.tokens = userTokens

    await user.save()

    return userTokens.accessToken
  }

  // create new user
  const userData = {
    name: name,
    firstName: given_name,
    lastName: family_name,
    email,
    media: [{ name: 'avatar', path: picture }],
    isAdmin: true,
  }

  const createdUser = await userModel.create({ ...userData })
  const userTokens = createUserTokens(createdUser._id)

  await createdUser.save()

  return userTokens.accessToken
}

const verfiyService = async (email: string, token: string) => {
  if (!email || !token) throw new Error('response_messages.faild_to_verfiy_user_email')

  const user = await userModel.findOne({ email })

  if (!user) throw new Error('response_messages.faild_to_verfiy_user_email')

  const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload

  if (decodedToken._id !== user._id) throw new Error('response_messages.faild_to_verfiy_user_email')

  await userModel.findOneAndUpdate({ email }, { isVerified: true })

  return 'response_messages.verify_email_successfully'
}

export default {
  loginService,
  signupService,
  socialService,
  verfiyService,
}
