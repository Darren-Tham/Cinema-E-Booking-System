"use client"

import HomeNavbar from "@/components/HomeNavbar"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { initialSetUp } from "../../../lib/Auth"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const [loginFailed, setLoginFailed] = useState(false)
  const [remember, setRemember] = useState(false)
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
              value={email}
              className="input"
              onChange={e => {
                const { value } = e.target
                if (!value.includes(" ")) {
                  setEmail(value)
                }
              }}
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
              ref={passwordRef}
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
              value=""
              className="w-4 h-4 rounded"
              checked={remember}
              onChange={e => {
                setRemember(e.target.checked)
                console.log(remember)
              }}
            />
            <label className="ml-1.5 text-sm font-medium text-white">
              Remember Me
            </label>
          </div>
          <button
            className="action-button w-full"
            onClick={async () => {
              const password = passwordRef.current?.value
              if (email === "") {
                alert("Email cannot be empty.")
                return
              }
              if (password === "") {
                alert("Password cannot be empty.")
                return
              }

              const adminResponse = await fetch(
                `http://localhost:8080/api/admin/login/${email}/${password}`
              )
              if (adminResponse.status == 200) {
                const adminData = await adminResponse.json()
                if (adminData.username == "admin") {
                  const setUpAdminData = {
                    id: 1,
                    firstName: "Admin",
                    lastName: "",
                    email: adminData.username,
                    phoneNumber: "",
                    status: "",
                    isSubscribedForPromotions: true
                  }
                  initialSetUp(setUpAdminData, remember)

                  router.push("/admin-view")
                }
              } else {
                const response = await fetch(
                  `http://localhost:8080/api/customers/login_credentials/${email}/${password}`
                )
                if (response.ok) {
                  const data = await response.json()
                  initialSetUp(data, remember) // Set Up Cookies Authentication
                  setLoginFailed(false)
                  router.push("/")
                } else {
                  setLoginFailed(true)
                }
              }
            }}
          >
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
