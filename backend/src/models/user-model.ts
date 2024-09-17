import { User } from '@prisma/client'

export type UserResponse = {
  userId: string
  username: string
  fullName: string
  profilePic: string
}

export type CreateUserRequest = {
  username: string
  gender: 'male' | 'female'
  fullName: string
  password: string
  confirmPassword: string
  profilePic?: string | ''
}

export type LoginUserRequest = {
  username: string
  password: string
}

export type UpdateUserRequest = {
  name?: string
  password?: string
}

export function toUserResponse(user: User): UserResponse {
  return {
    userId: user.id,
    fullName: user.fullName,
    username: user.username,
    profilePic: user.profilePic
  }
}
