/** EditProperty.tsx – Uppdatera/Radera property (Update/Delete). Kräver inloggning. */

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '@/lib/api'
import type { Property } from '@/types'
import { z } from 'zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { propertySchema } from '@/types/schemas'
import { RequireAuth } from '@/lib/auth'

type PropertyFormValues = z.infer<typeof propertySchema>

function FormInner({ id }: { id: string }) {
  const nav = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropertyFormValues>({
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

  // Ladda initial data
  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const p = await api.get<Property>(`/properties/${id}`)
        if (!alive) return
        reset({
          name: p.name,
          description: p.description,
          location: p.location,
          pricePerNight: Number(p.pricePerNight),
          availability: Boolean(p.availability),
          imageUrl: p.imageUrl ?? "",   
        })
      } catch (e: any) {
        if (alive) setError(e.message ?? 'Failed to load')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [id, reset])

  // Spara -> PUT + tillbaka till listan
  const onSubmit: SubmitHandler<PropertyFormValues> = async (data) => {
    try {
      setSaving(true)
      await api.put(`/properties/${id}`, data)
      nav('/properties') 
    } catch (e: any) {
      setError(e.message ?? 'Failed to save')
      setSaving(false)
    }
  }

  // Delete + tillbaka till listan
  const onDelete = async () => {
    if (!confirm('Delete this listing?')) return
    try {
      await api.del(`/properties/${id}`)
      nav('/properties')
    } catch (e: any) {
      setError(e.message ?? 'Failed to delete')
    }
  }

  if (loading) return <p>Loading…</p>
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 520 }}>
      <h1>Edit listing</h1>

      <input placeholder="Name" {...register('name')} />
      {errors.name && <p style={{ color: 'crimson' }}>{errors.name.message}</p>}
      <br />

      <textarea placeholder="Description" {...register('description')} />
      {errors.description && <p style={{ color: 'crimson' }}>{errors.description.message}</p>}
      <br />

      <input placeholder="Location" {...register('location')} />
      {errors.location && <p style={{ color: 'crimson' }}>{errors.location.message}</p>}
      <br />

      <input type="number" step="0.01" {...register('pricePerNight', { valueAsNumber: true })} />
      {errors.pricePerNight && (
        <p style={{ color: 'crimson' }}>{errors.pricePerNight.message}</p>
      )}
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

      <input placeholder="Image URL (optional)" {...register('imageUrl')}
      />
      <br />

      <div style={{ display: 'flex', gap: 8 }}>
        <button disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
        <button type="button" onClick={onDelete} style={{ color: 'crimson' }}>
          Delete
        </button>
      </div>
    </form>
  )
}

export default function EditPropertyPage() {
  const { id } = useParams()
  if (!id) return <p>Missing id</p>
  return (
    <RequireAuth>
      <FormInner id={id} />
    </RequireAuth>
  )
}