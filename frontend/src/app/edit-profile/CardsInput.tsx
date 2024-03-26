"use client"

import Image from "next/image"
import PencilIcon from "@public/pencil-icon.svg"
import BluePlusIcon from "@public/blue-plus-icon.svg"
import {
  RefObject,
  useEffect,
  useState,
  useRef,
  createRef,
  Dispatch,
  SetStateAction
} from "react"

type Props = {
  customerId: number | undefined
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}

type Card = {
  cardType: string
  expirationDate: string
  billingAddress: string
  lastFourDigits: string
}

export default function CardsInput({
  customerId,
  setDialogOpen
}: Readonly<Props>) {
  const [cards, setCards] = useState<Card[]>([])
  const cardsRef = useRef<RefObject<HTMLDialogElement>[]>([])
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    async function initCards() {
      if (customerId === undefined) {
        return
      }
      const cardsResponse = await fetch(
        `http://localhost:8080/api/card/${customerId}`
      )
      if (cardsResponse.ok) {
        const cards: Card[] = await cardsResponse.json()
        setCards(cards)
        const refs: RefObject<HTMLDialogElement>[] = []

        for (let i = 0; i < cards.length; i++) {
          refs.push(createRef<HTMLDialogElement>())
          cardsRef.current = refs
        }
      }
    }
    initCards()
  }, [customerId])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="p-2 rounded-sm font-semibold bg-light-jade w-full">
          Credit Cards
        </div>
        <button className="scale-transition">
          <Image src={BluePlusIcon} alt="Blue Plus Icon" width={35} />
        </button>
      </div>
      {cards.map((card, i) => (
        <>
          <dialog
            ref={cardsRef.current[i]}
            className="bg-transparent"
            onKeyDown={e => {
              if (e.key === "Escape") {
                e.preventDefault()
              }
            }}
          >
            <div className="bg-dark-jade p-6 flex flex-col gap-3 rounded-md border-2">
              <h2 className="bg-light-jade font-bold text-center text-2xl py-3 px-20 rounded-sm">
                Edit Credit Card
              </h2>
              <div
                className="grid gap-3"
                style={{ gridTemplateColumns: "repeat(2, auto)" }}
              >
                <div className="p-2 rounded-sm font-semibold bg-light-jade">
                  Credit Card Type
                </div>
                <input
                  className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
                  defaultValue={card.cardType}
                />
                <div className="p-2 rounded-sm font-semibold bg-light-jade">
                  Credit Card Number
                </div>
                <input className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm" />
                <div className="p-2 rounded-sm font-semibold bg-light-jade">
                  Expiration Date
                </div>
                <input
                  className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
                  defaultValue={formatExpirationDate(card.expirationDate)}
                />
                <div className="p-2 rounded-sm font-semibold bg-light-jade">
                  Billing Address
                </div>
                <input
                  className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
                  defaultValue={card.billingAddress}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="border-[3px] text-white font-bold p-2 hover:scale-[1.015] transition-transform duration-300"
                  onClick={() => {
                    cardsRef.current[i].current?.close()
                    setDialogOpen(false)
                  }}
                >
                  Close
                </button>
                <button className="bg-light-jade font-bold p-2 hover:scale-[1.015] transition-transform duration-300 rounded-sm">
                  Submit
                </button>
              </div>
            </div>
          </dialog>
          <div className="flex gap-3">
            <div
              className="p-2 rounded-sm font-semibold bg-emerald-50 grid gap-x-6 w-full"
              style={{ gridTemplateColumns: "repeat(2, auto)" }}
            >
              <p>Credit Card Type</p>
              <p>{card.cardType}</p>
              <p>Credit Card Number</p>
              <p>Ending in {card.lastFourDigits}</p>
              <p>Expiration Date</p>
              <p>{formatExpirationDate(card.expirationDate)}</p>
              <p>Billing Address</p>
              <p>{card.billingAddress}</p>
            </div>

            <button
              className="self-center scale-transition w-max"
              onClick={() => {
                dialogRef.current?.showModal()
                setDialogOpen(true)
              }}
            >
              <Image src={PencilIcon} alt="Edit Icon" width={30} />
            </button>
          </div>
        </>
      ))}
    </div>
  )
}

function formatExpirationDate(expirationDate: string) {
  const parts = expirationDate.split("-")
  return parts[1] + "/" + parts[0]
}
