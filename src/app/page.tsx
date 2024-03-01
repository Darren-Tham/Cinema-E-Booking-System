"use client"

import Image from "next/image"
import SearchIcon from "@public/search-icon.svg"
import Link from "next/link"
import MovieBanner from "@public/movie-banner.png"
import MovieData from "@/data/movies_data.json"
import MoviesContainer from "@/components/MoviesContainer"
import ReactPlayer from "react-player"
import Cancel from "@public/cancel-icon.svg"
import ProfileIcon from "@public/profile-icon.svg"
import { MovieType } from "@/components/Movie"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [load, setLoad] = useState(false)
  const [playMovie, setPlayMovie] = useState(false)
  const [movieURL, setMovieURL] = useState("")
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    setLoad(true)
  }, [])

  const movies: MovieType[] = MovieData.map(movie => ({
    movieName: movie.movie_name,
    trailerLink: movie.trailer_link,
    imageLink: movie.image_link,
    movieDesc: movie.movie_desc
  }))

  function handleTrailerClick(trailerLink: string) {
    dialogRef.current?.showModal()
    setMovieURL(trailerLink)
    setPlayMovie(true)
  }

  return (
    <>
      <div className="min-h-screen bg-black flex flex-col">
        <nav className="w-full p-4 flex justify-between px-10">
          <div className="flex gap-5 items-center">
            <h1 className="font-bold text-white text-2xl">
              Cinema E-Booking System
            </h1>
            <div className="flex items-center bg-jade rounded-full p-2">
              <label htmlFor="search">
                <Image src={SearchIcon} alt="Search Icon" width={30} />
              </label>
              <input
                id="search"
                placeholder="Search..."
                className="input rounded-full w-96 bg-transparent text-white placeholder:text-neutral-200"
              />
            </div>
          </div>
          <div className="flex gap-3 items-center">
            {isLoggedIn ? (
              <>
                <Link href="/edit-profile" className="scale-transition">
                  <Image src={ProfileIcon} alt="Profile" width={45} />
                </Link>
                <p className="text-white font-semibold text-lg mr-4">
                  Hello, User!
                </p>
                <button
                  className="back-button"
                  onClick={() => setIsLoggedIn(false)}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login/login-page" className="action-button">
                  Login
                </Link>
                <Link
                  href="/registration/registration-page"
                  className="back-button"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
        <div className="bg-dark-jade p-2">
          <Image src={MovieBanner} alt="Movie Banner" />
        </div>
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
