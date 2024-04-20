// Express session
import session from 'express-session'

// Mongo session
import MongoStore from 'connect-mongo'

// Utils
import { MONGODB_URI } from '@/utils/secrets'

const mongoUrl = MONGODB_URI
const sessionSecret = process.env.SESSION_SECRET || ''
const sessionOptions = {
  mongoUrl: mongoUrl,
  ttl: 60 * 60,
}

const sessionConfig = session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    // Enable only for HTTPS
    httpOnly: true,
    // Prevent client-side access to cookies
    sameSite: 'strict',
    // Mitigate CSRF attacks
  },
  store: MongoStore.create(sessionOptions),
})

export default sessionConfig
