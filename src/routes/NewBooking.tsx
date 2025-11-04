// src/routes/NewBooking.tsx
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { api } from "@/lib/api"
import { RequireAuth } from '@/lib/auth'

type FormValues = {
  checkInDate: string
  checkOutDate: string
}

function NewBookingInner() {
  const { propertyId } = useParams<{ propertyId: string }>()
  const nav = useNavigate()
  const { register, handleSubmit } = useForm<FormValues>()

  if (!propertyId) return <p>Missing property id</p>

  const onSubmit = async (data: FormValues) => {
    await api.createBooking({
      propertyId,
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
    })
    nav("/bookings")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400 }}>
      <h1>Book stay</h1>
      <p>Property id: {propertyId}</p>

      <label>
        Check in
        <input type="date" {...register("checkInDate", { required: true })} />
      </label>
      <br />

      <label>
        Check out
        <input type="date" {...register("checkOutDate", { required: true })} />
      </label>
      <br />

      <button>Book</button>
    </form>
  )
}

export default function NewBookingPage() {
  return (
    <RequireAuth>
      <NewBookingInner />
    </RequireAuth>
  )
}