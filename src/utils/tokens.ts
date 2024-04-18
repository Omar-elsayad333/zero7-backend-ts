const jwt = require('jsonwebtoken')

// Create access token
const createAccesToken = async (_id: string) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '5h' })
}

// Create refresh token
const createRefreshToken = async (_id: string) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '15d' })
}

// Check the expiretion of access token
const checkAccessTokenExp = async (accessToken: string) => {
  const decodedAccessToken = jwt.decode(accessToken)

  if (!decodedAccessToken || !decodedAccessToken.exp) {
    throw Error('Failed to decode access token')
  }

  const accessTokenExpireAt = new Date(decodedAccessToken.exp * 1000)

  if (accessTokenExpireAt < new Date()) {
    throw Error('Access token has expired')
  }
}

// Check the expiretion of refresh token
const checkRefreshTokenExp = async (refreshToken: string) => {
  const decodedRefreshToken = jwt.decode(refreshToken)

  if (!decodedRefreshToken || !decodedRefreshToken.exp) {
    throw Error('Failed to decode Refresh token')
  }

  const refreshTokenExpireAt = new Date(decodedRefreshToken.exp * 1000)

  if (refreshTokenExpireAt < new Date()) {
    throw Error('Refresh token has expired')
  }
}

// Get token expiration date
const getTokenExpDate = async (token: string) => {
  const decodedToken = jwt.decode(token)

  if (!decodedToken || !decodedToken.exp) {
    throw Error('Failed to decode token')
  }

  const tokenExpDate = new Date(decodedToken.exp * 1000)

  return tokenExpDate
}

module.exports = {
  createAccesToken,
  createRefreshToken,
  checkAccessTokenExp,
  checkRefreshTokenExp,
  getTokenExpDate,
}
