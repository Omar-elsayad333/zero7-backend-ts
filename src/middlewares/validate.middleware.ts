import { NextFunction, Request, Response } from 'express'

// 3rd party libraries
import { ValidationResult } from 'joi'

// Services
import { ValidationError } from '@/services/response.service'

const validate = <T>(schema: (data: T) => ValidationResult<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { file } = req
    const data = { ...req.body }
    if (file) data[file['fieldname']] = file

    const { error } = schema(data)
    if (error) next(new ValidationError('', error))

    next()
  }
}

export default validate
