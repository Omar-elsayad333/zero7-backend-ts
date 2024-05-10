import { Request, Response, NextFunction } from 'express'

// Utils
import { FRONT_URL } from '../utils/secrets'

// Services
import AuthServices from '../services/auth.service'
import {
  BadRequestError,
  CreateResponse,
  SuccessResponse,
  UnauthorizedError,
} from '../services/response.service'

// POST /auth/login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = await AuthServices.loginService(req.body)
    next(new SuccessResponse('response_messages.login_successfully', userData))
  } catch (error: any) {
    next(
      new UnauthorizedError(
        error.message || 'response_messages.incorrect_email_or_password',
        error,
      ),
    )
  }
}

// POST /auth/signup
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await AuthServices.signupService(req.body)
    next(new CreateResponse('response_messages.sign_up_successfully'))
  } catch (error: any) {
    next(new BadRequestError(error.message))
  }
}

// POST /auth/google/callback
export const google = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userAccessToken = await AuthServices.socialService(req.user._json)
    res.cookie('accessToken', userAccessToken)
    res.redirect(`${FRONT_URL}`)
  } catch (error: any) {
    next(new BadRequestError('response_messages.faild_to_authorize_user', error))
  }
}

// GET /auth/verfiy
export const verfiy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resMessage = await AuthServices.verfiyService(req.params.email, req.params.token)
    next(new SuccessResponse(resMessage))
  } catch (error: any) {
    next(new BadRequestError(error.message, error))
  }
}
