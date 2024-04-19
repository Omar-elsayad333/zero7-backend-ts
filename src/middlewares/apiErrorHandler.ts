import { Request, Response, NextFunction } from 'express'

// uuid
import { v4 as uuidv4 } from 'uuid'

// Utils
import logger from '@/utils/logger'

// Helpers
import ApiError from '@/helpers/apiError'

export default function (error: ApiError, req: Request, res: Response, next: NextFunction) {
  const errorId = uuidv4()
  if (error.source) {
    error.source.id = errorId
    logger.error(error.source)
  }

  res.status(error.statusCode).json({
    status: 'error',
    statusCode: error.statusCode,
    message: error.message,
    errorId: errorId,
  })
}
