/** index.ts – Domän-typer (strikt typat) som matchar backendens modeller */
export type User = {
  id: string
  name: string
  email: string
  isAdmin?: boolean
}

export type Property = {
  id: string
  name: string
  description: string
  location: string
  pricePerNight: number
  availability: boolean
  user_id?: string
  imageUrl?: string | null
}

export type Booking = {
  id: string
  createdAt: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  user_id: string
  property_id: string
}