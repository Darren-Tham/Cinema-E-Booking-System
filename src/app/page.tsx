"use client"

import Image from "next/image"
import SearchIcon from "@public/search-icon.svg"
import Link from "next/link"
import MovieBanner from "@public/movie-banner.png"

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <nav className="w-full p-4 flex justify-between px-10">
        <div className="flex gap-5 items-center">
          <h1 className="font-bold text-white text-2xl">
            Cinema E-Booking System
          </h1>
          <div className="flex items-center bg-jade rounded-full p-2">
            <label htmlFor="search">
              <Image src={SearchIcon} alt="Search Icon" width={30} />
            </label>
            <input
              id="search"
              placeholder="Search..."
              className="input rounded-full w-96 bg-transparent text-white placeholder:text-neutral-200"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/login/login-page" className="action-button">
            Login
          </Link>
          <Link href="/registration/registration-page" className="back-button">
            Register
          </Link>
        </div>
      </nav>
      <div className="bg-dark-jade p-2">
        <Image src={MovieBanner} alt="Movie Banner" />
      </div>
      <h2 className="font-bold text-xl text-white">Now Playing</h2>
      <div></div>
    </div>
  )
}
