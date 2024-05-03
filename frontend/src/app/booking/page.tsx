"use client"

import HomeNavbar from "@/components/HomeNavbar"
import useCustomer from "@/hooks/useCustomer"
import APIFacade from "@/lib/APIFacade"
import { getCustomer } from "@/lib/Authentication"
import { ProfileBooking } from "@/lib/Types"
import { useEffect, useState } from "react"
import Booking from "./Booking"

const BookingPage = () => {
  const isCustomer = useCustomer()
  const [bookings, setBookings] = useState<ProfileBooking[]>([])

  useEffect(() => {
    const getBookings = async () => {
      const customer = await getCustomer()
      if (customer === undefined) {
        throw Error
      }
      const bookings = await APIFacade.getCustomerBookings(customer.id)
      setBookings(bookings)
    }
    getBookings()
  }, [])

  return (
    isCustomer && (
      <div className="min-h-screen flex flex-col items-center">
        <HomeNavbar />
        <div className="flex flex-col gap-10 p-10">
          <h1 className="text-white font-bold text-3xl text-center">Order History</h1>
          {bookings.map(booking => (
            <Booking key={booking.bookingId} booking={booking} />
          ))}
        </div>
      </div>
    )
  )
}

export default BookingPage
