"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/lib/useAuth"
import UnauthorizedScreen from "@/components/UnauthorizedScreen"
import APIFacade from "@/lib/APIFacade"
import { Movie } from "@/lib/Types"

export default function ManageMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const isAdmin = useAuth("admin")

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await APIFacade.getAllMovies()
      setMovies(movies)
    }
    fetchMovies()
  }, [])

  const renderMovies = (heading: string, movies: Movie[]) => {
    return (
      <div className="w-max">
        <h2 className="font-bold text-2xl text-white mb-4">{heading}</h2>
        <div className="flex gap-7">
          {movies.map(movie => (
            <div
              key={movie.id}
              className="bg-jade p-2 flex flex-col justify-end"
            >
              <div className="relative">
                <Link href={`./edit-movie?movieId=${movie.id}`}>
                  <Image
                    src={movie.imageLink}
                    alt={movie.title}
                    width={175}
                    height={0}
                    priority
                  />
                </Link>
              </div>
              <h2 className="text-white text-center font-semibold mt-1">
                {movie.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return isAdmin ? (
    <div className="flex flex-col bg-black h-screen items-center gap-8 p-8">
      <Link
        href="/admin-view"
        className="bg-jade px-4 py-2 text-white font-bold scale-transition rounded-md self-start"
      >
        Back To Admin View
      </Link>
      <h1 className="text-3xl text-white font-bold">Manage Movies</h1>
      {renderMovies(
        "Now Playing",
        movies.filter(movie => movie.status === "NOW_PLAYING")
      )}
      {renderMovies(
        "Coming Soon",
        movies.filter(movie => movie.status === "COMING_SOON")
      )}
      <div className="flex gap-5">
        <Link
          href="./add-movie"
          className="text-white w-max font-bold text-lg bg-jade px-10 py-3 rounded-md scale-transition "
        >
          Add Movie
        </Link>
      </div>
    </div>
  ) : (
    <UnauthorizedScreen />
  )
}
