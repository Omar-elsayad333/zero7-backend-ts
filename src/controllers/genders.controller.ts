import { Request, Response, NextFunction } from 'express'

// Services
import GendersServices from '@/services/genders.service'
import { BadRequestError, CreateResponse, SuccessResponse } from '@/services/response.service'

// GET /genders
export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const genders = await GendersServices.findAllService()
    next(new SuccessResponse('', genders))
  } catch (error: any) {
    next(new BadRequestError('', error))
  }
}

// GET /genders/:id
export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const gender = await GendersServices.findByIdService(id)
    next(new SuccessResponse('', gender))
  } catch (error: any) {
    next(new BadRequestError('', error))
  }
}

// POST /genders
export const createGender = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req
    const gender = await GendersServices.createGender(body)
    next(new CreateResponse('', gender))
  } catch (error: any) {
    next(new BadRequestError(error.message, error))
  }
}

// PATCH /genders/:id
export const updateGender = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req
    const { id } = req.params
    const gender = await GendersServices.updateGender(id, body)
    next(new SuccessResponse('', gender))
  } catch (error: any) {
    next(new BadRequestError(error.message, error))
  }
}

// DELETE /genders/:id
export const deleteGender = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const gender = await GendersServices.deleteGender(id)
    next(new SuccessResponse('', gender))
  } catch (error: any) {
    next(new BadRequestError('', error))
  }
}

export default {
  findAll,
  findById,
  createGender,
  updateGender,
  deleteGender,
}
