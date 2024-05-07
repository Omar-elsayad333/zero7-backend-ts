import { Request, Response, NextFunction } from 'express'

// uuid
import { v4 as uuidv4 } from 'uuid'

// Utils
import logger from '@/utils/logger'

// Helpers
import ApiResponse from '@/services/response.service'

export default function (
  createdResponse: ApiResponse,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('hi from response')

  let errorId = uuidv4()
  const isError = createdResponse.statusCode > 399

  if (isError) logger.error({ errorId, source: createdResponse.data })

  res.status(createdResponse.statusCode).json({
    ...(isError && { errorId }),
    status: isError ? res.__('response_status.error') : res.__('response_status.success'),
    statusCode: createdResponse.statusCode,
    message: res.__(createdResponse.message),
    ...(createdResponse.data && { data: createdResponse.data }),
  })
}
