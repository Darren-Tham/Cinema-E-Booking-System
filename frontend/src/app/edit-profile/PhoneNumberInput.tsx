"use client"

import Image from "next/image"
import PencilIcon from "@public/pencil-icon.svg"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Customer, Email } from "@/lib/Types"
import APIFacade from "@/lib/APIFacade"
import FormHandler from "@/lib/FormHandler"

type Props = {
  customer: Customer
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}

type Form = {
  phoneNumber: string
}

const PhoneNumberInput = ({ customer, setDialogOpen }: Readonly<Props>) => {
  const [form, setForm] = useState<Form>({
    phoneNumber: ""
  })
  const dialogRef = useRef<HTMLDialogElement>(null!)
  const [phoneNumber, setPhoneNumber] = useState("")

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      const phoneNumber = await APIFacade.getCustomerPhoneNumber(customer.id)
      setPhoneNumber(phoneNumber)
    }
    fetchPhoneNumber()
  }, [customer])

  const changePhoneNumber = async () => {
    if (form.phoneNumber === "") {
      alert("Phone number cannot be empty.")
      return
    }

    if (form.phoneNumber === phoneNumber) {
      alert(
        "The updated phone number should not be the same as the current phone number!"
      )
      return
    }

    await APIFacade.updateCustomerPhoneNumber(customer.id, form.phoneNumber)

    const email: Email = {
      receiverEmail: customer.email,
      subject: "Cinema E-Booking System Phone Number Update",
      text: "The phone number of your account has been updated. If this was unexpected, please change your password to protect your account."
    }
    await APIFacade.sendEmail(email)

    window.location.reload()
  }

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
          dialogRef.current.showModal()
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
            value={form.phoneNumber}
            onChange={e =>
              FormHandler.updateFormOnlyNumbers(e, "phoneNumber", form, setForm)
            }
          />
          <div className="grid grid-cols-2 gap-3">
            <button
              className="border-[3px] text-white font-bold p-2 hover:scale-[1.015] transition-transform duration-300"
              onClick={() => {
                dialogRef.current.close()
                setDialogOpen(false)
              }}
            >
              Close
            </button>
            <button
              className="bg-light-jade font-bold p-2 hover:scale-[1.015] transition-transform duration-300 rounded-sm"
              onClick={changePhoneNumber}
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default PhoneNumberInput
