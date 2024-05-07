import express from 'express'

// Models
import { ISizeDocument, validate } from '@/models/size.models'

// Controllers
import sizesController from '@/controllers/sizes.controller'

// Middlewares
import authMiddleware from '@/middlewares/auth.middleware'
import validateMiddleware from '@/middlewares/validate.middleware'

const router = express.Router()

export default router
  .get('/', sizesController.findAll)

  .get('/:id', sizesController.findById)

  .post(
    '/',
    authMiddleware,
    validateMiddleware<ISizeDocument>(validate('create')),
    sizesController.createSize,
  )

  .patch(
    '/:id',
    authMiddleware,
    validateMiddleware<ISizeDocument>(validate('update')),
    sizesController.updateSize,
  )

  .delete('/:id', authMiddleware, sizesController.deleteSize)
