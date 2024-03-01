"use client"

import MainMovieBanner from "@/components/MainMovieBanner"
import { MovieType } from "@/components/Movie"
import MoviesContainer from "@/components/MoviesContainer"
import UserNavbar from "@/components/UserNavbar"
import { useEffect, useState } from "react"

type Props = {
  params: {
    query: string
  }
}

export default function SearchQuery({ params: { query } }: Readonly<Props>) {
  const [movies, setMovies] = useState<MovieType[]>([])

  useEffect(() => {
    async function getMovies() {
      const response = await fetch(
        `http://localhost:8080/movies/search?query=${query}`
      )
      const data = await response.json()
      setMovies(data)
    }
  }, [query])

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <UserNavbar />
      <MainMovieBanner />
      <MoviesContainer heading="Search" movies={movies} />
    </div>
  )
}
