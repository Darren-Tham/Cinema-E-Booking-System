"use client"

import Counter from "@/components/Counter"
import HomeNavbar from "@/components/HomeNavbar"
import Link from "next/link"
import { useEffect, useState } from "react"
import APIFacade from "@/lib/APIFacade"
import { Movie, Showtime, Transaction } from "@/lib/Types"
import CheckoutBanner from "@/components/CheckoutBanner"
import { getTransaction, updateTransaction } from "@/lib/Authentication"
import useCustomer from "@/hooks/useCustomer"
import { useRouter } from "next/navigation"
import PageFacade from "@/lib/PageFacade"

const TAX_PERCENT = 0.07

const Checkout = () => {
  const router = useRouter()
  const isCustomer = useCustomer()
  const [movie, setMovie] = useState<Movie>()
  const [showtime, setShowtime] = useState<Showtime>()
  const [adultTicketCount, setAdultTicketCount] = useState(0)
  const [childTicketCount, setChildTicketCount] = useState(0)
  const [seniorTicketCount, setSeniorTicketCount] = useState(0)
  const [availableSeats, setAvailableSeats] = useState(0)

  const [subtotal, setSubtotal] = useState(0)
  const [taxes, setTaxes] = useState(0)

  const pStyles = "text-white font-semibold text-xl"

  const handleNextClick = async () => {
    if (showtime === undefined) {
      throw Error
    }

    const totalTicket = adultTicketCount + childTicketCount + seniorTicketCount
    if (totalTicket === 0) {
      alert("There must be at least one ticket.")
      return
    }

    if (
      movie?.ratingCode === "R" &&
      childTicketCount > 0 &&
      adultTicketCount + seniorTicketCount === 0
    ) {
      alert("Children cannot watch a rated R movie without adult guidance.")
      return
    }

    if (totalTicket > availableSeats) {
      alert(`There are not enough available seats for ${totalTicket} people.`)
      return
    }

    const transaction: Transaction = {
      adultTicketCount,
      childTicketCount,
      seniorTicketCount,
      taxes,
      subtotal,
      total: +(taxes + subtotal).toFixed(2)
    }
    await updateTransaction(transaction)
    router.push(PageFacade.SEATS)
  }

  useEffect(() => {
    const fetchInformation = async () => {
      const transaction = await getTransaction()
      if (
        transaction?.movieId === undefined ||
        transaction.showtimeId === undefined
      ) {
        throw Error
      }

      const movie = await APIFacade.getMovieById(transaction.movieId)
      const showtime = await APIFacade.getShowtimeById(transaction.showtimeId)
      setMovie(movie)
      setShowtime(showtime)
      setAvailableSeats(32 - showtime.unavailableSeats.length)
    }
    fetchInformation()
  }, [])

  useEffect(() => {
    setTaxes(+(subtotal * TAX_PERCENT).toFixed(2))
  }, [subtotal])

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
        <div className="grow p-12 grid place-items-center">
          <div className="flex flex-col gap-6">
            <h2 className="text-white font-semibold text-lg">
              There are {availableSeats} available seats.
            </h2>
            <div className="grid grid-cols-3 grid-rows-3 w-max place-items-center h-max gap-12">
              <p className={pStyles}>Adult</p>
              <p className={pStyles}>${movie.adultTicketPrice.toFixed(2)}</p>
              <Counter
                onAdd={() => {
                  setSubtotal(+(subtotal + movie.adultTicketPrice).toFixed(2))
                  setAdultTicketCount(adultTicketCount + 1)
                }}
                onMinus={() => {
                  setSubtotal(+(subtotal - movie.adultTicketPrice).toFixed(2))
                  setAdultTicketCount(adultTicketCount - 1)
                }}
              />
              <p className={pStyles}>Child</p>
              <p className={pStyles}>${movie.childTicketPrice.toFixed(2)}</p>
              <Counter
                onAdd={() => {
                  setSubtotal(+(subtotal + movie.childTicketPrice).toFixed(2))
                  setChildTicketCount(childTicketCount + 1)
                }}
                onMinus={() => {
                  setSubtotal(+(subtotal - movie.childTicketPrice).toFixed(2))
                  setChildTicketCount(childTicketCount - 1)
                }}
              />
              <p className={pStyles}>Senior</p>
              <p className={pStyles}>${movie.seniorTicketPrice.toFixed(2)}</p>
              <Counter
                onAdd={() => {
                  setSubtotal(+(subtotal + movie.seniorTicketPrice).toFixed(2))
                  setSeniorTicketCount(seniorTicketCount + 1)
                }}
                onMinus={() => {
                  setSubtotal(+(subtotal - movie.seniorTicketPrice).toFixed(2))
                  setSeniorTicketCount(seniorTicketCount - 1)
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 place-items-center self-end">
              <p className={pStyles}>Subtotal</p>
              <p className={pStyles}>${subtotal.toFixed(2)}</p>
              <p className={pStyles}>Taxes</p>
              <p className={pStyles}>${taxes.toFixed(2)}</p>
              <p className={pStyles}>Total</p>
              <p className={pStyles}>${(subtotal + taxes).toFixed(2)}</p>
            </div>
            <div className="flex gap-10">
              <Link
                href={PageFacade.movieShowtime(movie.id)}
                className="border-[3px] text-white py-3 px-20 font-semibold text-xl scale-transition"
              >
                Back
              </Link>
              <button
                className="bg-jade text-white font-semibold w-max py-3 px-20 text-xl rounded-md scale-transition"
                onClick={handleNextClick}
              >
                Pick Seats
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Checkout
