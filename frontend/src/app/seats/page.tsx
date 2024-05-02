"use client"

import HomeNavbar from "@/components/HomeNavbar"
import Seat from "@/components/Seat"
import CheckoutBanner from "@/components/CheckoutBanner"
import Link from "next/link"
import { useAuth } from "@/lib/useAuth"
import APIFacade from "@/lib/APIFacade"
import { Movie, Showtime } from "@/lib/Types"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

const SeatsPage = () => {
  const [movie, setMovie] = useState<Movie>()
  const [showtime, setShowtime] = useState<Showtime>()
  const searchParams = useSearchParams()
  useEffect(() => {
    const fetchMovie = async (movieId: number) => {
      const movie = await APIFacade.getMovieById(movieId)
      setMovie(movie)
    }

    const fetchShowtime = async (showtimeId: number) => {
      const showtime = await APIFacade.getShowtimeById(showtimeId)
      setShowtime(showtime)
    }

    const movieId = searchParams.get("movieId")
    const showtimeId = searchParams.get("showtimeId")

    if (movieId === null) {
      throw Error("movieId is null.")
    }

    if (showtimeId === null) {
      throw Error("showtimeId is null.")
    }

    fetchMovie(+movieId)
    fetchShowtime(+showtimeId)
  }, [])

  const isUser = useAuth("user")
  return isUser && movie !== undefined && showtime !== undefined ? (
    <div className="min-h-screen bg-black flex flex-col">
      <HomeNavbar />
      <CheckoutBanner
        movieTitle={movie.title}
        showtimeDateTime={showtime.dateTime}
      />
      <div className="px-20 py-10 flex flex-col items-center gap-10">
        <div className="bg-neutral-500 h-96 w-full" />
        <div className="grid grid-cols-8 grid-rows-4 w-max gap-3">
          <Seat />
          <Seat />
          <div />
          <div />
          <div />
          <div />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat unavailable />
          <Seat unavailable />
          <Seat unavailable />
          <Seat />
          <Seat />
          <Seat />
          <div />
          <div />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <div />
          <div />
        </div>
        <div className="flex justify-between w-full">
          <Link
            href="/ticket-summary"
            className="border-[3px] text-white font-semibold w-max py-3 px-20 text-xl rounded-md scale-transition"
          >
            Back
          </Link>
          <Link
            href="/checkout-info"
            className="bg-jade text-white font-semibold w-max py-3 px-20 text-xl rounded-md scale-transition"
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen bg-black flex justify-center items-center">
      <h1 className="text-white text-3xl">
        WOMP WOMP, you are not authorized.
      </h1>
    </div>
  )
}

export default SeatsPage
