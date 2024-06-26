"use client"

import HomeNavbar from "@/components/HomeNavbar"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import APIFacade from "@/lib/APIFacade"
import FormHandler from "@/lib/FormHandler"
import { createAdmin, createCustomer } from "@/lib/Authentication"
import PageFacade from "@/lib/PageFacade"

type Form = {
  email: string
  password: string
  rememberMe: boolean
  loginFailed: boolean
}

const Login = () => {
  const router = useRouter()
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
    rememberMe: false,
    loginFailed: false
  })

  const isValidForm = () => {
    if (form.email === "") {
      alert("Email cannot be empty.")
      return false
    }

    if (form.password === "") {
      alert("Password cannot be empty.")
      return false
    }

    return true
  }

  const adminLogin = async () => {
    const admin = await APIFacade.getAdmin(form.email, form.password)
    if (admin === undefined) return false
    await createAdmin(form.rememberMe)
    router.push(PageFacade.ADMIN_VIEW)
    return true
  }

  const customerLogin = async () => {
    const customer = await APIFacade.getCustomer(form.email, form.password)
    if (customer === undefined) {
      setForm({ ...form, loginFailed: true })
      return
    }

    if (customer.status === "INACTIVE") {
      router.push(PageFacade.registrationVerificationCode(customer.id))
    } else {
      createCustomer(customer, form.rememberMe)
      router.push(PageFacade.HOME)
    }
  }

  const handleFormSubmit = async () => {
    if (!isValidForm()) return
    if (!(await adminLogin())) {
      await customerLogin()
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <HomeNavbar />
      <div className="grow grid place-items-center">
        <div className="bg-dark-jade rounded-sm p-8 w-96 flex flex-col gap-3 items-center">
          <h1 className="h1">Welcome Back!</h1>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="label">
              Email *
            </label>
            <input
              type="text"
              id="email"
              className="input"
              value={form.email}
              onChange={e =>
                FormHandler.updateFormNoSpaces(e, "email", form, setForm)
              }
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="password" className="label">
              Password *
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
            <Link
              href={PageFacade.FORGOT_PASSWORD}
              className="text-bright-jade font-semibold w-max hover:scale-105 transition-transform duration-300"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex items-center w-full">
            <input
              id="remember-me"
              type="checkbox"
              className="w-4 h-4 rounded"
              onChange={e =>
                FormHandler.updateFormCheckbox(e, "rememberMe", form, setForm)
              }
            />
            <label
              htmlFor="remember-me"
              className="ml-1.5 text-sm font-medium text-white"
            >
              Remember Me
            </label>
          </div>
          <button
            className="action-button w-full shadow-md"
            onClick={handleFormSubmit}
          >
            Log In
          </button>
          <div className="flex justify-center">
            <p className="p-redirection">Don&apos;t Have An Account?</p>
            <Link
              href={PageFacade.REGISTRATION_PAGE}
              className="link-redirection"
            >
              Register Here
            </Link>
          </div>
          <p className="text-white font-semibold text-sm self-start">
            * Required Field
          </p>
          {form.loginFailed && (
            <div role="alert">
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Incorrect Credentials
              </div>
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>
                  Email or password credential is incorrect. Please try again.
                  If you do not have an account, please create a new account.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
