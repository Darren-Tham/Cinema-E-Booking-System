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
        `http://localhost:8080/api/movie/search?query=${query}`
      )
      const data = await response.json()
      setMovies(data)
    }
    getMovies()
  }, [query])

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <UserNavbar />
      <MainMovieBanner />
      <div className="w-screen flex justify-center my-10">
        {movies.length === 0 ? (
          <p className="text-white font-bold text-3xl">No Movies Found</p>
        ) : (
          <MoviesContainer heading="Search" movies={movies} />
        )}
      </div>
    </div>
  )
}
