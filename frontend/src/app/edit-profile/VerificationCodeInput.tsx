"use client"

import { resendVerificationCode } from "@/lib/FetchCalls"
import { useEffect, useRef, useState } from "react"

type Props = {
  customerId: number | undefined
}

export default function VerificationCodeInput({ customerId }: Readonly<Props>) {
  const [verificationCode, setVerificationCode] = useState("")
  const [isActive, setIsActive] = useState(true)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    async function initStatus() {
      if (customerId === undefined) {
        return
      }
      const response = await fetch(
        `http://localhost:8080/api/customer/status/${customerId}`
      )
      setIsActive((await response.json()) === "ACTIVE")
    }
    initStatus()
  }, [customerId])

  return isActive ? (
    <></>
  ) : (
    <div className="flex flex-col gap-3 w-full items-center">
      <div className="p-2 rounded-sm font-semibold bg-light-jade text-center w-full">
        Account Verification
      </div>
      <p className="w-[26rem] bg-emerald-50 font-semibold p-2 rounded-sm text-center">
        Your account is not active. Please click on "Send Verification Code" and
        enter the code below to activate your account.
      </p>
      <button
        className="border-[3px] p-2 font-semibold text-white hover:scale-[1.015] transition-transform duration-300 w-full"
        onClick={async () => {
          if (customerId !== undefined) {
            await resendVerificationCode(customerId, setVerificationCode)
          }
        }}
      >
        Send Verification Code
      </button>
      <input
        className="bg-emerald-50 w-full p-2 outline-none font-semibold"
        placeholder="Enter verification code..."
        ref={inputRef}
      />
      <button
        className="p-2 rounded-sm font-semibold bg-light-jade w-full hover:scale-[1.015] transition-transform duration-300"
        onClick={async () => {
          if (inputRef.current?.value.trim() === verificationCode) {
            await fetch(
              `http://localhost:8080/api/customer/set_active_status/${customerId}`,
              {
                method: "PUT"
              }
            )
            window.location.reload()
          } else {
            alert(
              "The verification code is incorrect. Please try again or resend another verification code."
            )
          }
        }}
      >
        Submit
      </button>
    </div>
  )
}
