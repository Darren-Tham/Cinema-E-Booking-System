"use client"
import Link from "next/link"
import { useAuth } from "@/lib/useAuth"

export default function Admin() {
  const buttonStyles =
    "mt-6 text-black w-max font-bold px-4 py-2 rounded-md hover:scale-105 transition-transform duration-300 mt-2 bg-light-jade  min-w-[200px] min-h-[50px] text-center"
  const h1Styles = "font-bold text-xl text-white text-center"

  const isAdmin = useAuth("admin")

  return (
    isAdmin ? (
      <div className="h-screen bg-black flex justify-center items-center">
        <div className="bg-teal-950 p-16 rounded-lg flex flex-col gap-4 items-center">
          <h1 className={h1Styles}>Admin</h1>
          <Link href="/admin-view/manage-movies" className={buttonStyles}>
            Manage Movies
          </Link>
          <Link href="/admin-view/suspend-user" className={buttonStyles}>
            Manage Users
          </Link>
          <Link href="/admin-view/manage-promotions" className={buttonStyles}>
            Manage Promotions
          </Link>
        </div>
      </div>
    ) : (
      <div className="h-screen bg-black flex justify-center items-center">
        <h1 className="text-white text-3xl">WOMP WOMP, you are not authorized.</h1>
      </div>
    )

  )
}
