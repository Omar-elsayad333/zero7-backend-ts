import express from 'express'

// Config
import { memoryUpload } from '@/config/multer'

// Models
import { IProductDocument, validate } from '@/models/product.model'

// Controllers
import productsController from '@/controllers/products.controller'

// Middlewares
import authMiddleware from '@/middlewares/auth.middleware'
import validateMiddleware from '@/middlewares/validate.middleware'

const router = express.Router()

export default router
  .get('/', productsController.findAll)

  .get('/:id', productsController.findById)

  .post(
    '/',
    authMiddleware,
    // validateMiddleware<IProductDocument>(validate('create')),
    memoryUpload.array('colors.images.url', 3),
    productsController.createProduct,
  )

  .patch(
    '/:id',
    authMiddleware,
    validateMiddleware<IProductDocument>(validate('update')),
    productsController.updateProduct,
  )

  .delete('/:id', authMiddleware, productsController.deleteProduct)
