"use client"

import SearchIcon from "@public/search-icon.svg"
import ProfileIcon from "@public/profile-icon.svg"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { destroyCustomer, getCustomer } from "@/lib/Authentication"
import PageFacade from "@/lib/PageFacade"

const UserNavbar = () => {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [displayName, setDisplayName] = useState("")

  useEffect(() => {
    const authenticate = async () => {
      const customer = await getCustomer()
      if (customer === undefined) return

      setIsLoggedIn(true)
      if (customer.email === "admin") {
        setDisplayName("Admin")
        setIsAdmin(true)
      } else {
        setDisplayName(customer.firstName)
      }
    }
    authenticate()
  }, [])
  return (
    <nav className="w-full p-4 flex justify-between px-10">
      <div className="flex gap-5 items-center">
        <Link
          href={PageFacade.HOME}
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
                router.push(PageFacade.search(query))
              }
            }}
          />
        </div>
      </div>
      <div className="flex gap-3 items-center">
        {isLoggedIn ? (
          <>
            <Link href={PageFacade.EDIT_PROFILE} className="scale-transition">
              <Image src={ProfileIcon} alt="Profile" width={45} />
            </Link>
            <p className="text-[#2CC295] font-semibold text-lg mr-4">
              Hello, {displayName}
            </p>
            {isAdmin && (
              <Link href={PageFacade.ADMIN_VIEW}>
                <button className="back-button text-[#2CC295] border-[#2CC295]">
                  Admin Portal
                </button>
              </Link>
            )}
            {!isAdmin && (
              <Link
                href={PageFacade.ORDER_HISTORY}
                className="action-button border-[3px]"
              >
                Order History
              </Link>
            )}
            <button
              className="back-button text-[#2CC295] border-[#2CC295]"
              onClick={async () => {
                setIsLoggedIn(false)
                await destroyCustomer()
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href={PageFacade.LOGIN_PAGE}
              className="action-button border-[3px]"
            >
              Login
            </Link>
            <Link href={PageFacade.REGISTRATION_PAGE} className="back-button">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default UserNavbar
