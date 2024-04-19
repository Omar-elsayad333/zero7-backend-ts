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

// Routes
import testRouter from '@/routes/test.route'
// import userRoutes from "@/routes/user";
// import roleRoutes from "@/routes/roles";
// import sizeRoutes from "@/routes/sizes";
// import colorRoutes from "@/routes/colors";
// import genderRoutes from "@/routes/genders";
// import seasonRoutes from "@/routes/seasons";
// import productsRoutes from "@/routes/products";
// import categoryRoutes from "@/routes/categorys";
// import dashboardRoutes from "@/routes/dashboard";

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

// Test router
app.use(`/api/${process.env.BASE_API_VERSION}/test`, testRouter)

// User router
// app.use(`${process.env.BASE_API_V}/roles`, roleRoutes);
// app.use(`${process.env.BASE_API_V}/user`, userRoutes);

// Dashboard router
// app.use(`${process.env.BASE_API_V}/dashboard`, dashboardRoutes);

// Website router
// app.use(`${process.env.BASE_API_V}/products/sizes`, sizeRoutes);
// app.use(`${process.env.BASE_API_V}/products/colors`, colorRoutes);
// app.use(`${process.env.BASE_API_V}/products/seasons`, seasonRoutes);
// app.use(`${process.env.BASE_API_V}/products/genders`, genderRoutes);
// app.use(`${process.env.BASE_API_V}/products/categorys`, categoryRoutes);
// app.use(`${process.env.BASE_API_V}/products`, productsRoutes);

// Custom API error handler
app.use(apiErrorHandler)

connectDB()

// Error Handler. Provides full stack - remove for production
!isProd && app.use(errorhandler())

export default app
