import InfoField from "@/components/InfoField"
import Link from "next/link"

export default function EditProfile() {
  const buttonStyles =
    "text-white w-max font-bold px-4 py-2 rounded-md hover:scale-105 transition-transform duration-300 mt-2 bg-light-jade  min-w-[200px] min-h-[50px] h-50px underline"

  return (
    <div className="flex flex-col bg-black h-screen items-center justify-center ">
      <div className="flex flex-col p-8 bg-dark-jade items-center space-y-10 rounded-lg">
        <h1 className="text-white text-4xl font-sans font-semibold mt-6">
          Edit Profile
        </h1>
        <div className="flex">
          <div>
            <img
              className="w-36 h-36 rounded-full bg-white hover:scale-105 transition-transform duration-300"
              src="https://static.thenounproject.com/png/363633-200.png"
              alt="pfp"
            ></img>
          </div>
        </div>
        <div className="flex flex-col space-y-2 w-96">
          <InfoField info="First Name" color="bg-light-jade" />
          <InfoField info="Last Name" color="bg-emerald-50" />
          <InfoField info="Email" color="bg-light-jade" />
          <InfoField info="Password" color="bg-emerald-50" />
          <InfoField info="Phone" color="bg-light-jade" />
          <InfoField info="Credit Card" color="bg-emerald-50" />
          <InfoField info="Billing" color="bg-light-jade" />
        </div>
      
        <div className="flex gap-10">
          <Link href="/">
          <button className={buttonStyles}>Continue to Home</button>
        </Link>
        <button className={buttonStyles}>Confirm Changes</button>
        </div>
      </div>
    </div>
  )
}
