"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import APIFacade from "@/lib/APIFacade"
import { Movie } from "@/lib/Types"
import useAdmin from "@/hooks/useAdmin"
import PageFacade from "@/lib/PageFacade"

const ManageMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const isAdmin = useAdmin()

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
                <Link href={PageFacade.editMovie(movie.id)}>
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

  return (
    isAdmin && (
      <div className="flex flex-col h-screen items-center gap-8 p-8">
        <Link
          href={PageFacade.ADMIN_VIEW}
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
            href={PageFacade.ADD_MOVIE}
            className="text-white w-max font-bold text-lg bg-jade px-10 py-3 rounded-md scale-transition mb-8"
          >
            Add Movie
          </Link>
        </div>
      </div>
    )
  )
}

export default ManageMovies
