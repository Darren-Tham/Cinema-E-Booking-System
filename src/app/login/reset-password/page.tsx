"use client"

import HomeNavbar from "@/components/HomeNavbar"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ResetPassword() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <HomeNavbar />
      <div className="grow grid place-items-center">
        <div className="bg-dark-jade rounded-sm p-8 w-96 flex flex-col gap-3 items-center">
          <h1 className="h1">Reset Password</h1>
          <p className="text-white text-center">
            A verification code has been sent to your associated email address.
            Enter the code below along with your new password.
          </p>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="verification-code" className="label">
              Verification Code
            </label>
            <input type="text" id="verification-code" className="input" />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input type="password" id="password" className="input" />
          </div>
          <button
            className="action-button w-full"
            onClick={() => router.push("./reset-password-confirmation")}
          >
            Reset Password
          </button>
          <div className="flex justify-center">
            <p className="p-redirection">Back To</p>
            <Link href="./login-page" className="link-redirection">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
