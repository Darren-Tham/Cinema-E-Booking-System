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

const TAX_PERCENT = 0.07

const Checkout = () => {
  const isCustomer = useCustomer()
  const [movie, setMovie] = useState<Movie>()
  const [showtime, setShowtime] = useState<Showtime>()
  const [adultTicketCount, setAdultTicketCount] = useState(0)
  const [childTicketCount, setChildTicketCount] = useState(0)
  const [seniorTicketCount, setSeniorTicketCount] = useState(0)

  const [subtotal, setSubtotal] = useState(0)
  const [taxes, setTaxes] = useState(0)

  const pStyles = "text-white font-semibold text-xl"

  const handleNextClick = async () => {
    const transaction: Transaction = {
      adultTicketCount,
      childTicketCount,
      seniorTicketCount,
      taxes,
      subtotal,
      total: taxes + subtotal
    }
    await updateTransaction(transaction)
  }

  useEffect(() => {
    const fetchInformation = async () => {
      const transaction = await getTransaction()
      if (
        transaction === undefined ||
        transaction.movieId === undefined ||
        transaction.showtimeId === undefined
      ) {
        throw Error
      }

      const movie = await APIFacade.getMovieById(transaction.movieId)
      const showtime = await APIFacade.getShowtimeById(transaction.showtimeId)
      setMovie(movie)
      setShowtime(showtime)
    }
    fetchInformation()
  }, [])

  useEffect(() => {
    setTaxes(subtotal * TAX_PERCENT)
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
            <div className="grid grid-cols-3 grid-rows-3 w-max place-items-center h-max gap-12">
              <p className={pStyles}>Adult</p>
              <p className={pStyles}>${movie.adultTicketPrice.toFixed(2)}</p>
              <Counter
                onAdd={() => {
                  setSubtotal(subtotal + movie.adultTicketPrice)
                  setAdultTicketCount(adultTicketCount + 1)
                }}
                onMinus={() => {
                  setSubtotal(Math.abs(subtotal - movie.adultTicketPrice))
                  setAdultTicketCount(adultTicketCount - 1)
                }}
              />
              <p className={pStyles}>Child</p>
              <p className={pStyles}>${movie.childTicketPrice.toFixed(2)}</p>
              <Counter
                onAdd={() => {
                  setSubtotal(subtotal + movie.childTicketPrice)
                  setChildTicketCount(childTicketCount + 1)
                }}
                onMinus={() => {
                  setSubtotal(Math.abs(subtotal - movie.childTicketPrice))
                  setChildTicketCount(childTicketCount - 1)
                }}
              />
              <p className={pStyles}>Senior</p>
              <p className={pStyles}>${movie.seniorTicketPrice.toFixed(2)}</p>
              <Counter
                onAdd={() => {
                  setSubtotal(subtotal + movie.seniorTicketPrice)
                  setSeniorTicketCount(seniorTicketCount + 1)
                }}
                onMinus={() => {
                  setSubtotal(Math.abs(subtotal - movie.seniorTicketPrice))
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
                href={`/theaters-and-times?movieId=${movie.id}`}
                className="border-[3px] text-white py-3 px-20 font-semibold text-xl scale-transition"
              >
                Back
              </Link>
              <Link
                href="/seats"
                className="bg-jade text-white font-semibold w-max py-3 px-20 text-xl rounded-md scale-transition"
                onClick={handleNextClick}
              >
                Pick Seats
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Checkout
