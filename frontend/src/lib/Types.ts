export type Movie = { id: number } & NewMovie

export type NewMovie = {
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
  adultTicketPrice: number
  childTicketPrice: number
  seniorTicketPrice: number
}

export type Showtime = {
  id: number
  dateTime: string
  unavailableSeats: string[]
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

export type CheckoutCard = {
  cardType: string
  expirationDate: string
  billingAddress: string
  lastFourDigits: string
}

export type ProfileCard = { id: number } & CheckoutCard

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

export type Transaction = {
  movieId?: number
  customerId?: number
  showtimeId?: number
  adultTicketCount?: number
  childTicketCount?: number
  seniorTicketCount?: number
  taxes?: number
  subtotal?: number
  total?: number
  seats?: string[]
  bookingId?: number
}

export type ProfileBooking = {
  bookingId: number
  movieTitle: string
  movieImageLink: string
  dateTime: string
  seats: string[]
  total: number
  cardType: string
  expirationDate: string
  billingAddress: string
  lastFourDigits: string
  bookingDate: string
}

export type CheckoutBooking = {
  movieId: number
  customerId: number
  showtimeId: number
  adultTicketCount: number
  childTicketCount: number
  seniorTicketCount: number
  seats: string[]
  total: number
  cardType: string
  expirationDate: string
  billingAddress: string
  lastFourDigits: string
}

export type Ticket = {
  ticketId: number
  price: number
  ticketType: string
}
