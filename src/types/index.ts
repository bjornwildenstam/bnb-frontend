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
  userId: string
  imageUrl?: string | null
}

export type Booking = {
  id: string
  userId: string
  propertyId: string
  checkInDate: string  
  checkOutDate: string
  totalPrice: number
  createdAt: string
  property?: {
    id: string
    name: string
    location: string
    pricePerNight: number
  }
}