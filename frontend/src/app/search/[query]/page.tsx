"use client"

import MainMovieBanner from "@/components/MainMovieBanner"
import MoviesContainer from "@/components/MoviesContainer"
import UserNavbar from "@/components/UserNavbar"
import APIFacade from "@/lib/APIFacade"
import { Movie } from "@/lib/Types"
import { useEffect, useState } from "react"

type Props = {
  params: {
    query: string
  }
}

const SearchQuery = ({ params: { query } }: Readonly<Props>) => {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    const fetchSearchedMovies = async () => {
      const movies = await APIFacade.getSearchedMovies(query)
      setMovies(movies)
    }
    fetchSearchedMovies()
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

export default SearchQuery
