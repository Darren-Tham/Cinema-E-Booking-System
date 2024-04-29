"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import Image from "next/image"
import PencilIcon from "@public/pencil-icon.svg"
import APIFacade from "@/lib/APIFacade"
import { Email } from "@/lib/Types"

type Props = {
  customerId: number | undefined
  email: string | undefined
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function FirstNameInput({
  customerId,
  email,
  setDialogOpen
}: Readonly<Props>) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [firstName, setFirstName] = useState("")

  useEffect(() => {
    const fetchFirstName = async () => {
      if (customerId === undefined) return
      const firstName = await APIFacade.getCustomerFirstName(customerId)
      setFirstName(firstName)
    }

    fetchFirstName()
  }, [customerId])

  const updateFirstName = async () => {
    const updatedFirstName = inputRef.current?.value.trim()

    if (updatedFirstName === undefined) {
      throw Error("The updated first name is undefined.")
    }

    if (customerId === undefined) {
      throw Error("The customer's id is undefined.")
    }

    if (email === undefined) {
      throw Error("Customer's email is undefined.")
    }

    if (updatedFirstName === firstName) {
      alert(
        "The updated first name should not be the same as the current first name."
      )
      return
    }

    await APIFacade.updateCustomerFirstName(customerId, firstName)

    const emailDTO: Email = {
      receiverEmail: email,
      subject: "Cinema E-Booking System First Name Update",
      text: "The first name of your account has been updated. If this was unexpected, please change your password to protect your account."
    }
    await APIFacade.sendEmail(emailDTO)

    window.location.reload()
  }

  return (
    <>
      <div className="p-2 rounded-sm font-semibold bg-light-jade">
        First Name
      </div>
      <div className="p-2 rounded-sm font-semibold bg-emerald-50">
        {firstName}
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
            Edit First Name
          </h2>
          <input
            className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
            placeholder={`Enter updated first name...`}
            ref={inputRef}
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
              onClick={updateFirstName}
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
