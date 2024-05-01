"use client"

import Image from "next/image"
import BluePlusIcon from "@public/blue-plus-icon.svg"
import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react"
import APIFacade from "@/lib/APIFacade"
import { Customer, ProfileCard } from "@/lib/Types"
import CardComponent from "./CardComponent"
import AddCard from "./AddCard"

type Props = {
  customer: Customer
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}

const CardsInput = ({ customer, setDialogOpen }: Readonly<Props>) => {
  const [customerCards, setCustomerCards] = useState<ProfileCard[]>([])
  const addDialogRef = useRef<HTMLDialogElement>(null!)

  useEffect(() => {
    const fetchCustomerCards = async () => {
      const customerCards = await APIFacade.getCustomerCards(customer.id)
      setCustomerCards(customerCards)
    }

    fetchCustomerCards()
  }, [customer])

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="p-2 rounded-sm font-semibold bg-light-jade w-full">
            Credit Cards
          </div>
          {customerCards.length !== 3 && (
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
        {customerCards.map(card => (
          <CardComponent
            key={card.id}
            setDialogOpen={setDialogOpen}
            card={card}
            customer={customer}
          />
        ))}
      </div>
      <AddCard
        setDialogOpen={setDialogOpen}
        customer={customer}
        addDialogRef={addDialogRef}
      />
    </>
  )
}

export default CardsInput
