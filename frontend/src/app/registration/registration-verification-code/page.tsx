"use client"

import HomeNavbar from "@/components/HomeNavbar"
import APIFacade from "@/lib/APIFacade"
import FormHandler from "@/lib/FormHandler"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

type Form = {
  customerId: number
  verificationCode: string
}

const RegistrationVerificationCode = () => {
  const [form, setForm] = useState<Form>({
    customerId: -1,
    verificationCode: ""
  })
  const [verificationCode, setVerificationCode] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const loadRef = useRef(false)

  useEffect(() => {
    if (loadRef.current) {
      const param = searchParams.get("id")
      if (param === null) {
        throw Error("customerId should exist.")
      }
      const customerId = +param
      setForm({ ...form, customerId })
      APIFacade.sendAndSetNewVerificationCode(customerId, setVerificationCode)
    }

    return () => {
      loadRef.current = true
    }
  }, [])

  const handleFormSubmit = async () => {
    if (form.verificationCode !== verificationCode) {
      alert(
        "The verification code is incorrect. Please try again or resend another verification code."
      )
      return
    }

    await APIFacade.updateCustomerStatusToActive(form.customerId)
    router.push("./registration-confirmation")
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
            value={form.verificationCode}
            onChange={e =>
              FormHandler.updateForm(e, "verificationCode", form, setForm)
            }
          />
          <button
            className="bg-jade text-white w-full font-bold px-4 py-2 rounded-sm hover:scale-105 transition-transform duration-300 mb-1"
            onClick={handleFormSubmit}
          >
            Submit
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
            Resend Verification Code
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default RegistrationVerificationCode
