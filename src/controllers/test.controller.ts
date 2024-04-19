import { db } from '@/config/db'
import { BadRequestError } from '@/helpers/apiError'
import testModel from '@/models/test.model'
import { Request, Response, NextFunction } from 'express'

export const test = (req: Request, res: Response, next: NextFunction) => {
  console.log(req)

  res.json({ message: 'hi' })
}

export const createTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, age } = req.body

    // add doc to db
    const gender = await testModel.create({ name, age })

    res.json(gender)
  } catch (error: any) {
    next(new BadRequestError('Invalid Request', error))
  }
}

export const loginTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Set session data
    req.session.user = { id: 1, username: 'example' }

    res.send('Logged in')
  } catch (error: any) {
    next(new BadRequestError('Invalid Request', error))
  }
}

export const profileTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.session.user
    res.send(`Welcome ${user?.username}`)
  } catch (error: any) {
    next(new BadRequestError('Invalid Request', error))
  }
}

export const logoutTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.session.user
    res.send(`Welcome ${user?.username}`)

    req.session.destroy((err) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error logging out')
      } else {
        res.send('Logged out')
      }
    })
  } catch (error: any) {
    next(new BadRequestError('Invalid Request', error))
  }
}
