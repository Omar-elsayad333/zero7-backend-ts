import { Request, Response, NextFunction } from 'express'

// Services
import CategoriesServices from '../services/categories.service'
import { BadRequestError, CreateResponse, SuccessResponse } from '../services/response.service'

// GET /categories
export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await CategoriesServices.findAllService()
    next(new SuccessResponse('', categories))
  } catch (error: any) {
    next(new BadRequestError('', error))
  }
}

// GET /categories/:id
export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const category = await CategoriesServices.findByIdService(id)
    next(new SuccessResponse('', category))
  } catch (error: any) {
    next(new BadRequestError('', error))
  }
}

// POST /categories
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req
    const category = await CategoriesServices.createCategory(body)
    next(new CreateResponse('', category))
  } catch (error: any) {
    next(new BadRequestError(error.message, error))
  }
}

// PATCH /categories/:id
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req
    const { id } = req.params
    const category = await CategoriesServices.updateCategory(id, body)
    next(new SuccessResponse('', category))
  } catch (error: any) {
    next(new BadRequestError(error.message, error))
  }
}

// DELETE /categories/:id
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const category = await CategoriesServices.deleteCategory(id)
    next(new SuccessResponse('', category))
  } catch (error: any) {
    next(new BadRequestError('', error))
  }
}

export default {
  findAll,
  findById,
  createCategory,
  updateCategory,
  deleteCategory,
}
