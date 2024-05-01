"use client"
import Link from "next/link"
import { useAuth } from "@/lib/useAuth"
import UnauthorizedScreen from "@/components/UnauthorizedScreen"

const AdminView = () => {
  const isAdmin = useAuth("admin")

  const buttonStyles =
    " text-black w-max font-bold px-4 py-2 rounded-md hover:scale-105 hover:bg-jade bg-transition-transform duration-300 bg-light-jade  min-w-[200px] min-h-[50px] text-center content-center"
  const h1Styles =
    "font-bold text-xl text-black text-center bg-jade rounded-sm w-1/4 h-10 content-center"

  return isAdmin ? (
    <div className="h-screen bg-black flex flex-col justify-center items-center">
      <h1 className={h1Styles}>Admin Portal</h1>
      <div className="bg-teal-950 p-16 rounded-lg flex flex-col gap-6 items-center w-1/4">
        <Link href="/admin-view/manage-movies" className={buttonStyles}>
          Manage Movies
        </Link>
        <Link href="/admin-view/suspend-user" className={buttonStyles}>
          Manage Users
        </Link>
        <Link href="/admin-view/manage-promotions" className={buttonStyles}>
          Manage Promotions
        </Link>
        <Link href="/" className={buttonStyles}>
          Back To Home
        </Link>
      </div>
    </div>
  ) : (
    <UnauthorizedScreen />
  )
}

export default AdminView