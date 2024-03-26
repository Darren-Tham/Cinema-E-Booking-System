"use client"

import Image from "next/image"
import PencilIcon from "@public/pencil-icon.svg"
import BluePlusIcon from "@public/blue-plus-icon.svg"
import RedDeleteIcon from "@public/red-delete-icon.svg"
import {
  RefObject,
  useEffect,
  useState,
  useRef,
  createRef,
  Dispatch,
  SetStateAction,
  Fragment
} from "react"

type Props = {
  customerId: number | undefined
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}

type Card = {
  id: number
  cardType: string
  expirationDate: string
  billingAddress: string
  lastFourDigits: string
}

type Refs = {
  dialogRef: RefObject<HTMLDialogElement>
  cardTypeRef: RefObject<HTMLSelectElement>
  expirationDateRef: RefObject<HTMLInputElement>
  billingAddressRef: RefObject<HTMLInputElement>
}

export default function CardsInput({
  customerId,
  setDialogOpen
}: Readonly<Props>) {
  const [cards, setCards] = useState<Card[]>([])
  const cardsRef = useRef<Refs[]>([])
  const addDialogRef = useRef<HTMLDialogElement | null>(null)
  const addCreditCardTypeRef = useRef<HTMLSelectElement | null>(null)
  const [addCreditCardNumber, setAddCreditCardNumber] = useState("")
  const [addExpirationDate, setAddExpirationDate] = useState("")
  const addBillingAddressRef = useRef<HTMLInputElement | null>(null)

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
        const refs: Refs[] = []

        for (let i = 0; i < cards.length; i++) {
          refs.push({
            dialogRef: createRef(),
            cardTypeRef: createRef(),
            expirationDateRef: createRef(),
            billingAddressRef: createRef()
          })
        }
        cardsRef.current = refs
      }
    }
    initCards()
  }, [customerId])

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="p-2 rounded-sm font-semibold bg-light-jade w-full">
            Credit Cards
          </div>
          {cards.length !== 3 && (
            <button
              className="scale-transition"
              onClick={() => {
                addDialogRef.current?.showModal()
                setDialogOpen(true)
              }}
            >
              <Image src={BluePlusIcon} alt="Blue Plus Icon" width={35} />
            </button>
          )}
        </div>
        {cards.map((card, i) => (
          <Fragment key={card.id}>
            <dialog
              ref={cardsRef.current[i].dialogRef}
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
                  <select
                    className="rounded-sm font-semibold p-[0.375rem] w-full bg-emerald-50"
                    defaultValue={card.cardType}
                    ref={cardsRef.current[i].cardTypeRef}
                  >
                    <option>Visa</option>
                    <option>Mastercard</option>
                    <option>American Express</option>
                    <option>Discover</option>
                  </select>
                  <div className="p-2 rounded-sm font-semibold bg-light-jade">
                    Expiration Date
                  </div>
                  <input
                    className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
                    defaultValue={formatExpirationDate(card.expirationDate)}
                    ref={cardsRef.current[i].expirationDateRef}
                    placeholder="MM/YYYY"
                  />
                  <div className="p-2 rounded-sm font-semibold bg-light-jade">
                    Billing Address
                  </div>
                  <input
                    className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
                    defaultValue={card.billingAddress}
                    ref={cardsRef.current[i].billingAddressRef}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    className="border-[3px] text-white font-bold p-2 hover:scale-[1.015] transition-transform duration-300"
                    onClick={() => {
                      cardsRef.current[i].dialogRef.current?.close()
                      setDialogOpen(false)
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="bg-light-jade font-bold p-2 hover:scale-[1.015] transition-transform duration-300 rounded-sm"
                    onClick={async () => {
                      const cardType =
                        cardsRef.current[i].cardTypeRef.current?.value
                      const expirationDate =
                        cardsRef.current[i].expirationDateRef.current?.value
                      const billingAddress =
                        cardsRef.current[
                          i
                        ].billingAddressRef.current?.value.trim()
                      if (
                        cardType === card.cardType &&
                        expirationDate ===
                          formatExpirationDate(card.expirationDate) &&
                        billingAddress === card.billingAddress
                      ) {
                        alert(
                          "Updated card information is the same as the current card information."
                        )
                      } else if (billingAddress === "") {
                        alert("Billing address cannot be empty.")
                      } else if (
                        expirationDate === undefined ||
                        !/^(?:0[1-9]|1[0-2])\/\d{4}$/.test(expirationDate)
                      ) {
                        alert("Expiration date is not formatted correctly.")
                      } else {
                        await fetch("http://localhost:8080/api/card/update", {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json"
                          },
                          body: JSON.stringify({
                            id: card.id,
                            cardType,
                            expirationDate,
                            billingAddress,
                            lastFourDigits: card.lastFourDigits
                          })
                        })
                        window.location.reload()
                      }
                    }}
                  >
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
              <div className="flex flex-col justify-evenly">
                <button
                  className="self-center scale-transition w-max"
                  onClick={() => {
                    cardsRef.current[i].dialogRef.current?.showModal()
                    setDialogOpen(true)
                  }}
                >
                  <Image src={PencilIcon} alt="Edit Icon" width={30} />
                </button>
                <button
                  className="scale-transition w-max"
                  onClick={async () => {
                    await fetch(
                      `http://localhost:8080/api/card/delete/${card.id}`,
                      { method: "DELETE" }
                    )
                    window.location.reload()
                  }}
                >
                  <Image src={RedDeleteIcon} alt="Delete Icon" width={30} />
                </button>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <dialog
        ref={addDialogRef}
        className="bg-transparent"
        onKeyDown={e => {
          if (e.key === "Escape") {
            return
          }
        }}
      >
        <div className="bg-dark-jade p-6 flex flex-col gap-3 rounded-md border-2">
          <h2 className="bg-light-jade font-bold text-center text-2xl py-3 px-20 rounded-sm">
            Add Home Address
          </h2>
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "repeat(2, auto)" }}
          >
            <div className="p-2 rounded-sm font-semibold bg-light-jade">
              Credit Card Type
            </div>
            <select
              className="rounded-sm font-semibold p-[0.375rem] w-full bg-emerald-50"
              ref={addCreditCardTypeRef}
            >
              <option />
              <option>Visa</option>
              <option>Mastercard</option>
              <option>American Express</option>
              <option>Discover</option>
            </select>
            <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
              Credit Card Number
            </div>
            <input
              className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
              value={addCreditCardNumber}
              onChange={e => {
                const { value } = e.target
                if (/^\d*$/.test(value)) {
                  setAddCreditCardNumber(value)
                }
              }}
            />
            <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
              Expiration Date
            </div>
            <input
              className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
              value={addExpirationDate}
              placeholder="MM/YYYY"
              onChange={e => {
                const { value } = e.target
                if (
                  /(?:\d|\/)*/.test(value) &&
                  value.length <= 7 &&
                  value.indexOf("/") === value.lastIndexOf("/")
                ) {
                  setAddExpirationDate(value)
                }
              }}
            />
            <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
              Billing Address
            </div>
            <input
              className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
              ref={addBillingAddressRef}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              className="border-[3px] text-white font-bold p-2 hover:scale-[1.015] transition-transform duration-300"
              onClick={() => {
                addDialogRef.current?.close()
                setDialogOpen(false)
              }}
            >
              Close
            </button>
            <button
              className="bg-light-jade font-bold p-2 hover:scale-[1.015] transition-transform duration-300 rounded-sm"
              onClick={async () => {
                const creditCardType = addCreditCardTypeRef.current?.value
                const billingAddress = addBillingAddressRef.current?.value
                if (creditCardType === "") {
                  alert("Please select a credit card type.")
                } else if (addCreditCardNumber === "") {
                  alert("Credit card number cannot be empty.")
                } else if (
                  !/^(?:0[1-9]|1[0-2])\/\d{4}$/.test(addExpirationDate)
                ) {
                  alert(
                    "Expiration date needs to be formatted and inputted correctly."
                  )
                } else if (billingAddress === "") {
                  alert("Billing address cannot be empty.")
                } else {
                  await fetch("http://localhost:8080/api/card/add", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      customerId,
                      cardType: creditCardType,
                      cardNumber: addCreditCardNumber,
                      expirationDate: addExpirationDate,
                      billingAddress
                    })
                  })
                  window.location.reload()
                }
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}

function formatExpirationDate(expirationDate: string) {
  const parts = expirationDate.split("-")
  return parts[1] + "/" + parts[0]
}
