import testModel from '@/models/test.model'
import { Request, Response, NextFunction } from 'express'
import { BadRequestError, UnauthorizedError } from '@/helpers/apiError'
import { createAccesToken } from '@/utils/tokens'
import userModel from '@/models/user.model'
import sendMail from '@/config/nodemailer'

export const test = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await sendMail()
    res.json({ message: data })
  } catch (error) {
    res.json({ message: error })
  }
}

export const createTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error: any) {
    next(new BadRequestError('Invalid Request', error))
  }
}

export const loginTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const accessToken = createAccesToken({ _id })
    res.send(req.session.user)
  } catch (error: any) {
    next(new BadRequestError('Invalid Request', error))
  }
}

export const profileTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.session.user
    if (!user) throw new Error('Unauthorized user')
    res.send(`Welcome ${user?.username}`)
  } catch (error: any) {
    next(new UnauthorizedError('Unauthorized Request', error))
  }
}

export const logoutTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error(err)
        throw new Error(err)
      } else {
        res.send('Logged out')
      }
    })
  } catch (error: any) {
    next(new BadRequestError('Invalid Request', error))
  }
}
