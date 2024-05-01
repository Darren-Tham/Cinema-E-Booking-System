export type Movie = {
  id: number
  title: string
  trailerLink: string
  imageLink: string
  status: string
  ratingOutOf10: string
  categories: string[]
  castMembers: string[]
  directors: string[]
  producers: string[]
  synopsis: string
  ratingCode: string
}

export type ShowTime = {
  id: number
  movieId: number
  dateTime: string
}

export type Promotion = {
  name: string
  discountCode: string
  discountPercentage: number
  startDate: string
  endDate: string
}

export type Email = {
  receiverEmail: string
  subject: string
  text: string
}

export type ProfileCard = {
  id: number
  cardType: string
  expirationDate: string
  billingAddress: string
  lastFourDigits: string
}

export type CustomerCard = {
  customerId: number
  cardType: string
  cardNumber: string
  expirationDate: string
  billingAddress: string
}

export type ProfileHomeAddress = {
  id: number
  address: string
  city: string
  state: string
  zipcode: string
}

export type CustomerHomeAddress = {
  customerId: number
  address: string
  city: string
  state: string
  zipcode: string
}

export type Customer = {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  status: string
  isSubscribedForPromotions: boolean
}

export type NewCustomer = {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: string
  isSubscribedForPromotions: boolean
}

export type Admin = {
  id: number
  username: string
}

export type Review = {
  id: number
  ratingOutOf10: number
  date: string
  title: string
  content: string
}
