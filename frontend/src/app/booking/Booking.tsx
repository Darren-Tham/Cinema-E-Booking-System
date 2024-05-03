"use client"

import APIFacade from "@/lib/APIFacade"
import { ProfileBooking, Ticket } from "@/lib/Types"
import { useEffect, useState } from "react"

type Props = {
  booking: ProfileBooking
}

const Booking = ({ booking }: Readonly<Props>) => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const headerStyles = "text-2xl text-white font-bold text-center"
  const pHeaderStyles = "text-lg text-white font-semibold"
  const pStyles = "text-white"

  useEffect(() => {
    const fetchTickets = async () => {
      const tickets = await APIFacade.getTicketsByBookingId(booking.bookingId)
      setTickets(tickets)
    }
    fetchTickets()
  }, [])

  const formatExpirationDate = (expirationDate: string) => {
    const [year, month] = expirationDate.split("-")
    return `${month}/${year}`
  }

  return (
    <div className="bg-dark-jade w-max p-8 rounded flex flex-col gap-6">
      <h2 className={headerStyles}>Booking Information</h2>
      <div className="grid grid-cols-2">
        <p className={pHeaderStyles}>Booking Id</p>
        <p className={pStyles}>{booking.bookingId}</p>
        <p className={pHeaderStyles}>Movie</p>
        <p className={pStyles}>{booking.movieTitle}</p>
        <p className={pHeaderStyles}>Date</p>
        <p className={pStyles}>
          {new Date(booking.dateTime.replace(" ", "T")).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
              hour: "numeric",
              minute: "numeric"
            }
          )}
        </p>
        <p className={pHeaderStyles}>Location</p>
        <p className={pStyles}>UGA Theatre</p>
        <p className={pHeaderStyles}>Seats</p>
        <p className={pStyles}>{booking.seats.join(", ")}</p>
        <p className={pHeaderStyles}>Total</p>
        <p className={pStyles}>{booking.total}</p>
      </div>
      <h2 className={headerStyles}>Card Information</h2>
      <div className="grid grid-cols-2">
        <p className={pHeaderStyles}>Card Type</p>
        <p className={pStyles}>{booking.cardType}</p>
        <p className={pHeaderStyles}>Card Number</p>
        <p className={pStyles}>Ending in {booking.lastFourDigits}</p>
        <p className={pHeaderStyles}>Expiration Date</p>
        <p className={pStyles}>
          {formatExpirationDate(booking.expirationDate)}
        </p>
        <p className={pHeaderStyles}>Billing Address</p>
        <p className={pStyles}>{booking.billingAddress} </p>
      </div>
      <h2 className={headerStyles}>Tickets</h2>
      <div className="grid grid-cols-2 gap-4">
        {tickets.map(ticket => (
          <div
            key={ticket.ticketId}
            className="grid grid-cols-2 bg-jade p-3 rounded w-max gap-x-10 shadow-md"
          >
            <p className={pHeaderStyles}>Ticket Id</p>
            <p className={pStyles}>{ticket.ticketId}</p>
            <p className={pHeaderStyles}>Ticket Type</p>
            <p className={pStyles}>{ticket.ticketType}</p>
            <p className={pHeaderStyles}>Price</p>
            <p className={pStyles}>{ticket.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Booking
