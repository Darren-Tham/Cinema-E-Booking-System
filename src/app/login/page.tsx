import HomeNavbar from "@/components/HomeNavbar"
import Link from "next/link"

export default function Login() {
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
            <input type="text" id="email" className="input" />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="password" className="label">
              Password *
            </label>
            <input type="password" id="password" className="input" />
            <Link
              href="/forgot-password"
              className="text-bright-jade font-semibold w-max hover:scale-105 transition-transform duration-300"
            >
              Forgot Password?
            </Link>
          </div>
          <Link href="/" className="action-button w-full text-center">
            Log In
          </Link>
          <div className="flex justify-center">
            <p className="p-redirection">Don&apos;t Have An Account?</p>
            <Link href="/registration" className="link-redirection">
              Register Here
            </Link>
          </div>
          <p className="text-white font-semibold text-sm self-start">
            * Required Field
          </p>
        </div>
      </div>
    </div>
  )
}
