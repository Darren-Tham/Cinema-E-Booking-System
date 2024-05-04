"use client"

import HomeNavbar from "@/components/HomeNavbar"
import Seat from "@/components/Seat"
import CheckoutBanner from "@/components/CheckoutBanner"
import Link from "next/link"
import { getTransaction, updateTransaction } from "@/lib/Authentication"
import APIFacade from "@/lib/APIFacade"
import { Movie, Showtime, Transaction } from "@/lib/Types"
import { useState, useEffect } from "react"
import useCustomer from "@/hooks/useCustomer"
import { useRouter } from "next/navigation"
import PageFacade from "@/lib/PageFacade"

const nonSeats = new Set(["A3", "A4", "A5", "A6", "E1", "E2", "E7", "E8"])

const SeatsPage = () => {
  const router = useRouter()
  const isCustomer = useCustomer()
  const [movie, setMovie] = useState<Movie>()
  const [showtime, setShowtime] = useState<Showtime>()
  const [seats, setSeats] = useState<string[]>([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchInformation = async () => {
      const transaction = await getTransaction()
      if (
        transaction?.movieId === undefined ||
        transaction.showtimeId === undefined ||
        transaction.adultTicketCount === undefined ||
        transaction.childTicketCount === undefined ||
        transaction.seniorTicketCount === undefined
      ) {
        throw Error
      }

      const movie = await APIFacade.getMovieById(transaction.movieId)
      const showtime = await APIFacade.getShowtimeById(transaction.showtimeId)
      setMovie(movie)
      setShowtime(showtime)
      setCount(
        transaction.adultTicketCount +
          transaction.childTicketCount +
          transaction.seniorTicketCount
      )
    }

    fetchInformation()
  }, [])

  const handleNextClick = async () => {
    if (seats.length !== count) {
      alert(`Please pick ${count} seats.`)
      return
    }

    const transaction: Transaction = { seats }
    await updateTransaction(transaction)
    router.push(PageFacade.CHECKOUT_INFORMATION)
  }

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
          elems.push(
            <Seat
              key={label}
              unavailable={showtime?.unavailableSeats.includes(label)}
              label={label}
              seats={seats}
              setSeats={setSeats}
            />
          )
        }
      }
    }

    return elems
  }

  return (
    isCustomer &&
    movie !== undefined &&
    showtime !== undefined && (
      <div className="min-h-screen bg-black flex flex-col">
        <HomeNavbar />
        <CheckoutBanner
          movieTitle={movie.title}
          showtimeDateTime={showtime.dateTime}
        />
        <div className="px-20 py-10 flex flex-col items-center gap-10">
          <div className="bg-neutral-500 h-96 w-full" />
          <h2 className="text-white font-semibold text-3xl">
            Please pick {count} seats.
          </h2>
          <div className="grid grid-cols-9 w-max gap-3 place-items-center">
            {renderRows()}
          </div>
          <div className="flex justify-between w-full">
            <Link
              href={PageFacade.TICKET_SUMMARY}
              className="border-[3px] text-white font-semibold w-max py-3 px-20 text-xl rounded-md scale-transition"
            >
              Back
            </Link>
            <button
              className="bg-jade text-white font-semibold w-max py-3 px-20 text-xl rounded-md scale-transition"
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default SeatsPage
