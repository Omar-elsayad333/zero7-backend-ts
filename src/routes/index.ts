// App
import { app } from '@/app'

// Routes
import testRouter from '@/routes/test.route'
import authRoutes from '@/routes/auth.route'
import userRoutes from '@/routes/user.route'
import notificationsRoutes from '@/routes/notifications.route'
import categoriesRoutes from '@/routes/category.route'

const apiSuffix = `/api/${process.env.BASE_API_VERSION}`

const routes = () => {
  // Test router
  app.use(`${apiSuffix}/test`, testRouter)

  // Auth router
  app.use(`${apiSuffix}/auth`, authRoutes)

  // User router
  app.use(`${apiSuffix}/user`, userRoutes)

  // Notifications router
  app.use(`${apiSuffix}/notifications`, notificationsRoutes)

  // Categories router
  app.use(`${apiSuffix}/categories`, categoriesRoutes)
}

export default routes
