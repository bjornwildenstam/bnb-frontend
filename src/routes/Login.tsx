/** Login.tsx – Inloggningsformulär (cookie-auth via backend). */
// src/routes/Login.tsx
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signinSchema, type SigninInput } from '@/types/auth'
import { useAuth } from '@/lib/auth'

export default function LoginPage() {
  const nav = useNavigate()
  const { signin } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<SigninInput>({ resolver: zodResolver(signinSchema) })

  const onSubmit = async (data: SigninInput) => {
    await signin(data.email, data.password)
    nav('/') // eller '/properties'
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 420 }}>
      <h1>Logga in</h1>
      <input placeholder="E-post" {...register('email')} />
      {errors.email && <p style={{color:'crimson'}}>{errors.email.message}</p>}
      <input type="password" placeholder="Lösenord" {...register('password')} />
      {errors.password && <p style={{color:'crimson'}}>{errors.password.message}</p>}
      <button disabled={isSubmitting}>Logga in</button>
    </form>
  )
}