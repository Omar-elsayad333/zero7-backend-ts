// App
import { app } from '@/app'

// Routes
import testRouter from '@/routes/test.route'
import authRoutes from '@/routes/auth.route'
import userRoutes from '@/routes/user.route'

const apiSuffix = `/api/${process.env.BASE_API_VERSION}`

const routes = () => {
  // Test router
  app.use(`${apiSuffix}/test`, testRouter)

  // Auth router
  app.use(`${apiSuffix}/auth`, authRoutes)

  // User router
  app.use(`${apiSuffix}/user`, userRoutes)
}

export default routes
