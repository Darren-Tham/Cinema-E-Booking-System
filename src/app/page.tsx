"use client"

import MoviesContainer from "@/components/MoviesContainer"
import { MovieType } from "@/components/Movie"
import { useEffect, useState } from "react"
import UserNavbar from "@/components/UserNavbar"
import MainMovieBanner from "@/components/MainMovieBanner"

export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([])

  useEffect(() => {
    async function getMovies() {
      const response = await fetch("http://localhost:8080/movies")
      const data = await response.json()
      setMovies(data)
    }
    getMovies()
  }, [])

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <UserNavbar />
      <MainMovieBanner />
      <div className="w-screen flex items-center my-10 flex-col gap-8">
        <MoviesContainer
          heading="Now Playing"
          movies={movies.filter((_, i) => i <= 4)}
        />
        <MoviesContainer
          heading="Coming Soon"
          movies={movies.filter((_, i) => i >= 5)}
        />
      </div>
    </div>
  )
}
