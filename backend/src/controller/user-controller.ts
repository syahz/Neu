import { UserRequest } from '../type/user-request'
import { UserService } from '../services/user-service'
import { Request, Response, NextFunction } from 'express'
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest } from '../models/user-model'

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request: CreateUserRequest = req.body as CreateUserRequest
    const response = await UserService.register(request)
    res.status(200).json({
      data: response
    })
  } catch (e) {
    next(e)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request: LoginUserRequest = req.body as LoginUserRequest
    const response = await UserService.login(request)
    res.status(200).json({
      data: response
    })
  } catch (e) {
    next(e)
  }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    if (!uuidRegex.test(userId)) {
      res.status(400).send({ message: 'Invalid UUID format for Users Id' })
      return
    }

    const response = await UserService.getAll(userId)
    res.status(200).json({
      data: response
    })
  } catch (e) {
    next(e)
  }
}
