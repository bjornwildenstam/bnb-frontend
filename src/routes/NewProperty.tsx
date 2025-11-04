/** NewProperty.tsx – Skapa property (Create). Kräver inloggning. */
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { propertySchema } from '@/types/schemas'
import { api } from '@/lib/api'
import { useNavigate } from 'react-router-dom'
import { RequireAuth } from '@/lib/auth'

type PropertyFormValues = z.infer<typeof propertySchema>

function Form() {
  const nav = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: '',
      description: '',
      location: '',
      pricePerNight: 0,
      availability: true,
      imageUrl: '',
    },
  })

  const onSubmit: SubmitHandler<PropertyFormValues> = async (data) => {
    await api.post('/properties', data)
    nav('/properties')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 520 }}>
      <h1>New listing</h1>

      <input placeholder="Name" {...register('name')} />
      {errors.name && <p style={{ color: 'crimson' }}>{errors.name.message}</p>}
      <br />

      <textarea placeholder="Description" {...register('description')} />
      {errors.description && <p style={{ color: 'crimson' }}>{errors.description.message}</p>}
      <br />

      <input placeholder="Location" {...register('location')} />
      {errors.location && <p style={{ color: 'crimson' }}>{errors.location.message}</p>}
      <br />

      <input
        type="number"
        step="0.01"
        {...register('pricePerNight', { valueAsNumber: true })}
      />
      {errors.pricePerNight && <p style={{ color: 'crimson' }}>{errors.pricePerNight.message}</p>}
      <br />

      <input
  placeholder="Image URL"
  {...register('imageUrl')}
/>
{errors.imageUrl && (
  <p style={{ color: 'crimson' }}>{errors.imageUrl.message}</p>
)}
<br />

      <label>
        <input type="checkbox" {...register('availability')} /> Available
      </label>
      <br />

      <input
          placeholder="Image URL (optional)"  {...register('imageUrl')}
      />
      <br />



      <button>Create</button>
    </form>
  )
}

export default function NewPropertyPage() {
  return (
    <RequireAuth>
      <Form />
    </RequireAuth>
  )
}