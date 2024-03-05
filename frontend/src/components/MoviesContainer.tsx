"use client"

import Link from "next/link"
import Image from "next/image"
import ReactPlayer from "react-player"
import Cancel from "@public/cancel-icon.svg"
import Movie, { MovieType } from "./Movie"
import { useEffect, useRef, useState } from "react"

type Props = {
  heading: string
  movies: MovieType[]
}

export default function MoviesContainer({ heading, movies }: Readonly<Props>) {
  const [load, setLoad] = useState(false)
  const [playMovie, setPlayMovie] = useState(false)
  const [movieURL, setMovieURL] = useState("")
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    setLoad(true)
  }, [])

  function handleTrailerClick(trailerLink: string) {
    dialogRef.current?.showModal()
    setMovieURL(trailerLink)
    setPlayMovie(true)
  }

  return (
    <>
      <div className="w-max">
        <h2 className="font-bold text-3xl text-white mb-4">{heading}</h2>
        <div className="flex bg-dark-jade p-3 gap-3">
          {movies.map(movie => (
            <Movie
              key={movie.movieId}
              {...movie}
              handleTrailerClick={() =>
                handleTrailerClick(movie.movieTrailerLink)
              }
            />
          ))}
        </div>
      </div>

      <dialog ref={dialogRef} className="bg-transparent">
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
          {load && <ReactPlayer url={movieURL} playing={playMovie} />}
          <Link
            href="/theaters-and-times"
            className="bg-dark-jade text-white font-semibold py-2 px-6 w-max text-lg rounded-md self-center hover:scale-105 transition-transform duration-300"
          >
            Book Tickets
          </Link>
        </div>
      </dialog>
    </>
  )
}
