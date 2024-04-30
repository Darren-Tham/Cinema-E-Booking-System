"use client"

import HomeNavbar from "@/components/HomeNavbar"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, useRef, useState } from "react"
import { initialSetUp } from "../../../lib/Auth"
import APIFacade from "@/lib/APIFacade"
import { Customer } from "@/lib/Types"

type Form = {
  email: string
  password: string
  rememberMe: boolean
}

const Login = () => {
  const router = useRouter()
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
    rememberMe: false
  })
  const [email, setEmail] = useState("")
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const [loginFailed, setLoginFailed] = useState(false)
  const [remember, setRemember] = useState(false)

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: email } = e.target
    if (email.includes(" ")) return
    setForm({ ...form, email })
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, password: e.target.value })
  }

  const handleRememberMe = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, rememberMe: e.target.checked })
  }

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
    if (admin === undefined) return
    const user: Customer = {
      id: admin.id,
      firstName: "",
      lastName: "",
      email: admin.username,
      phoneNumber: "",
      status: "",
      isSubscribedForPromotions: false
    }
    initialSetUp(user, form.rememberMe)
    router.push("/admin-view")
  }

  const customerLogin = async () => {
    const customer = await APIFacade.getCustomer(form.email, form.password)
    if (customer === undefined) {
      setLoginFailed(true)
      return
    }
    initialSetUp(customer, form.rememberMe)
    router.push("/")
  }

  const handleFormSubmit = async () => {
    if (!isValidForm()) return
    adminLogin()
    customerLogin()
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
              value={form.email}
              className="input"
              onChange={handleEmailChange}
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
              onChange={handlePasswordChange}
            />
            <Link
              href="./forgot-password"
              className="text-bright-jade font-semibold w-max hover:scale-105 transition-transform duration-300"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex items-center w-full">
            <input
              type="checkbox"
              className="w-4 h-4 rounded"
              onChange={handleRememberMe}
            />
            <label className="ml-1.5 text-sm font-medium text-white">
              Remember Me
            </label>
          </div>
          <button className="action-button w-full" onClick={handleFormSubmit}>
            Log In
          </button>
          <div className="flex justify-center">
            <p className="p-redirection">Don&apos;t Have An Account?</p>
            <Link
              href="/registration/registration-page"
              className="link-redirection"
            >
              Register Here
            </Link>
          </div>
          <p className="text-white font-semibold text-sm self-start">
            * Required Field
          </p>
          {loginFailed && (
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
