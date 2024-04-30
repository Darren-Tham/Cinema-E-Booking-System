"use client"

import HomeNavbar from "@/components/HomeNavbar"
import APIFacade from "@/lib/APIFacade"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const ForgotPassword = () => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null!)

  const handleClick = async () => {
    const email = inputRef.current.value.trim()
    const customerId = await APIFacade.getCustomerIdByEmail(email)
    if (customerId === undefined) {
      alert(
        "The email inputted is not associated with any account in our system. Please enter a new email address or create a new account."
      )
    } else {
      router.push(`./reset-password?id=${customerId}`)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <HomeNavbar />
      <div className="grow grid place-items-center">
        <div className="bg-dark-jade rounded-sm p-8 w-96 flex flex-col gap-3 items-center">
          <h1 className="h1">Reset Password</h1>
          <p className="text-white text-center font-semibold">
            Enter the email address associated with your account.
          </p>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="username" className="label">
              Email Address
            </label>
            <input type="text" id="username" className="input" ref={inputRef} />
          </div>
          <button className="action-button w-full" onClick={handleClick}>
            Send Reset Code
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
  )
}

export default ForgotPassword
