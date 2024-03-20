import HomeNavbar from "@/components/HomeNavbar"
import Link from "next/link"

export default function RegistrationVerificationCode() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <HomeNavbar />
      <div className="grow grid place-items-center">
        <div className="bg-dark-jade p-5 flex flex-col rounded-sm w-96 text-center">
          <p className="text-white font-semibold text-lg mb-4">
            A verification code is sent to your email. Please enter the code
            below to verify your account.
          </p>
          <input
            type="text"
            className="rounded-sm font-semibold outline-none p-[0.375rem] w-full mb-1"
          />
          <Link
            href="./registration-confirmation"
            className="bg-jade text-white w-full font-bold px-4 py-2 rounded-sm hover:scale-[1.025] transition-transform duration-300 mt-2"
          >
            Submit
          </Link>
        </div>
      </div>
    </div>
  )
}
