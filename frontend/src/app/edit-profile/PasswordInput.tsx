"use client"

import APIFacade from "@/lib/APIFacade"
import FormHandler from "@/lib/FormHandler"
import { Customer, Email } from "@/lib/Types"
import { Dispatch, SetStateAction, useRef, useState } from "react"

type Props = {
  customer: Customer
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}

type Form = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const PasswordInput = ({ customer, setDialogOpen }: Readonly<Props>) => {
  const [form, setForm] = useState<Form>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const dialogRef = useRef<HTMLDialogElement>(null!)

  const passwordConfirmed = async () => {
    if (form.currentPassword === "") {
      alert("Current password cannot be empty.")
      return
    }

    if (form.newPassword === "") {
      alert("New password cannot be empty.")
      return false
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("The new password does not match the confirmed password.")
      return false
    }

    if (
      !(await APIFacade.customerPasswordIsValid(
        customer.id,
        form.currentPassword
      ))
    ) {
      alert("Current password is incorrect.")
      return false
    }

    return true
  }

  const changePassword = async () => {
    if (!(await passwordConfirmed())) return

    await APIFacade.updateCustomerPassword(customer.id, form.newPassword)
    const email: Email = {
      receiverEmail: customer.email,
      subject: "Cinema E-Booking System Password Update",
      text: 'The password of your account has been updated. If this was unexpected, please change your password through "Forgot Password" to protect your account.'
    }
    await APIFacade.sendEmail(email)

    window.location.reload()
  }

  return (
    <>
      <button
        className="p-2 rounded-sm font-semibold bg-light-jade hover:scale-[1.015] transition-transform duration-300"
        onClick={() => {
          dialogRef.current.showModal()
          setDialogOpen(true)
        }}
      >
        Change Password
      </button>
      <dialog
        ref={dialogRef}
        className="bg-transparent"
        onKeyDown={e => {
          if (e.key === "Escape") {
            return
          }
        }}
      >
        <div className="bg-dark-jade p-6 flex flex-col gap-3 rounded-md border-2">
          <h2 className="bg-light-jade font-bold text-center text-2xl py-3 px-20 rounded-sm">
            Add Home Address
          </h2>
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "repeat(2, auto)" }}
          >
            <div className="p-2 rounded-sm font-semibold bg-light-jade">
              Current Password
            </div>
            <input
              type="password"
              className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
              value={form.currentPassword}
              onChange={e =>
                FormHandler.updateForm(e, "currentPassword", form, setForm)
              }
            />
            <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
              New Password
            </div>
            <input
              type="password"
              className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
              value={form.newPassword}
              onChange={e =>
                FormHandler.updateForm(e, "newPassword", form, setForm)
              }
            />
            <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
              Confirm Password
            </div>
            <input
              type="password"
              className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
              value={form.confirmPassword}
              onChange={e =>
                FormHandler.updateForm(e, "confirmPassword", form, setForm)
              }
            />
          </div>
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
              onClick={changePassword}
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default PasswordInput
