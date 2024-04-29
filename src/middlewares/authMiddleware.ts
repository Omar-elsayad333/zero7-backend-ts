import jwt, { JwtPayload } from 'jsonwebtoken'
import { UnauthorizedError } from '@/helpers/apiError'
import { NextFunction, Request, Response } from 'express'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract the token from request headers or wherever you are passing it
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return next(new UnauthorizedError('User not authorized'))

    // Verify req token
    const JwtSecret = process.env.JWT_SECRET || ''
    const decodedToken = jwt.verify(token, JwtSecret) as JwtPayload
    console.log(decodedToken)

    if (!decodedToken?._id) return next(new UnauthorizedError('User not authorized'))

    req.token = token
    req.userId = decodedToken._id
    next()
  } catch (error) {
    // console.log(error)
    return res.status(401).json({ error: 'Request is not authorized' })
  }
}

export default authMiddleware
