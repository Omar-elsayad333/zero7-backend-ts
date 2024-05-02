import cors from 'cors'
import i18n from 'i18n'
import lusca from 'lusca'
import morgan from 'morgan'
import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'
import compression from 'compression'
import errorhandler from 'errorhandler'
import cookieParser from 'cookie-parser'

// Config
import '@/config/i18n'
import corsConfig from '@/config/cors'
import { connectDB } from '@/config/db'
import sessionConfig from '@/config/session'
import passportConfig from '@/config/passport'
import limiterConfig from '@/config/rateLimite'

// Utils
import { isProd } from '@/utils/secrets'

// Middlewares
import responseHandler from '@/middlewares/response.middleware'

// Router
import routes from '@/routes'

// Express app
export const app = express()

// Use common 3rd-party middlewares
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(cors(isProd ? corsConfig : undefined))
app.use(morgan('dev'))

// Apply express session
app.use(sessionConfig)

// Apply rate limiter to all requests
app.use(limiterConfig)

// Apply localization to all API routes
app.use(i18n.init)

// Initialize Passport
app.use(passport.initialize())
app.use(passport.session())

// Applay Passport config
passportConfig()

// App routes
routes()

// Custom API response handler
app.use(responseHandler)

// Connect to DB
connectDB()

// Error Handler. Provides full stack - remove for production
!isProd && app.use(errorhandler())

export default app
