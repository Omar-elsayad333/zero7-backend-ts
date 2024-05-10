// App
import { app } from '../app'

// Routes
import testRouter from './test.route'
import authRoutes from './auth.route'
import userRoutes from './user.route'
import notificationsRoutes from './notifications.route'
import categoriesRoutes from './category.route'
import colorsRoutes from './color.route'
import sizesRoutes from './size.route'
import gendersRoutes from './gender.route'
import productsRoutes from './product.route'

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
