import { NextFunction, Request, Response } from 'express'

// 3rd party libraries
import { ValidationResult } from 'joi'

// Services
import { ValidationError } from '../services/response.service'

const validateMiddleware = <T>(schema: (data: T) => ValidationResult<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { file } = req
    const data = { ...req.body }
    if (file) data[file['fieldname']] = file

    const { error } = schema(data)
    if (error) {
      const modifiedError = error.details?.map((item) => item.message)
      next(new ValidationError('', { errors: modifiedError }))
    }

    next()
  }
}

export default validateMiddleware
