"use client"

import HomeNavbar from "@/components/HomeNavbar"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ForgotPassword() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <HomeNavbar />
      <div className="grow grid place-items-center">
        <div className="bg-dark-jade rounded-sm p-8 w-96 flex flex-col gap-3 items-center">
          <h1 className="h1">Reset Password</h1>
          <p className="text-white text-center">
            Enter the email address or phone number associated with your
            account.
          </p>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="username" className="label">
              Email Address Or Phone Number
            </label>
            <input type="text" id="username" className="input" />
          </div>
          <button
            className="action-button w-full"
            onClick={() => router.push("/reset-password")}
          >
            Send Reset Code
          </button>
          <div className="flex justify-center">
            <p className="p-redirection">Back To</p>
            <Link href="/login" className="link-redirection">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
