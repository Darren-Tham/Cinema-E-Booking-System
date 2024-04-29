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
