"use client"

import Counter from "@/components/Counter"
import HomeNavbar from "@/components/HomeNavbar"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "@/lib/useAuth"
import { useSearchParams } from "next/navigation"
import APIFacade from "@/lib/APIFacade"
import { Movie, Showtime } from "@/lib/Types"
import CheckoutBanner from "@/components/CheckoutBanner"
import UnauthorizedScreen from "@/components/UnauthorizedScreen"

const TAX_PERCENT = 0.07

const Checkout = () => {
  const [movie, setMovie] = useState<Movie>()
  const [showtime, setShowtime] = useState<Showtime>()
  const searchParams = useSearchParams()
  const isUser = useAuth("user")

  const [subtotal, setSubtotal] = useState(0)
  const [taxes, setTaxes] = useState(0)

  const pStyles = "text-white font-semibold text-xl"

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

  useEffect(() => {
    setTaxes(subtotal * TAX_PERCENT)
  }, [subtotal])

  return isUser && movie !== undefined && showtime !== undefined ? (
    <div className="min-h-screen bg-black flex flex-col">
      <HomeNavbar />
      <CheckoutBanner
        movieTitle={movie.title}
        showtimeDateTime={showtime.dateTime}
      />
      <div className="grow p-12 grid place-items-center">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-3 grid-rows-3 w-max place-items-center h-max gap-12">
            <p className={pStyles}>Adult</p>
            <p className={pStyles}>${movie.adultTicketPrice.toFixed(2)}</p>
            <Counter
              onAdd={() => setSubtotal(subtotal + movie.adultTicketPrice)}
              onMinus={() => setSubtotal(subtotal - movie.adultTicketPrice)}
            />
            <p className={pStyles}>Child</p>
            <p className={pStyles}>${movie.childTicketPrice.toFixed(2)}</p>
            <Counter
              onAdd={() => setSubtotal(subtotal + movie.childTicketPrice)}
              onMinus={() => setSubtotal(subtotal - movie.childTicketPrice)}
            />
            <p className={pStyles}>Senior</p>
            <p className={pStyles}>${movie.seniorTicketPrice.toFixed(2)}</p>
            <Counter
              onAdd={() => setSubtotal(subtotal + movie.seniorTicketPrice)}
              onMinus={() => setSubtotal(subtotal - movie.seniorTicketPrice)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 place-items-center self-end">
            <p className={pStyles}>Subtotal</p>
            <p className={pStyles}>${Math.abs(subtotal).toFixed(2)}</p>
            <p className={pStyles}>Taxes</p>
            <p className={pStyles}>${Math.abs(taxes).toFixed(2)}</p>
            <p className={pStyles}>Total</p>
            <p className={pStyles}>${Math.abs(subtotal + taxes).toFixed(2)}</p>
          </div>
          <div className="flex gap-10">
            <Link
              href="/theaters-and-times"
              className="border-[3px] text-white py-3 px-20 font-semibold text-xl scale-transition"
            >
              Back
            </Link>
            <Link
              href="/seats"
              className="bg-jade text-white font-semibold w-max py-3 px-20 text-xl rounded-md scale-transition"
            >
              Pick Seats
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <UnauthorizedScreen />
  )
}

export default Checkout
