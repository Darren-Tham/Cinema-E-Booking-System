"use client"

import ProfileIcon from "@public/profile-icon.svg"
import Image from "next/image"
import { useState } from "react"

interface Props {
  email: string
}

export default function AccountField({ email }: Readonly<Props>) {
  const [isSuspended, setIsSuspended] = useState(false)

  return (
    <div className="flex items-center gap-4">
      <Image src={ProfileIcon} alt="Profile Icon" width={75} />
      <div className="flex bg-light-jade items-center justify-between rounded h-10 w-full max-w-md overflow-hidden px-4 py-2">
        <p className="font-semibold">{email}</p>
      </div>
      <button
        className={`${
          isSuspended ? "bg-gray-500" : "bg-red-600"
        } py-2 w-60 rounded-md text-white font-semibold`}
        onClick={() => setIsSuspended(!isSuspended)}
      >
        {isSuspended ? "Unsuspend" : "Suspend"}
      </button>
    </div>
  )
}
