import passport from 'passport'
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20'

const clientID = process.env.GOOGLE_CLIENT_ID || ''
const callbackURL = process.env.GOOGLE_CALLBACK_URL || ''
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || ''

const passportConfig = () =>
  passport.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL,
      },
      (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        // Code to handle user authentication and retrieval
        return done(null, profile)
      },
    ),
  )

// // Serialize and deserialize  user
passport.serializeUser<any, any>((user, done: any) => {
  done(null, user)
})

passport.deserializeUser<any, any>((obj, done) => {
  done(null, obj)
})

export default passportConfig
