import { z, ZodType } from 'zod'

export class UserValidation {
  static readonly REGISTER: ZodType = z
    .object({
      username: z.string().min(1, { message: 'Username is required' }).max(100),
      password: z.string().min(1, { message: 'Password is required' }).max(100),
      confirmPassword: z.string().min(1, { message: 'Confirm password is required' }).max(100),
      fullName: z.string().min(1, { message: 'Full name is required' }).max(100),
      gender: z.enum(['male', 'female'], { required_error: 'Gender is required' })
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword']
    })

  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100)
  })

  static readonly UPDATE: ZodType = z.object({
    password: z.string().min(1).max(100).optional(),
    name: z.string().min(1).max(100).optional()
  })
}
