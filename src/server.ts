require('dotenv').config()
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import { connectDB } from './config/db'
import { rateLimit } from 'express-rate-limit'

// Import app routes
// const userRoutes = require("./src/routes/user");
// const roleRoutes = require("./src/routes/roles");
// const sizeRoutes = require("./src/routes/sizes");
// const colorRoutes = require("./src/routes/colors");
// const genderRoutes = require("./src/routes/genders");
// const seasonRoutes = require("./src/routes/seasons");
// const productsRoutes = require("./src/routes/products");
// const categoryRoutes = require("./src/routes/categorys");
// const dashboardRoutes = require("./src/routes/dashboard");

// Express app
const app = express()

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
})

// apply rate limiter to all requests
app.use(limiter)

// User routes
// app.use(`${process.env.BASE_API_V}/roles`, roleRoutes);
// app.use(`${process.env.BASE_API_V}/user`, userRoutes);

// Dashboard routes
// app.use(`${process.env.BASE_API_V}/dashboard`, dashboardRoutes);

// Website routes
// app.use(`${process.env.BASE_API_V}/products/sizes`, sizeRoutes);
// app.use(`${process.env.BASE_API_V}/products/colors`, colorRoutes);
// app.use(`${process.env.BASE_API_V}/products/seasons`, seasonRoutes);
// app.use(`${process.env.BASE_API_V}/products/genders`, genderRoutes);
// app.use(`${process.env.BASE_API_V}/products/categorys`, categoryRoutes);
// app.use(`${process.env.BASE_API_V}/products`, productsRoutes);

// Connect to data base
connectDB(app)

module.exports = app
