"use client"

import HomeNavbar from "@/components/HomeNavbar"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
  resendVerificationCode,
  sendAndSetNewVerificationCode
} from "@/lib/FetchCalls"

export default function RegistrationVerificationCode() {
  const [verificationCode, setVerificationCode] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const param = searchParams.get("id")
  const loadRef = useRef(false)

  if (param === null) {
    throw Error("customerId should not be null.")
  }
  const customerId = parseInt(param)

  useEffect(() => {
    if (loadRef.current) {
      sendAndSetNewVerificationCode(customerId, setVerificationCode)
    }

    return () => {
      loadRef.current = true
    }
  }, [])

  async function setStatusToActive() {
    await fetch(
      `http://localhost:8080/api/customers/set_active_status/${customerId}`,
      {
        method: "PUT"
      }
    )
  }

  return loadRef.current ? (
    <div className="min-h-screen bg-black flex flex-col">
      <HomeNavbar />
      <div className="grow grid place-items-center">
        <div className="bg-dark-jade p-5 flex flex-col rounded-sm w-96 text-center">
          <p className="text-white font-semibold text-lg mb-7">
            A verification code is sent to your email. Please enter the code
            below to verify your account.
          </p>
          <input
            type="text"
            className="rounded-sm font-semibold outline-none p-[0.375rem] w-full mb-3"
            ref={inputRef}
          />
          <button
            className="bg-jade text-white w-full font-bold px-4 py-2 rounded-sm hover:scale-105 transition-transform duration-300 mb-1"
            onClick={async () => {
              if (inputRef.current?.value.trim() === verificationCode) {
                await setStatusToActive()
                router.push("./registration-confirmation")
              } else {
                alert(
                  "The verification code is incorrect. Please try again or resend another verification code."
                )
              }
            }}
          >
            Submit
          </button>
          <button
            className="back-button w-full"
            onClick={async () =>
              await resendVerificationCode(customerId, setVerificationCode)
            }
          >
            Resend Verification Code
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
