import { Request, Response, NextFunction } from 'express'

// Services
import { loginService, signupService } from '@/services/auth.service'

// Helpers
import { BadRequestError, UnauthorizedError } from '@/helpers/apiError'
import { CreatedResponse, SuccessResponse } from '@/helpers/apiResponse'

// POST /auth/login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = await loginService(req.body)
    res.json(new SuccessResponse('login successfully', userData))
  } catch (error: any) {
    next(new UnauthorizedError('Unauthorized Request', error))
  }
}

// POST /auth/signup
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = await signupService(req.body)
    res.json(new CreatedResponse('sign up successfully', userData))
  } catch (error: any) {
    next(new BadRequestError('Input is not correct', error))
  }
}
