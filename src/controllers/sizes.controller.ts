import { Request, Response, NextFunction } from 'express'

// Services
import SizesServices from '@/services/size.service'
import { BadRequestError, CreateResponse, SuccessResponse } from '@/services/response.service'

// GET /sizes
export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sizes = await SizesServices.findAllService()
    next(new SuccessResponse('', sizes))
  } catch (error: any) {
    next(new BadRequestError('', error))
  }
}

// GET /sizes/:id
export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const size = await SizesServices.findByIdService(id)
    next(new SuccessResponse('', size))
  } catch (error: any) {
    next(new BadRequestError('', error))
  }
}

// POST /sizes
export const createSize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req
    const size = await SizesServices.createSize(body)
    next(new CreateResponse('', size))
  } catch (error: any) {
    next(new BadRequestError(error.message, error))
  }
}

// PATCH /sizes/:id
export const updateSize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req
    const { id } = req.params
    const size = await SizesServices.updateSize(id, body)
    next(new SuccessResponse('', size))
  } catch (error: any) {
    next(new BadRequestError(error.message, error))
  }
}

// DELETE /sizes/:id
export const deleteSize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const size = await SizesServices.deleteSize(id)
    next(new SuccessResponse('', size))
  } catch (error: any) {
    next(new BadRequestError('', error))
  }
}

export default {
  findAll,
  findById,
  createSize,
  updateSize,
  deleteSize,
}
