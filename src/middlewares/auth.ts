import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '@/helpers/apiError'
import { NextFunction, Request, Response } from 'express'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    next(new UnauthorizedError('User not authanticted'))
    // return res.status(401).json({ status: 401, message: 'Not authanticted' })
  }

  // Verify req token
  const token = authorization?.split(' ')[1]

  try {
    // const { _id } = jwt.verify(token, process.env.SECRET)
    // if (!_id) {
    //   throw new Error('No Id')
    // }

    // req.token = token
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Request is not authorized' })
  }
}

export default authMiddleware
