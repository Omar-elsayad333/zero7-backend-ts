export interface IGoogleUser {
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}

export interface IUserTokens {
  accessToken: string
  refreshToken: string
  accessTokenExpireAt: Date
  refreshTokenExpireAt: Date
}
