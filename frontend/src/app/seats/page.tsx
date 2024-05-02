"use client"

import HomeNavbar from "@/components/HomeNavbar"
import Seat from "@/components/Seat"
import CheckoutBanner from "@/components/CheckoutBanner"
import Link from "next/link"
import { useAuth } from "@/lib/useAuth"
import { updateTransaction } from "@/lib/Auth"
import APIFacade from "@/lib/APIFacade"
import { Movie, Showtime } from "@/lib/Types"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import UnauthorizedScreen from "@/components/UnauthorizedScreen"

const nonSeats = new Set(["A3", "A4", "A5", "A6", "E1", "E2", "E7", "E8"])

const SeatsPage = () => {
  const [movie, setMovie] = useState<Movie>()
  const [showtime, setShowtime] = useState<Showtime>()
  const [seats, setSeats] = useState<String[]>([])
  const searchParams = useSearchParams()

  const handleNextClick = async () => {
    updateTransaction({"seats" : seats})
  }

  const handleClick = (seat : string) => {
    if (seats.includes(seat)){
      setSeats(seats.filter(e => e !== seat ))
    }
    else setSeats([...seats,seat])
  }
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

  const renderLabel = (label: string | number) => (
    <div key={label} className="text-white font-semibold text-lg">
      {label}
    </div>
  )

  const renderRows = () => {
    const elems = []
    elems.push(<div key={0} />)

    for (let i = 1; i <= 8; i++) {
      elems.push(renderLabel(i))
    }

    for (let code = "A".charCodeAt(0); code <= "E".charCodeAt(0); code++) {
      const c = String.fromCharCode(code)
      elems.push(renderLabel(c))
      for (let i = 1; i <= 8; i++) {
        const label = c + i
        if (nonSeats.has(label)) {
          elems.push(<div key={label} />)
        } else {
          if (showtime?.unavailableSeats.includes(label)) {
            elems.push(
              <Seat
                key={label}
                unavailable={showtime?.unavailableSeats.includes(label)}
              />
            )
          } else {
            elems.push(
              <a onClick={() => handleClick(label)}>
              <Seat
                key={label}
                unavailable={showtime?.unavailableSeats.includes(label)}
              />
              </a>
            )
          }
          
        }
      }
    }

    return elems
  }

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
        <div className="grid grid-cols-9 w-max gap-3 place-items-center">
          {renderRows()}
        </div>
        <div className="flex justify-between w-full">
          <Link
            href={`/ticket-summary?movieId=${movie.id}&showtimeId=${showtime.id}`}
            className="border-[3px] text-white font-semibold w-max py-3 px-20 text-xl rounded-md scale-transition"
          >
            Back
          </Link>
          <Link
            href="/checkout-info"
            className="bg-jade text-white font-semibold w-max py-3 px-20 text-xl rounded-md scale-transition"
            onClick={handleNextClick}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <UnauthorizedScreen />
  )
}

export default SeatsPage
