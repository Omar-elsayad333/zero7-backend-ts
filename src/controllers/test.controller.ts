import testModel from '@/models/test.model'
import { Request, Response, NextFunction } from 'express'
import { BadRequestError, UnauthorizedError } from '@/helpers/apiError'
import { createAccesToken } from '@/utils/tokens'
import userModel from '@/models/user.model'

export const test = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('omar')

    res.json({ message: res.__('test.name') })
  } catch (error) {
    res.json({ message: error })
  }
}

export const createTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const { name, age } = req.body
    // // add doc to db
    // const gender = await testModel.create({ name, age })
    // req.session.user = { name, age }
    // res.json(gender)
    // // res.send(req.session.user)
    // const { email, password } = req.body
    // const user = await userModel.login(email, password)
    // // Create new tokens for user
    // user.accessToken = await createAccesToken(user._id)
    // user.refreshToken = await createRefreshToken(user._id)
    // user.accessTokenExpireAt = await getTokenExpDate(user.accessToken)
    // user.refreshTokenExpireAt = await getTokenExpDate(user.refreshToken)
    // // Save the new tokens to the user
    // await user.save()
    // return {
    //   email: user.email,
    //   accessToken: user.accessToken,
    //   refreshToken: user.refreshToken,
    //   accessTokenExpireAt: user.accessTokenExpireAt,
    //   refreshTokenExpireAt: user.refreshTokenExpireAt,
    // }
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
