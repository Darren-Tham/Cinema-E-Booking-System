"use client"

import HomeNavbar from "@/components/HomeNavbar"
import APIFacade from "@/lib/APIFacade"
import {
  resendVerificationCode,
  sendAndSetNewVerificationCode
} from "@/lib/FetchCalls"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function ResetPassword() {
  const router = useRouter()
  const loadRef = useRef(false)
  const searchParams = useSearchParams()
  const param = searchParams.get("id")
  const [verificationCode, setVerificationCode] = useState("")
  const verificationCodeRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement>(null!)
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null)

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

  return loadRef.current ? (
    <div className="min-h-screen bg-black flex flex-col">
      <HomeNavbar />
      <div className="grow grid place-items-center">
        <div className="bg-dark-jade rounded-sm p-8 w-96 flex flex-col gap-3 items-center">
          <h1 className="h1">Reset Password</h1>
          <p className="text-white text-center font-semibold">
            A verification code has been sent to your associated email address.
            Enter the code below along with your new password.
          </p>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="verification-code" className="label">
              Verification Code *
            </label>
            <input
              type="text"
              id="verification-code"
              className="input"
              ref={verificationCodeRef}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="password" className="label">
              New Password *
            </label>
            <input
              type="password"
              id="password"
              className="input"
              ref={passwordRef}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="password" className="label">
              Confirm New Password *
            </label>
            <input
              type="password"
              id="password"
              className="input"
              ref={confirmPasswordRef}
            />
          </div>
          <p className="text-white self-start text-sm font-semibold">
            * Required Field
          </p>
          <button
            className="action-button w-full"
            onClick={async () => {
              const password = passwordRef.current.value
              if (
                verificationCodeRef.current?.value.trim() !== verificationCode
              ) {
                alert(
                  "The verification code is incorrect. Please try again or resend another verification code."
                )
              } else if (password === "") {
                alert("Password cannot be empty.")
              } else if (password !== confirmPasswordRef.current?.value) {
                alert("Passwords must match.")
              } else {
                await APIFacade.updateCustomerPassword(customerId, password)
                await fetch(
                  `http://localhost:8080/api/customer/change_password/${customerId}/${password}`,
                  {
                    method: "PUT"
                  }
                )
                router.push("./reset-password-confirmation")
              }
            }}
          >
            Reset Password
          </button>
          <button
            className="back-button w-full"
            onClick={async () =>
              await resendVerificationCode(customerId, setVerificationCode)
            }
          >
            Resend Verification
          </button>
          <div className="flex justify-center">
            <p className="p-redirection"></p>
            <Link href="./login-page" className="link-redirection">
              Back To Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
