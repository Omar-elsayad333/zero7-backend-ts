import { Request, Response, NextFunction } from 'express'

// uuid
import { v4 as uuidv4 } from 'uuid'

// Utils
import logger from '@/utils/logger'

// Helpers
import ApiResponse from '@/services/response.service'

export default function (error: ApiResponse, req: Request, res: Response, next: NextFunction) {
  let errorId = uuidv4()
  if (error.source) {
    error.source.id = errorId
    logger.error(error.source)
  }

  const isError = error.statusCode > 399

  res.status(error.statusCode).json({
    ...(isError && { errorId: errorId }),
    status: isError ? 'error' : 'success',
    statusCode: error.statusCode,
    message: res.__(error.message),
  })
}
