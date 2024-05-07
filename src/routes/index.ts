// App
import { app } from '@/app'

// Routes
import testRouter from '@/routes/test.route'
import authRoutes from '@/routes/auth.route'
import userRoutes from '@/routes/user.route'
import notificationsRoutes from '@/routes/notifications.route'
import categoriesRoutes from '@/routes/category.route'
import colorsRoutes from '@/routes/color.route'
import sizesRoutes from '@/routes/size.route'
import gendersRoutes from '@/routes/gender.route'
import productsRoutes from '@/routes/product.route'

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

  // Colors router
  app.use(`${apiSuffix}/colors`, colorsRoutes)

  // Sizes router
  app.use(`${apiSuffix}/sizes`, sizesRoutes)

  // Genders router
  app.use(`${apiSuffix}/genders`, gendersRoutes)

  // Products router
  app.use(`${apiSuffix}/products`, productsRoutes)
}

export default routes
