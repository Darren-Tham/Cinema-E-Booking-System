import InfoField from "@/components/InfoField"
import Link from "next/link"

export default function EditProfile() {
  return (
    <div className="flex flex-col bg-black h-screen items-center justify-center ">
      <div className="flex flex-col p-8 bg-dark-jade items-center space-y-10 rounded-lg">
        <h1 className="text-white text-4xl font-sans font-semibold mt-6">
          Edit Profile
        </h1>
        <div className="flex items-end">
          <div className="w-36 h-36 rounded-full bg-white hover:scale-105 transition-transform duration-300">
            <img
              src="https://static.thenounproject.com/png/363633-200.png"
              alt="pfp"
            ></img>
          </div>
          <div className="w-10 h-10 rounded-full bg-black hover:scale-105 transition-transform duration-300">
            <img src="https://static.vecteezy.com/system/resources/previews/021/352/965/original/user-icon-person-profile-avatar-with-plus-symbol-add-user-profile-icon-png.png"></img>
          </div>
        </div>
        <div className="flex flex-col space-y-6 w-96">
          <InfoField info="First Name" color="bg-light-jade" />
          <InfoField info="Last Name" color="bg-emerald-50" />
          <InfoField info="Email" color="bg-light-jade" />
          <InfoField info="Password" color="bg-emerald-50" />
          <InfoField info="Phone" color="bg-light-jade" />
        </div>
        <div className="flex gap-10">
          <Link href="/" className="back-button">
            Back Home
          </Link>
          <button className="action-button">Confirm Changes</button>
        </div>
      </div>
    </div>
  )
}
