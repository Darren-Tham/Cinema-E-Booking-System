"use client"

import HomeNavbar from "@/components/HomeNavbar"
import APIFacade from "@/lib/APIFacade"
import FormHandler from "@/lib/FormHandler"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useRef, useState } from "react"

type Form = {
  customerId: number
  verificationCode: string
  password: string
  confirmPassword: string
}

export default function ResetPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [verificationCode, setVerificationCode] = useState("")
  const [form, setForm] = useState<Form>({
    customerId: -1,
    verificationCode: "",
    password: "",
    confirmPassword: ""
  })
  const loadRef = useRef(false)

  useEffect(() => {
    if (loadRef.current) {
      const param = searchParams.get("id")
      if (param === null) {
        throw Error("customerId is null.")
      }
      const customerId = +param
      setForm({ ...form, customerId })
      APIFacade.sendAndSetNewVerificationCode(customerId, setVerificationCode)
    }

    return () => {
      loadRef.current = true
    }
  }, [])

  const isValidForm = () => {
    if (verificationCode !== form.verificationCode) {
      alert(
        "The verification code is incorrect. Please try again or resend another verification code."
      )
      return false
    }

    if (form.password === "") {
      alert("Password cannot be empty.")
      return false
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords must match.")
      return false
    }

    return true
  }

  const handleResetPassword = async () => {
    if (!isValidForm()) return
    await APIFacade.updateCustomerPassword(form.customerId, form.password)
    router.push("./reset-password-confirmation")
  }

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
              value={form.verificationCode}
              onChange={e =>
                FormHandler.updateForm(e, "verificationCode", form, setForm)
              }
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
              value={form.password}
              onChange={e =>
                FormHandler.updateForm(e, "password", form, setForm)
              }
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
              value={form.confirmPassword}
              onChange={e =>
                FormHandler.updateForm(e, "confirmPassword", form, setForm)
              }
            />
          </div>
          <p className="text-white self-start text-sm font-semibold">
            * Required Field
          </p>
          <button
            className="action-button w-full"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
          <button
            className="back-button w-full"
            onClick={async () =>
              await APIFacade.resendVerificationCode(
                form.customerId,
                setVerificationCode
              )
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
