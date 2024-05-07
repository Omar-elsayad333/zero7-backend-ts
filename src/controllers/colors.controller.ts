import { Request, Response, NextFunction } from 'express'

// Services
import ColorsServices from '@/services/colors.service'
import {
  BadRequestError,
  CreateResponse,
  NotFoundError,
  SuccessResponse,
} from '@/services/response.service'

// GET /colors
export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const colors = await ColorsServices.findAllService()
    next(new SuccessResponse('', colors))
  } catch (error: any) {
    next(new BadRequestError('', error))
  }
}

// GET /colors/:id
export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const color = await ColorsServices.findByIdService(id)
    next(new SuccessResponse('', color))
    throw new Error()
  } catch (error: any) {
    next(new BadRequestError('', error))
  }
}

// POST /colors
export const createColor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req
    const color = await ColorsServices.createColor(body)
    next(new CreateResponse('', color))
  } catch (error: any) {
    next(new BadRequestError(error.message, error))
  }
}

// PATCH /colors/:id
export const updateColor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req
    const { id } = req.params
    const color = await ColorsServices.updateColor(id, body)
    next(new SuccessResponse('', color))
  } catch (error: any) {
    next(new BadRequestError(error.message, error))
  }
}

// DELETE /colors/:id
export const deleteColor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const color = await ColorsServices.deleteColor(id)
    next(new SuccessResponse('', color))
  } catch (error: any) {
    next(new BadRequestError('', error))
  }
}

export default {
  findAll,
  findById,
  createColor,
  updateColor,
  deleteColor,
}
