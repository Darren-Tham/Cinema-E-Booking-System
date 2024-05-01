"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import Image from "next/image"
import BluePlusIcon from "@public/blue-plus-icon.svg"
import { Customer, Email, ProfileHomeAddress } from "@/lib/Types"
import APIFacade from "@/lib/APIFacade"
import HomeAddressComponent from "./HomeAddressComponent"
import AddHomeAddress from "./AddHomeAddress"

type Props = {
  customer: Customer
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}

const HomeAddressInput = ({ customer, setDialogOpen }: Readonly<Props>) => {
  const [homeAddress, setHomeAddress] = useState<ProfileHomeAddress>()
  const addDialogRef = useRef<HTMLDialogElement>(null!)

  useEffect(() => {
    const fetchHomeAddress = async () => {
      const homeAddress = await APIFacade.getCustomerHomeAddress(customer.id)
      setHomeAddress(homeAddress)
    }

    fetchHomeAddress()
  }, [customer])

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="p-2 rounded-sm font-semibold bg-light-jade w-full">
            Home Address
          </div>
          {homeAddress === undefined && (
            <button
              className="scale-transition"
              onClick={() => {
                addDialogRef.current.showModal()
                setDialogOpen(true)
              }}
            >
              <Image src={BluePlusIcon} alt="Blue Plus Icon" width={35} />
            </button>
          )}
        </div>
        <HomeAddressComponent
          homeAddress={homeAddress}
          customer={customer}
          setDialogOpen={setDialogOpen}
        />
      </div>
      <AddHomeAddress
        customer={customer}
        addDialogRef={addDialogRef}
        setDialogOpen={setDialogOpen}
      />
    </>
  )
}

export default HomeAddressInput
