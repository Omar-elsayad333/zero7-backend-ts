import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

import { JWT_SECRET } from '@/utils/secrets'
import { UnauthorizedError } from '@/helpers/apiError'
import UserModel, { UserDocument } from '@/models/user.model'

// GET /auth/google
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('user', req.session.user)

    const { name, email, id, isAdmin } = req.session.user as UserDocument
    const data = {
      name,
      email,
      id,
      isAdmin,
    }
    // const token = await jwt.sign(
    //   data,
    //   JWT_SECRET,
    //   {
    //     expiresIn: '10000000h',
    //   },
    //   (error: any, token: string) => {
    //     if (error) throw error
    //     res.json({ token })
    //   },
    // )
    // res.json({ token })
    // res.send(token)
  } catch (error: any) {
    next(new UnauthorizedError('Unauthorized Request', error))
  }
}

//POST /users
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = req.body
    // const newUser = new UserModel({
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    // })

    const data = {
      firstName,
      lastName,
      email,
      password,
    }

    console.log(data)

    res.json(data)

    // Hash password
    // const salt = await bcrypt.genSalt(10)
    // newUser.password = await bcrypt.hash(password, salt)

    // //Create new user account
    // await UserModel.create(newUser)
    // res.json(newUser)

    // // Create the JWT
    // const data = {
    //   newUser: {
    //     name: newUser.name,
    //     email: newUser.email,
    //     id: newUser.id,
    //     isAdmin: newUser.isAdmin,
    //   },
    // }
    // jwt.sign(
    //   data,
    //   JWT_SECRET,
    //   {
    //     expiresIn: '10000000h',
    //   },
    //   (error, token) => {
    //     if (error) throw console.log('jwt is wrong', error)
    //     console.log('token Normal', token)

    //     res.json({ token })
    //   },
    // )
  } catch (error) {
    console.log(error)

    // if (error.keyPattern) {
    //   next(new BadRequestError('Email already exists', error))
    // }
    // if (error.errors.password.message) {
    //   next(new BadRequestError('Minimum of pass letter is 8', error))
    // }
    // console.log('seeme', error.errors.email.message)
    // if (error.errors.email.message) {
    //   next(new BadRequestError('Invalid Emal', error))
    // }
    // next(new BadRequestError('Input is not correct', error))
  }
}
