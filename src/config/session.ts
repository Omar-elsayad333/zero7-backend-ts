import session from 'express-session'

const sessionConfig = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
})

export default sessionConfig
