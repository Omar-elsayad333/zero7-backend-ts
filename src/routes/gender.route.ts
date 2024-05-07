import express from 'express'

// Models
import { IGenderDocument, validate } from '@/models/gender.models'

// Controllers
import gendersController from '@/controllers/genders.controller'

// Middlewares
import authMiddleware from '@/middlewares/auth.middleware'
import validateMiddleware from '@/middlewares/validate.middleware'

const router = express.Router()

export default router
  .get('/', gendersController.findAll)

  .get('/:id', gendersController.findById)

  .post(
    '/',
    authMiddleware,
    validateMiddleware<IGenderDocument>(validate('create')),
    gendersController.createGender,
  )

  .patch(
    '/:id',
    authMiddleware,
    validateMiddleware<IGenderDocument>(validate('update')),
    gendersController.updateGender,
  )

  .delete('/:id', authMiddleware, gendersController.deleteGender)
