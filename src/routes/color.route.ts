import express from 'express'

// Models
import { IColorDocument, validate } from '@/models/color.models'

// Controllers
import colorsController from '@/controllers/colors.controller'

// Middlewares
import authMiddleware from '@/middlewares/auth.middleware'
import validateMiddleware from '@/middlewares/validate.middleware'

const router = express.Router()

export default router
  .get('/', colorsController.findAll)

  .get('/:id', colorsController.findById)

  .post(
    '/',
    authMiddleware,
    validateMiddleware<IColorDocument>(validate('create')),
    colorsController.createColor,
  )

  .patch(
    '/:id',
    authMiddleware,
    validateMiddleware<IColorDocument>(validate('update')),
    colorsController.updateColor,
  )

  .delete('/:id', authMiddleware, colorsController.deleteColor)
