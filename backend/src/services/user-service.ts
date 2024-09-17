import bcrypt from 'bcryptjs'
import { Validation } from '../validation/validation'
import { prismaClient } from '../application/database'
import { ResponseError } from '../error/response-error'
import { UserValidation } from '../validation/user-validation'
import { CreateUserRequest, toUserResponse, UserResponse, LoginUserRequest } from '../models/user-model'
import { Prisma } from '@prisma/client'

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const { confirmPassword, ...registerRequest } = Validation.validate(UserValidation.REGISTER, request)

    // Format fullName (capitalize first letter of each word)
    registerRequest.fullName = registerRequest.fullName
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')

    const totalUserWithSameUsername = await prismaClient.user.count({
      where: {
        username: registerRequest.username
      }
    })

    if (totalUserWithSameUsername != 0) {
      throw new ResponseError(400, 'Username already exists')
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

    // Define profile picture based on gender
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${registerRequest.username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${registerRequest.username}`
    registerRequest.profilePic = registerRequest.gender === 'male' ? boyProfilePic : girlProfilePic

    try {
      const userCreateInput: Prisma.UserCreateInput = {
        username: registerRequest.username,
        gender: registerRequest.gender,
        fullName: registerRequest.fullName,
        password: registerRequest.password,
        profilePic: registerRequest.profilePic
      }

      const user = await prismaClient.user.create({
        data: userCreateInput
      })
      return toUserResponse(user)
    } catch (error) {
      throw new ResponseError(500, 'Failed to create user, Error on User Service')
    }
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request)

    const user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username
      }
    })

    if (!user) {
      throw new ResponseError(400, 'Username or password is wrong')
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)

    if (!isPasswordValid) {
      throw new ResponseError(400, 'Username or password is wrong')
    }

    return toUserResponse(user)
  }

  static async getAll(userId: string): Promise<UserResponse[]> {
    const users = await prismaClient.user.findMany({
      where: {
        id: {
          not: userId
        }
      }
    })

    if (users.length === 0) {
      throw new ResponseError(404, 'No users found')
    }

    return users.map(toUserResponse)
  }
}
