import HomeNavbar from "@/components/HomeNavbar"
import Link from "next/link"

export default function ResetPasswordConfirmation() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <HomeNavbar />
      <div className="grow grid place-items-center">
        <div className="bg-dark-jade p-5 rounded-sm w-80 text-center">
          <p className="text-white font-semibold text-lg mb-5">
            Password has been successfully resetted. Please head to the login
            page and sign in.
          </p>
          <Link
            href="./login-page"
            className="bg-jade block text-lg rounded-sm font-bold text-white w-full p-2 hover:scale-105 transition-transform duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
