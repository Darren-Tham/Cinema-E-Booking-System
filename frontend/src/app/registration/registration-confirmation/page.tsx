import HomeNavbar from "@/components/HomeNavbar"
import PageFacade from "@/lib/PageFacade"
import Link from "next/link"

const RegistrationConfirmation = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <HomeNavbar />
      <div className="grow grid place-items-center">
        <div className="bg-dark-jade p-5 rounded-sm w-80 text-center">
          <p className="text-white font-semibold text-lg mb-5">
            Thank you for registering an account! Please head to the login page
            and sign in.
          </p>
          <Link
            href={PageFacade.LOGIN_PAGE}
            className="bg-jade block text-lg rounded-sm font-bold text-white w-full p-2 hover:scale-105 transition-transform duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegistrationConfirmation
