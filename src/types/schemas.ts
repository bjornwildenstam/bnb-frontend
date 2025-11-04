/** schemas.ts – Zod-schemas för formulärvalidering (register, login, property). */
import { z } from 'zod'


export const propertySchema = z.object({
  name: z.string().min(2, 'Minst 2 tecken'),
  description: z.string().min(10, 'Minst 10 tecken'),
  location: z.string().min(2, 'Ange plats'),
  pricePerNight: z.number().positive('Pris måste vara > 0') ,
  availability: z.boolean().refine(val => typeof val === 'boolean', {
  message: 'Availability måste vara true/false',

}),
  imageUrl: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
})

export const loginSchema = z.object({
  email: z.string().email('Ogiltig e-post'),
  password: z.string().min(6, 'Minst 6 tecken'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Minst 2 tecken'),
  email: z.string().email('Ogiltig e-post'),
  password: z.string().min(6, 'Minst 6 tecken'),
})