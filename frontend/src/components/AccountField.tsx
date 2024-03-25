"use client"

import ProfileIcon from "@public/profile-icon.svg"
import Image from "next/image"
import { useState } from "react"

interface Props {
  email: string
}

export default function AccountField({ email, first, last }: Readonly<Props>) {
  const [isSuspended, setIsSuspended] = useState(false)

  return (
    <div className="px-5 py-5 justify-center items-center">
        <div className="flex h-72 w-72 gap-4 bg-dark-jade rounded-md justify-center" >
        <div className="justify-center items-center">
        <div className="flex py-2 justify-center">
          <div className="w-24 rounded-full bg-white hover:scale-100">
            <img
              src="https://static.thenounproject.com/png/363633-200.png"
              alt="pfp"
            ></img>
          </div> 
        </div>
        
        <div className="flex justify-center">
          <div className="flex px-4 pt-4 text-stone-300 items-center justify-between h-10 w-fit overflow-hidden ">
          <p className="font-semibold">{first} {last}</p>
          </div>
        </div>  

        <div className="flex py-2 justify-center">
          <div className="flex px-4 py-4 text-stone-200 items-center justify-between h-10 w-full max-w-md overflow-hidden ">
          <p className="font-semibold">{email}</p>
        </div>
        </div>  
        
        <div className="flex py-2 justify-center">
          <button
            className={`${
            isSuspended ? "bg-gray-500" : "bg-red-600"
            } py-2 w-32 rounded-md text-white font-semibold`}
            onClick={() => setIsSuspended(!isSuspended)}
            >
            {isSuspended ? "Unsuspend" : "Suspend"}
          </button>
        </div>
       
    </div>
  </div>
    </div>
    

       
      
      
  )
}
