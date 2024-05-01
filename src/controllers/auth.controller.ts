import { Request, Response, NextFunction } from 'express'

// Utils
import { FRONT_URL } from '@/utils/secrets'

// Services
import { loginService, signupService, socialService } from '@/services/auth.service'

// Helpers
import { BadRequestError, UnauthorizedError } from '@/helpers/apiError'
import { CreatedResponse, SuccessResponse } from '@/helpers/apiResponse'

// POST /auth/login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = await loginService(req.body)
    next(new SuccessResponse('login successfully', userData))
  } catch (error: any) {
    next(new UnauthorizedError(error.message))
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

// POST /auth/signup
export const google = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.user._json.email)
    await socialService(req.user._json)
    res.redirect(`${FRONT_URL}`)
  } catch (error: any) {
    console.log(error)

    next(new BadRequestError('Faild to authorize user', error))
  }
}
