- email confirmation

- folder structure

- login with google

- stripe integration

- login with facebook

// // OAuth2 configuration for Google
// passport.use(
// new GoogleStrategy(
// {
// clientID: 'your-client-id',
// clientSecret: 'your-client-secret',
// callbackURL: 'http://localhost:3000/auth/google/callback', // Change the callback URL as per your setup
// },
// (accessToken, refreshToken, profile, done) => {
// // This function is called after successful authentication
// // You can save user data to session or database here
// // For now, let's just return the user profile
// return done(null, profile)
// },
// ),
// )

// // Serialize and deserialize user
// passport.serializeUser<any, any>((user, done) => {
// // done(null, 'omar')
// })

// passport.deserializeUser<any, any>((obj, done) => {
// done(null, obj)
// })
