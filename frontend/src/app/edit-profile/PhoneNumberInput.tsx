"use client"

import Image from "next/image"
import PencilIcon from "@public/pencil-icon.svg"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

type Props = {
  customerId: number | undefined
  email: string | undefined
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function PhoneNumberInput({
  customerId,
  email,
  setDialogOpen
}: Readonly<Props>) {
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState("")
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")

  useEffect(() => {
    async function initPhoneNumber() {
      if (customerId === undefined) {
        return
      }
      const response = await fetch(
        `http://localhost:8080/api/customer/phone_number/${customerId}`
      )
      setPhoneNumber(await response.text())
    }
    initPhoneNumber()
  }, [customerId])

  return (
    <>
      <div className="p-2 rounded-sm font-semibold bg-light-jade">
        Phone Number
      </div>
      <div className="p-2 rounded-sm font-semibold bg-emerald-50">
        {phoneNumber}
      </div>
      <button
        className="self-center scale-transition w-max"
        onClick={() => {
          dialogRef.current?.showModal()
          setDialogOpen(true)
        }}
      >
        <Image src={PencilIcon} alt="Edit Icon" width={30} />
      </button>
      <dialog
        ref={dialogRef}
        className="bg-transparent"
        onKeyDown={e => {
          if (e.key === "Escape") {
            e.preventDefault()
          }
        }}
      >
        <div className="bg-dark-jade p-6 flex flex-col gap-3 rounded-md border-2">
          <h2 className="bg-light-jade font-bold text-center text-2xl py-3 px-20 rounded-sm">
            Edit Phone Number
          </h2>
          <input
            className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
            placeholder="Enter updated phone number..."
            value={updatedPhoneNumber}
            onChange={e => {
              const { value } = e.target
              if (/^\d*$/.test(value)) {
                setUpdatedPhoneNumber(value)
              }
            }}
          />
          <div className="grid grid-cols-2 gap-3">
            <button
              className="border-[3px] text-white font-bold p-2 hover:scale-[1.015] transition-transform duration-300"
              onClick={() => {
                dialogRef.current?.close()
                setDialogOpen(false)
              }}
            >
              Close
            </button>
            <button
              className="bg-light-jade font-bold p-2 hover:scale-[1.015] transition-transform duration-300 rounded-sm"
              onClick={async () => {
                if (updatedPhoneNumber === phoneNumber) {
                  alert(
                    "The updated phone number is the same as the current first name!"
                  )
                } else {
                  await fetch(
                    `http://localhost:8080/api/customer/change_phone_number/${customerId}/${updatedPhoneNumber}`,
                    { method: "PUT" }
                  )
                  await fetch("http://localhost:8080/api/email/profile", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      receiverEmail: email,
                      subject: "Cinema E-Booking System Phone Number Update",
                      text: "The phone number of your account has been updated. If this was unexpected, please change your password to protect your account."
                    })
                  })
                  window.location.reload()
                }
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
