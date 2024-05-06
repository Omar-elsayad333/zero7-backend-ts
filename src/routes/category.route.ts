import express from 'express'

// Models
import { ICategoryDocument, validateSchema } from '@/models/category.model'

// Controllers
import categoriesController from '@/controllers/categories.controller'

// Middlewares
import authMiddleware from '@/middlewares/auth.middleware'
import validateMiddleware from '@/middlewares/validate.middleware'

const router = express.Router()

export default router
  .get('/', categoriesController.findAll)

  .get('/:id', categoriesController.findById)

  .post(
    '/',
    authMiddleware,
    validateMiddleware<ICategoryDocument>(validateSchema('create')),
    categoriesController.createCategory,
  )

  .patch(
    '/:id',
    authMiddleware,
    validateMiddleware<ICategoryDocument>(validateSchema('update')),
    categoriesController.updateCategory,
  )

  .delete('/:id', authMiddleware, categoriesController.deleteCategory)

router
