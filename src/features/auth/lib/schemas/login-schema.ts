import { z } from 'zod/v4'

export const loginSchema = z.object({
   email: z.email(),
   password: z
      .string()
      .min(1, 'Password is required')
      .min(3, 'Password must be at least 3 characters long'),
   rememberMe: z.boolean(),
})

export type LoginInputs = z.infer<typeof loginSchema>
