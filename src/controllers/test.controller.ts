import { Request, Response, NextFunction } from 'express'
import { BadRequestError, UnauthorizedError } from '@/services/response.service'
import Notification from '@/models/notification.model'
import { sendToRoom } from '@/services/socket.service'

export const test = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json('success')
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

export const createTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req

    console.log(req)

    // sendToRoom(roomId, 'event name', body)
    res.status(201).json('created successfully')
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
