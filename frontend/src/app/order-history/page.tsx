"use client"

import Image from "next/image"
import HomeNavbar from "@/components/HomeNavbar"
import useCustomer from "@/hooks/useCustomer"
import APIFacade from "@/lib/APIFacade"
import { getCustomer } from "@/lib/Authentication"
import { ProfileBooking } from "@/lib/Types"
import { useEffect, useState } from "react"
import FilterIcon from "@public/filter-icon.svg"
import Booking from "./Booking"

const enum Filter {
  LatestDate = "Latest Date",
  EarliestDate = "Earliest Date",
  HighestTotal = "Highest Total",
  LowestTotal = "Lowest Total",
  HighestBookingId = "Highest Booking Id",
  LowestBookingId = "Lowest Booking Id"
}

const OrderHistory = () => {
  const isCustomer = useCustomer()
  const [bookings, setBookings] = useState<ProfileBooking[]>([])

  useEffect(() => {
    const getBookings = async () => {
      const customer = await getCustomer()
      if (customer === undefined) {
        throw Error
      }
      const bookings = await APIFacade.getCustomerBookings(customer.id)
      setBookings(
        bookings.toSorted((a, b) => b.bookingDate.localeCompare(a.bookingDate))
      )
    }
    getBookings()
  }, [])

  return (
    isCustomer && (
      <div className="min-h-screen flex flex-col items-center">
        <HomeNavbar />
        <div className="flex flex-col gap-10 p-10">
          <h1 className="text-white font-bold text-3xl text-center">
            {bookings.length === 0 ? "No Orders" : "Order History"}
          </h1>
          <div className="text-white font-semibold flex items-center gap-1 bg-jade p-3 text-lg rounded-sm self-end">
            <Image src={FilterIcon} alt="Filter Icon" width={25} />
            <h1 className="text-emerald-100">Filter Movies</h1>
            <select
              className="ml-2 bg-light-jade p-2 text-sm rounded-sm"
              onClick={e => {
                switch (e.currentTarget.value) {
                  case Filter.LatestDate:
                    setBookings(
                      bookings.toSorted((a, b) =>
                        b.bookingDate.localeCompare(a.bookingDate)
                      )
                    )
                    break
                  case Filter.EarliestDate:
                    setBookings(
                      bookings.toSorted((a, b) =>
                        a.bookingDate.localeCompare(b.bookingDate)
                      )
                    )
                    break
                  case Filter.HighestTotal:
                    setBookings(bookings.toSorted((a, b) => b.total - a.total))
                    break
                  case Filter.LowestTotal:
                    setBookings(bookings.toSorted((a, b) => a.total - b.total))
                    break
                  case Filter.HighestBookingId:
                    setBookings(
                      bookings.toSorted((a, b) => b.bookingId - a.bookingId)
                    )
                    break
                  case Filter.LowestBookingId:
                    setBookings(
                      bookings.toSorted((a, b) => a.bookingId - b.bookingId)
                    )
                    break
                }
              }}
            >
              <option>{Filter.LatestDate}</option>
              <option>{Filter.EarliestDate}</option>
              <option>{Filter.HighestTotal}</option>
              <option>{Filter.LowestTotal}</option>
              <option>{Filter.HighestBookingId}</option>
              <option>{Filter.LowestBookingId}</option>
            </select>
          </div>
          {bookings.map(booking => (
            <Booking key={booking.bookingId} booking={booking} />
          ))}
        </div>
      </div>
    )
  )
}

export default OrderHistory
