import cors from 'cors'
import lusca from 'lusca'
import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import errorhandler from 'errorhandler'

// Utils
import { isProd } from '@/utils/secrets'

// Middlewares
import apiErrorHandler from '@/middlewares/apiErrorHandler'

// Config
import { connectDB } from '@/config/db'
import sessionConfig from '@/config/session'
import limiterConfig from '@/config/rateLimite'

// Router
import router from '@/routes'

// Express app
const app = express()

// Use common 3rd-party middlewares
app.use(compression())
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

router(app)

// Custom API error handler
app.use(apiErrorHandler)

connectDB()

// Error Handler. Provides full stack - remove for production
!isProd && app.use(errorhandler())

export default app
