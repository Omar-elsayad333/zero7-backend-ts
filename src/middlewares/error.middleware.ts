import { NextFunction, Request, Response } from 'express'
import { NotFoundError } from '@/services/response.service'

// uuid
import { v4 as uuidv4 } from 'uuid'

const errorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    next()
  } catch (error: any) {
    let errorId = uuidv4()
    if (error instanceof NotFoundError) {
    }

    return res.status(error.statusCode).json({
      errorId,
      status: res.__('response_status.error'),
      statusCode: error.statusCode,
      message: res.__(error.message),
      ...(error.data && { data: error.data }),
    })
  }
}

export default errorMiddleware

// let errorId = uuidv4()
// const isError = createdResponse.statusCode > 399

// if (isError) logger.error({ errorId, source: createdResponse.data })

// res.status(createdResponse.statusCode).json({
//   ...(isError && { errorId }),
//   status: isError ? res.__('response_status.error') : res.__('response_status.success'),
//   statusCode: createdResponse.statusCode,
//   message: res.__(createdResponse.message),
//   ...(createdResponse.data && { data: createdResponse.data }),
// })
