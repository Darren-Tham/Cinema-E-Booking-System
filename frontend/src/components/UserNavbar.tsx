"use client"

import SearchIcon from "@public/search-icon.svg"
import ProfileIcon from "@public/profile-icon.svg"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { destroyCookie, hasCookie, getUser } from "@/lib/Auth"
import { useAuth } from "@/lib/useAuth"

export default function UserNavbar() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const isAdmin = useAuth("admin")
  useEffect(() => {
    const authenticate = async () => {
      const auth = await hasCookie()
      if (!auth) {
        return
      }
      setIsLoggedIn(auth)
      const data = await getUser()
      setDisplayName(data.user.firstName)
    }
    authenticate()
  }, [])
  return (
    <nav className="w-full p-4 flex justify-between px-10">
      <div className="flex gap-5 items-center">
        <Link
          href="/"
          className="font-bold text-[#2CC295] text-2xl scale-transition"
        >
          Cinema E-Booking System
        </Link>
        <div className="flex items-center bg-jade rounded-full p-2 ml-10">
          <label htmlFor="search">
            <Image src={SearchIcon} alt="Search Icon" width={30} />
          </label>
          <input
            id="search"
            placeholder="Search..."
            className="input rounded-full w-96 bg-transparent text-white placeholder:text-neutral-200"
            onKeyDown={e => {
              if (e.key !== "Enter") {
                return
              }
              let query = e.currentTarget.value.trim()
              if (query !== "") {
                router.push(`/search/${query}`)
              }
            }}
          />
        </div>
      </div>
      <div className="flex gap-3 items-center">
        {isLoggedIn ? (
          <>
            <Link href="/edit-profile" className="scale-transition">
              <Image src={ProfileIcon} alt="Profile" width={45} />
            </Link>
            <p className="text-[#2CC295] font-semibold text-lg mr-4">
              Hello, {displayName}
            </p>
            {isAdmin && (
              <Link href="/admin-view">
                <button className="back-button text-[#2CC295] border-[#2CC295]">Admin Portal</button>
              </Link>
            )}
            <button
              className="back-button text-[#2CC295] border-[#2CC295]"
              onClick={async () => {
                setIsLoggedIn(false)
                destroyCookie()
                setIsLoggedIn(await hasCookie())
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login/login-page" className="action-button">
              Login
            </Link>
            <Link
              href="/registration/registration-page"
              className="back-button"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
