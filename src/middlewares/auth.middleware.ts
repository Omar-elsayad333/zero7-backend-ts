import { NextFunction, Request, Response } from 'express'

// 3rd party libs
import jwt, { JwtPayload } from 'jsonwebtoken'

// Utils
import { JWT_SECRET } from '../utils/secrets'

// Services
import { UnauthorizedError } from '@/services/response.service'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract the token from request headers or wherever you are passing it
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return next(new UnauthorizedError('response_messages.user_not_authorized'))

    // Verify req token
    const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload

    if (!decodedToken?._id)
      return next(new UnauthorizedError('response_messages.user_not_authorized'))

    req.token = token
    req.userId = decodedToken._id
    next()
  } catch (error) {
    next(new UnauthorizedError('response_messages.user_not_authorized'))
  }
}

export default authMiddleware
