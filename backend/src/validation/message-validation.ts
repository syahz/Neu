import { z, ZodType } from 'zod'

export class MessageValidation {
  static readonly SENDMESSAGE: ZodType = z.object({
    message: z.string().min(1).max(250)
  })
}
