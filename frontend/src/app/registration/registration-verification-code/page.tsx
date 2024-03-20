"use client"

type Email = {
  receiverEmail: string
  verificationCode: string
}

import HomeNavbar from "@/components/HomeNavbar"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function RegistrationVerificationCode() {
  const [verificationCode, setVerificationCode] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const customerId = searchParams.get("id")
  const loadRef = useRef(false)

  useEffect(() => {
    if (loadRef.current) {
      sendAndSetNewVerificationCode()
    }

    return () => {
      loadRef.current = true
    }
  }, [])

  async function sendAndSetNewVerificationCode() {
    const code = generateVerificationCode()
    sendEmail(code)
    setVerificationCode(code)
  }

  async function getEmail() {
    const response = await fetch(
      `http://localhost:8080/api/customer/email/${customerId}`
    )
    return await response.text()
  }

  async function sendEmail(code: string) {
    const email: Email = {
      receiverEmail: await getEmail(),
      verificationCode: code
    } as const
    await fetch("http://localhost:8080/api/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(email)
    })
  }

  async function setStatusToActive() {
    await fetch(
      `http://localhost:8080/api/customer/set_active_status/${customerId}`,
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
              if (inputRef.current?.value.trim() !== verificationCode) {
                alert(
                  "The verification code is incorrect. Please try again or resend another verification code."
                )
                return
              }
              await setStatusToActive()
              router.push("./registration-confirmation")
            }}
          >
            Submit
          </button>
          <button
            className="back-button w-full"
            onClick={async () => {
              await sendAndSetNewVerificationCode()
              alert(
                "A new verification code has been sent to your associated email account. The previous verification code is now expired. Please enter the new verification code."
              )
            }}
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

function generateVerificationCode() {
  const randomNumber = Math.floor(Math.random() * 1_000_000)
  let verificationCode = randomNumber.toString()
  while (verificationCode.length < 6) {
    verificationCode = "0" + verificationCode
  }
  return verificationCode
}
