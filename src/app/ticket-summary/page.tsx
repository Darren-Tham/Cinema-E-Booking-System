"use client"

import CheckoutBanner from "@/components/CheckoutBanner"
import Counter from "@/components/Counter"
import HomeNavbar from "@/components/HomeNavbar"
import Link from "next/link"
import { useEffect, useState } from "react"

const ADULT_COST = 12.75
const CHILD_COST = 10
const SENIOR_COST = 8.5
const TAX_PERCENT = 0.07

export default function Checkout() {
  const [subtotal, setSubtotal] = useState(0)
  const [taxes, setTaxes] = useState(0)

  useEffect(() => {
    setTaxes(subtotal * TAX_PERCENT)
  }, [subtotal])

  const pStyles = "text-white font-semibold text-xl"

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <HomeNavbar />
      <CheckoutBanner />
      <div className="grow p-12 grid place-items-center">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-3 grid-rows-3 w-max place-items-center h-max gap-12">
            <p className={pStyles}>Adult</p>
            <p className={pStyles}>${ADULT_COST.toFixed(2)}</p>
            <Counter
              onAdd={() => setSubtotal(subtotal + ADULT_COST)}
              onMinus={() => setSubtotal(subtotal - ADULT_COST)}
            />
            <p className={pStyles}>Child</p>
            <p className={pStyles}>${CHILD_COST.toFixed(2)}</p>
            <Counter
              onAdd={() => setSubtotal(subtotal + CHILD_COST)}
              onMinus={() => setSubtotal(subtotal - CHILD_COST)}
            />
            <p className={pStyles}>Senior</p>
            <p className={pStyles}>${SENIOR_COST.toFixed(2)}</p>
            <Counter
              onAdd={() => setSubtotal(subtotal + SENIOR_COST)}
              onMinus={() => setSubtotal(subtotal - SENIOR_COST)}
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
          <Link
            href="/seats"
            className="bg-jade text-white font-semibold w-max py-3 px-20 text-xl rounded-md self-end scale-transition"
          >
            Pick Seats
          </Link>
        </div>
      </div>
    </div>
  )
}
