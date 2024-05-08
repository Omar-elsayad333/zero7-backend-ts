// 3rd party libs
import jwt from 'jsonwebtoken'

// Types
import { IUserTokens } from '@/types/user'

const jwtSecret = process.env.JWT_SECRET || ''

// Create access token
const createAccesToken = (tokenPayload: Record<string, any>) => {
  return jwt.sign(tokenPayload, jwtSecret, { expiresIn: '1h' })
}

// Create refresh token
const createRefreshToken = (tokenPayload: Record<string, any>) => {
  return jwt.sign(tokenPayload, jwtSecret, { expiresIn: '15d' })
}

// Check the expiretion of access token
const checkAccessTokenExp = (accessToken: string) => {
  const decodedAccessToken: any = jwt.decode(accessToken)

  if (!decodedAccessToken || !decodedAccessToken.exp) {
    throw Error('Failed to decode access token')
  }

  const accessTokenExpireAt = new Date(decodedAccessToken.exp * 1000)

  if (accessTokenExpireAt < new Date()) {
    throw Error('Access token has expired')
  }
}

// Check the expiretion of refresh token
const checkRefreshTokenExp = (refreshToken: string) => {
  const decodedRefreshToken: any = jwt.decode(refreshToken)

  if (!decodedRefreshToken || !decodedRefreshToken.exp) {
    throw Error('Failed to decode Refresh token')
  }

  const refreshTokenExpireAt = new Date(decodedRefreshToken.exp * 1000)

  if (refreshTokenExpireAt < new Date()) {
    throw Error('Refresh token has expired')
  }
}

// Get token expiration date
const getTokenExpDate = (token: string) => {
  const decodedToken: any = jwt.decode(token)

  if (!decodedToken || !decodedToken.exp) {
    throw Error('Failed to decode token')
  }

  const tokenExpDate = new Date(decodedToken.exp * 1000)

  return tokenExpDate
}

const createUserTokens = (_id: string): IUserTokens => {
  const tokens: Partial<IUserTokens> = {
    accessToken: createAccesToken({ _id }),
    refreshToken: createRefreshToken({ _id }),
  }
  tokens.accessToken && (tokens.accessTokenExpireAt = getTokenExpDate(tokens.accessToken))
  tokens.refreshToken && (tokens.refreshTokenExpireAt = getTokenExpDate(tokens.refreshToken))

  return tokens as IUserTokens
}

export {
  createAccesToken,
  createRefreshToken,
  checkAccessTokenExp,
  checkRefreshTokenExp,
  getTokenExpDate,
  createUserTokens,
}
