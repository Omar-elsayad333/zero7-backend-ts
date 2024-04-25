import cors from 'cors'
import i18n from 'i18n'
import lusca from 'lusca'
import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import errorhandler from 'errorhandler'
import cookieParser from 'cookie-parser'

// Utils
import { isProd } from '@/utils/secrets'

// Middlewares
import apiErrorHandler from '@/middlewares/apiErrorHandler'

// Config
import i18nConfig from '@/i18n'
import { connectDB } from '@/config/db'
import sessionConfig from '@/config/session'
import limiterConfig from '@/config/rateLimite'

// Router
import router from '@/routes'

// Express app
const app = express()

// Use common 3rd-party middlewares
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(cors())
app.use(morgan('dev'))

// Apply express session
app.use(sessionConfig)

// Apply rate limiter to all requests
app.use(limiterConfig)

// Apply localization to all API routes
i18n.configure(i18nConfig)
app.use(i18n.init)

router(app)

// Custom API error handler
app.use(apiErrorHandler)

connectDB()

// Error Handler. Provides full stack - remove for production
!isProd && app.use(errorhandler())

export default app
