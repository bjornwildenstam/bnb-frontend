/** Register.tsx – Registreringsformulär (via backend /auth/signup). */
// src/routes/Register.tsx
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema, type SignupInput } from '@/types/auth'
import { useAuth } from '@/lib/auth'

export default function RegisterPage() {
  const nav = useNavigate()
  const { signup } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<SignupInput>({ resolver: zodResolver(signupSchema) })

  const onSubmit = async (data: SignupInput) => {
    await signup(data.name, data.email, data.password)
    nav('/') // eller '/properties'
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 420 }}>
      <h1>Skapa konto</h1>
      <input placeholder="Namn" {...register('name')} />
      {errors.name && <p style={{color:'crimson'}}>{errors.name.message}</p>}
      <input placeholder="E-post" {...register('email')} />
      {errors.email && <p style={{color:'crimson'}}>{errors.email.message}</p>}
      <input type="password" placeholder="Lösenord" {...register('password')} />
      {errors.password && <p style={{color:'crimson'}}>{errors.password.message}</p>}
      <button disabled={isSubmitting}>Registrera</button>
    </form>
  )
}