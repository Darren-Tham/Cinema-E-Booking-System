"use client"
import AccountField from "@/components/AccountField"
import SearchIcon from "@public/search-icon.svg"
import ProfileIcon from "@public/profile-icon.svg"
import Image from "next/image"
import { useAuth } from "@/lib/useAuth"
export default function SuspendUser() {
  const isAdmin = useAuth("admin")

  return (
    isAdmin ? (
      <div className="flex flex-col bg-black h-screen align-center">
        <div className="flex flex-col p-2 bg-black items-center rounded gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-jade rounded-full p-2">
              <label htmlFor="search">
                <Image src={SearchIcon} alt="Search Icon" width={30} />
              </label>
              <input
                id="search"
                placeholder="Search User..."
                className="input rounded-full w-96 bg-transparent text-white placeholder:text-neutral-200"
              />
            </div>
          </div>
          <div className="flex columns-4 flex-row flex-wrap justify-center">
            <AccountField email="firstname12345@gmail.com" first="firstName" last="lastName" />
            <AccountField email="firstname12345@gmail.com" first="firstName" last="lastName" />
            <AccountField email="firstname12345@gmail.com" first="firstName" last="lastName" />
            <AccountField email="firstname12345@gmail.com" first="firstName" last="lastName" />
            <AccountField email="firstname12345@gmail.com" first="firstName" last="lastName" />
            <AccountField email="firstname12345@gmail.com" first="firstName" last="lastName" />
            <AccountField email="firstname12345@gmail.com" first="firstName" last="lastName" />

          </div>

        </div>
      </div>
    ) : (
      <div className="h-screen bg-black flex justify-center items-center">
        <h1 className="text-white text-3xl">WOMP WOMP, you are not authorized.</h1>
      </div>
    )
  )
}
