// src/types/auth.ts
// Zod-scheman + TS-typer för login/register-formerna

import { z } from 'zod'

export const signinSchema = z.object({
  email: z.string().email('Ogiltig e-post'),
  password: z.string().min(6, 'Minst 6 tecken'),
})
export type SigninInput = z.infer<typeof signinSchema>

export const signupSchema = z.object({
  name: z.string().min(2, 'Minst 2 tecken'),
  email: z.string().email('Ogiltig e-post'),
  password: z.string().min(6, 'Minst 6 tecken'),
})
export type SignupInput = z.infer<typeof signupSchema>