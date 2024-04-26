import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '@/helpers/apiError'
import { NextFunction, Request, Response } from 'express'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers

    if (!authorization) next(new UnauthorizedError('User not authorized'))

    // Verify req token
    const JwtSecret = process.env.JWT_SECRET
    const token = authorization?.split(' ')[1]
    const tokenPayload = token && JwtSecret && jwt.verify(token, JwtSecret)

    console.log(tokenPayload)

    // if (!_id) next(new UnauthorizedError('User not authorized'))
    // req.userId
    // req.token = token
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Request is not authorized' })
  }
}

export default authMiddleware
