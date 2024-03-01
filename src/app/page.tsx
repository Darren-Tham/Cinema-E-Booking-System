"use client"

import Image from "next/image"
import Link from "next/link"
import MoviesContainer from "@/components/MoviesContainer"
import ReactPlayer from "react-player"
import Cancel from "@public/cancel-icon.svg"
import { MovieType } from "@/components/Movie"
import { useEffect, useRef, useState } from "react"
import UserNavbar from "@/components/UserNavbar"
import MainMovieBanner from "@/components/MainMovieBanner"

export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([])
  const [load, setLoad] = useState(false)
  const [playMovie, setPlayMovie] = useState(false)
  const [movieURL, setMovieURL] = useState("")
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    async function getMovies() {
      const response = await fetch("http://localhost:8080/movies")
      const data = await response.json()
      setMovies(data)
    }
    getMovies()
    setLoad(true)
  }, [])

  function handleTrailerClick(trailerLink: string) {
    dialogRef.current?.showModal()
    setMovieURL(trailerLink)
    setPlayMovie(true)
  }

  return (
    <>
      <div className="min-h-screen bg-black flex flex-col">
        <UserNavbar />
        <MainMovieBanner />
        <div className="w-screen flex items-center my-10 flex-col gap-8">
          <MoviesContainer
            heading="Now Playing"
            movies={movies.filter((_, i) => i <= 4)}
            handleTrailerClick={handleTrailerClick}
          />
          <MoviesContainer
            heading="Coming Soon"
            movies={movies.filter((_, i) => i >= 5)}
            handleTrailerClick={handleTrailerClick}
          />
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
