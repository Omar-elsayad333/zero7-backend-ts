import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'

passport.use(
  new GoogleStrategy(
    {
      clientID: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      callbackURL: '/auth/google/callback',
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      // Code to handle user authentication and retrieval
      console.log(accessToken, refreshToken, profile, done)
    },
  ),
)

passport.serializeUser((user: any, done: any) => {
  // Code to serialize user data
  console.log(user, done)
})

passport.deserializeUser((id: any, done: any) => {
  // Code to deserialize user data
  console.log(id, done)
})

export default passport
