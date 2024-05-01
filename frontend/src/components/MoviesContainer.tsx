"use client"

import Link from "next/link"
import Image from "next/image"
import ReactPlayer from "react-player"
import Cancel from "@public/cancel-icon.svg"
import MovieComponent, { MovieType } from "./Movie"
import { useEffect, useRef, useState } from "react"

type Props = {
  heading: string
  movies: MovieType[]
}

export default function MoviesContainer({ heading, movies }: Readonly<Props>) {
  const [load, setLoad] = useState(false)
  const [playMovie, setPlayMovie] = useState(false)
  const [movieURL, setMovieURL] = useState("")
  const [movieRating, setMovieRating] = useState("")
  const [movieId, setMovieId] = useState(0)
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    setLoad(true)
  }, [])

  function handleTrailerClick(
    trailerLink: string,
    movieRating: string,
    movieId: number
  ) {
    dialogRef.current?.showModal()
    setMovieURL(trailerLink)
    setPlayMovie(true)
    setMovieRating(movieRating)
    setMovieId(movieId)
  }

  return (
    <>
      <div className="w-max">
        <h2 className="font-bold text-2xl text-white mb-4">{heading}</h2>
        <div className="flex gap-7">
          {movies.map(movie => (
            <MovieComponent
              key={movie.id}
              movie={movie}
              handleTrailerClick={() =>
                handleTrailerClick(
                  movie.trailerLink,
                  movie.ratingOutOf10,
                  movie.id
                )
              }
            />
          ))}
        </div>
      </div>

      <dialog ref={dialogRef} className="bg-transparent shadow-md">
        <div className="bg-jade flex flex-col p-2 rounded-md gap-2">
          <button
            className="self-end hover:scale-105 transition-transform duration-300"
            onClick={() => {
              dialogRef.current?.close()
              setPlayMovie(false)
            }}
          >
            <Image src={Cancel} alt="Cancel" width={35} />
          </button>
          <h2 className="text-white font-bold self-center text-xl">
            Rating: {movieRating}/10
          </h2>
          {load && <ReactPlayer url={movieURL} playing={playMovie} />}
          <Link
            href={`/theaters-and-times?movieId=${movieId}`}
            className="bg-dark-jade text-white font-semibold py-2 px-6 w-max text-lg rounded-md self-center hover:scale-105 transition-transform duration-300"
          >
            Book Tickets
          </Link>
        </div>
      </dialog>
    </>
  )
}
