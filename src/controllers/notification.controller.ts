import { NextFunction, Request, Response } from 'express'

// Services
import NotificationService from '../services/notification.service'
import { InternalServerError, SuccessResponse } from '../services/response.service'

// GET notifications/
export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notifications = await NotificationService.findAll()
    next(new SuccessResponse('success', notifications))
  } catch (error) {
    next(new InternalServerError())
  }
}
