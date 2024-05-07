import { Request, Response, NextFunction } from 'express'

// Services
import ProductsServices from '@/services/products.service'
import { BadRequestError, CreateResponse, SuccessResponse } from '@/services/response.service'

// GET /products
export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await ProductsServices.findAllService()
    next(new SuccessResponse('', products))
  } catch (error: any) {
    next(new BadRequestError('', error))
  }
}

// GET /products/:id
export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const product = await ProductsServices.findByIdService(id)
    next(new SuccessResponse('', product))
    throw new Error()
  } catch (error: any) {
    next(new BadRequestError('', error))
  }
}

// POST /products
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body, files } = req
    console.log('body', body)
    console.log(files)

    const product = await ProductsServices.createProduct(body, files)
    next(new CreateResponse('', product))
  } catch (error: any) {
    next(new BadRequestError(error.message, error))
  }
}

// PATCH /products/:id
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req
    const { id } = req.params
    const product = await ProductsServices.updateProduct(id, body)
    next(new SuccessResponse('', product))
  } catch (error: any) {
    next(new BadRequestError(error.message, error))
  }
}

// DELETE /products/:id
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const product = await ProductsServices.deleteProduct(id)
    next(new SuccessResponse('', product))
  } catch (error: any) {
    next(new BadRequestError('', error))
  }
}

export default {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
}
