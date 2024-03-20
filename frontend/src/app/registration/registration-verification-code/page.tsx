"use client"

import HomeNavbar from "@/components/HomeNavbar"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function RegistrationVerificationCode() {
  const [load, setLoad] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const customerId = searchParams.get("id")

  useEffect(() => {
    async function getVerificationCode() {
      const response = await fetch(
        `http://localhost:8080/api/verification_code/${customerId}`
      )
      const data = await response.text()
      setVerificationCode(data)
    }
    getVerificationCode()
    setLoad(true)
  }, [])

  return load ? (
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
            onClick={() => {
              if (inputRef.current?.value.trim() !== verificationCode) {
                alert(
                  "The verification code is incorrect. Please try again or resend another verification code."
                )
                return
              }
              router.push("./registration-confirmation")
            }}
          >
            Submit
          </button>
          <button className="back-button w-full">
            Resend Verification Code
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
