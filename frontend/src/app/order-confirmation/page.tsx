"use client"
import Image from "next/image"
import HomeNavbar from "@/components/HomeNavbar"
import useCustomer from "@/hooks/useCustomer"
import { useEffect, useState } from "react"
import { getTransaction } from "@/lib/Authentication"
import APIFacade from "@/lib/APIFacade"
import { ProfileBooking, Ticket } from "@/lib/Types"

const OrderConfirmation = () => {
  const isCustomer = useCustomer()
  const [booking, setBooking] = useState<ProfileBooking>()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const pStyles = "text-xl font-semibold text-white"

  useEffect(() => {
    const getInformation = async () => {
      const transaction = await getTransaction()

      if (transaction?.bookingId === undefined) {
        throw Error
      }

      const booking = await APIFacade.getBookingById(transaction.bookingId)
      const tickets = await APIFacade.getTicketsByBookingId(
        transaction.bookingId
      )
      console.log(booking)
      setBooking(booking)
      setTickets(tickets)
    }
    getInformation()
  }, [])

  const formatExpirationDate = (expirationDate: string) => {
    const [year, month] = expirationDate.split("-")
    return `${month}/${year}`
  }

  return (
    isCustomer &&
    booking !== undefined && (
      <div className="min-h-screen flex flex-col pb-8">
        <HomeNavbar />
        <h1 className="text-4xl text-center font-bold text-white pt-10 pb-20">
          Thank you for your order!
        </h1>
        <div className="flex gap-20 grow justify-center">
          <Image
            className="p-2 rounded-sm h-max bg-light-jade"
            src={booking.movieImageLink}
            alt="Movie Poster"
            width={250}
            height={0}
          />
          <div className="flex flex-col gap-4">
            <div>
              <p className={pStyles}>
                <b>Booking Id:</b> {booking.bookingId}
              </p>
              <p className={pStyles}>
                <b>Booking Date:</b>{" "}
                {new Date(
                  booking.bookingDate.replace(" ", "T")
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}
              </p>
              <p className={pStyles}>
                <b>Movie:</b> {booking.movieTitle}
              </p>
              <p className={pStyles}>
                <b>Date:</b>{" "}
                {new Date(
                  booking.dateTime.replace(" ", "T")
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                  hour: "numeric",
                  minute: "numeric"
                })}
              </p>
              <p className={pStyles}>
                <b>Location:</b> UGA Theatre
              </p>
              <p className={pStyles}>
                <b>Seats:</b> {booking.seats.join(", ")}
              </p>
              <p className={pStyles}>
                <b>Total:</b> ${booking.total.toFixed(2)}
              </p>
            </div>
            <div className="bg-light-jade grid grid-cols-2 rounded p-3 w-max gap-x-10">
              <p className="font-semibold text-lg">Card Type</p>
              <p>{booking.cardType}</p>
              <p className="font-semibold text-lg">Card Number</p>
              <p>Ending in {booking.lastFourDigits}</p>
              <p className="font-semibold text-lg">Expiration Date</p>
              <p>{formatExpirationDate(booking.expirationDate)}</p>
              <p className="font-semibold text-lg">Billing Address</p>
              <p>{booking.billingAddress}</p>
            </div>

            <div className="flex flex-col gap-4">
              {tickets.map(ticket => (
                <div
                  key={ticket.ticketId}
                  className="bg-jade grid grid-cols-2 rounded p-3 w-max gap-x-10"
                >
                  <p className="text-white text-lg font-semibold">Ticket Id</p>
                  <p className="text-white">{ticket.ticketId}</p>
                  <p className="text-white text-lg font-semibold">
                    Ticket Type
                  </p>
                  <p className="text-white">{ticket.ticketType}</p>
                  <p className="text-white text-lg font-semibold">Price</p>
                  <p className="text-white">${ticket.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default OrderConfirmation
