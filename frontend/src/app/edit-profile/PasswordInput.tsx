"use client"

import { Dispatch, SetStateAction, useRef } from "react"

type Props = {
  customerId: number | undefined
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function PasswordInput({
  customerId,
  setDialogOpen
}: Readonly<Props>) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const currentPasswordRef = useRef<HTMLInputElement | null>(null)
  const newPasswordRef = useRef<HTMLInputElement | null>(null)
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null)
  return (
    <>
      <button
        className="p-2 rounded-sm font-semibold bg-light-jade hover:scale-[1.015] transition-transform duration-300"
        onClick={() => {
          dialogRef.current?.showModal()
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
              ref={currentPasswordRef}
              className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
            />
            <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
              New Password
            </div>
            <input
              type="password"
              ref={newPasswordRef}
              className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
            />
            <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
              Confirm Password
            </div>
            <input
              type="password"
              ref={confirmPasswordRef}
              className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
            />
          </div>
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
                const currentPassword = currentPasswordRef.current?.value
                const newPassword = newPasswordRef.current?.value
                const confirmPassword = confirmPasswordRef.current?.value

                if (newPassword !== confirmPassword) {
                  alert(
                    "The new password does not match the confirmed password."
                  )
                  return
                }

                const checkResponse = await fetch(
                  `http://localhost:8080/api/customer/password/${customerId}/${currentPassword}`
                )
                const checkData = await checkResponse.text()
                if (checkData === "false") {
                  alert("Current password is incorrect.")
                  return
                }

                await fetch(
                  `http://localhost:8080/api/customer/change_password/${customerId}/${newPassword}`,
                  { method: "PUT" }
                )
                window.location.reload()
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
