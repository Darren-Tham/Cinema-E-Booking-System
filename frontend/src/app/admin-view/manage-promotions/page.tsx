"use client"

import { useRef, useState } from "react"
import { useAuth } from "@/lib/useAuth"

type Promotion = {
  name: string
  discountCode: string
  discountPercentage: number
  startDate: string
  endDate: string
}

const ManagePromotions: React.FC = () => {
  const [discountPercentage, setDiscountPercentage] = useState(0)
  const nameRef = useRef<HTMLInputElement | null>(null)
  const discountCodeRef = useRef<HTMLInputElement | null>(null)
  const startDateRef = useRef<HTMLInputElement | null>(null)
  const endDateRef = useRef<HTMLInputElement | null>(null)
  const isAdmin = useAuth("admin")

  return isAdmin ? (
    <div className="flex bg-black min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md bg-teal-950 p-4 rounded-md shadow-lg">
        <h1 className="text-white text-2xl font-bold mb-4 text-center">
          Promotions
        </h1>
        <form
          className="space-y-4"
          onSubmit={async e => {
            e.preventDefault()
            if (
              nameRef.current === null ||
              discountCodeRef.current === null ||
              startDateRef.current === null ||
              endDateRef.current === null
            ) {
              return
            }

            if (nameRef.current.value === "") {
              alert("Name cannot be empty.")
              return
            }

            if (discountCodeRef.current.value === "") {
              alert("Discount code cannot be empty.")
              return
            }

            if (startDateRef.current.value === "") {
              alert("Start date cannot be empty.")
              return
            }

            if (endDateRef.current.value === "") {
              alert("End date cannot be empty.")
              return
            }

            if (
              new Date(endDateRef.current.value) <=
              new Date(startDateRef.current.value)
            ) {
              alert("End date must be after the start date.")
              return
            }

            const promotion: Promotion = {
              name: nameRef.current.value,
              discountCode: discountCodeRef.current.value,
              discountPercentage,
              startDate: startDateRef.current.value,
              endDate: endDateRef.current.value
            }

            // await fetch("http://localhost:8080/api/promotion/add", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json"
            //   },
            //   body: JSON.stringify(promotion)
            // })

            const response = await fetch(
              "http://localhost:8080/api/customer/subscribed_customers"
            )
            const data = await response.json()

            for (const receiverEmail of data) {
              await fetch("http://localhost:8080/api/email/profile", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  receiverEmail,
                  subject: `New Promotion: ${promotion.name}`,
                  text: `Use the code ${promotion.discountCode} to get ${
                    promotion.discountPercentage
                  }% off! Promotion starts on ${formatDate(
                    promotion.startDate
                  )}, and it ends on ${formatDate(promotion.endDate)}.`
                })
              })
            }
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-100 font-semibold">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 p-2 bg-bright-jade text-black rounded border border-gray-500 outline-none font-semibold"
              ref={nameRef}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="code" className="text-gray-100 font-semibold">
              Discount Code
            </label>
            <input
              id="code"
              type="text"
              className="mt-1 p-2 bg-bright-jade text-black rounded border border-gray-500 outline-none font-semibold"
              ref={discountCodeRef}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="discount" className="text-gray-100 font-semibold">
              Discount Percentage
            </label>
            <input
              id="discount"
              type="range"
              className="mt-1"
              value={discountPercentage}
              onChange={e => setDiscountPercentage(+e.target.value)}
              min="0"
              max="100"
            />
            <div className="flex justify-between text-white text-sm">
              <span className="font-semibold">0%</span>
              <span className="font-semibold">{discountPercentage}%</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 min-w-0">
              <label
                htmlFor="start-date"
                className="text-gray-100 font-semibold"
              >
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                className="w-full mt-1 p-2 bg-bright-jade text-black rounded border border-gray-500 outline-none font-semibold"
                ref={startDateRef}
              />
            </div>
            <div className="flex-1 min-w-0">
              <label htmlFor="end-date" className="text-gray-100 font-semibold">
                End Date
              </label>
              <input
                id="end-date"
                type="date"
                className="w-full mt-1 p-2 bg-bright-jade text-black rounded border border-gray-500 outline-none font-semibold"
                ref={endDateRef}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-light-jade text-white rounded hover:scale-[1.015] transition-transform duration-300 font-semibold"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className="h-screen bg-black flex justify-center items-center">
      <h1 className="text-white text-3xl">
        WOMP WOMP, you are not authorized.
      </h1>
    </div>
  )
}

export default ManagePromotions

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  })
}
