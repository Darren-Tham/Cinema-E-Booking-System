"use client"

import Link from "next/link"
import { getTransaction } from "@/lib/Authentication"
import { useEffect, useState } from "react"
import CardTypes from "@/components/option/CardTypes"
import FormHandler from "@/lib/FormHandler"
import CardComponent from "./CardComponent"
import useCustomer from "@/hooks/useCustomer"
import { ProfileCard, Transaction } from "@/lib/Types"
import APIFacade from "@/lib/APIFacade"

type Form = {
  cardType: string
  cardNumber: string
  expirationDate: string
  cvv: string
  billingAddress: string
}

const CheckoutInfo = () => {
  const isCustomer = useCustomer()
  const [transaction, setTransaction] = useState<Transaction>()
  const [cards, setCards] = useState<ProfileCard[]>([])
  const [form, setForm] = useState<Form>({
    cardType: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: ""
  })
  const [selectedCard, setSelectedCard] = useState<number>()

  useEffect(() => {
    async function getInformation() {
      const transaction = await getTransaction()

      if (transaction === undefined || transaction.customerId === undefined) {
        throw Error
      }

      const cards = await APIFacade.getCustomerCards(transaction.customerId)
      setCards(cards)
      setTransaction(transaction)
    }
    getInformation()
  }, [])

  const labelStyles = "text-white font-semibold"
  const h1Styles = "text-white font-bold text-2xl text-center"
  const h2Styles = "text-lg text-white font-semibold"
  const inputStyles =
    "bg-light-jade outline-none flex-grow rounded h-8 p-2 placeholder:text-neutral-500"
  const divStyles = "flex flex-col gap-1"

  return (
    isCustomer &&
    transaction !== undefined && (
      <div className="grid place-items-center bg-black min-h-screen p-8">
        <div className="flex gap-10">
          <div className="flex flex-col bg-dark-jade rounded gap-4 p-8">
            {cards.length !== 0 && (
              <div className="flex flex-col gap-4">
                <h1 className={h1Styles}>Use Existing Card</h1>
                {cards.map(card => (
                  <CardComponent
                    key={card.id}
                    card={card}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                  />
                ))}
              </div>
            )}
            {selectedCard === undefined && (
              <div className="flex flex-col gap-4">
                <h1 className={h1Styles}>Payment Information</h1>
                <div className={divStyles}>
                  <label htmlFor="card-type" className={labelStyles}>
                    Card Type
                  </label>
                  <select
                    id="card-type"
                    className={inputStyles}
                    value={form.cardType}
                    onChange={e =>
                      FormHandler.updateForm(e, "cardType", form, setForm)
                    }
                  >
                    <CardTypes />
                  </select>
                </div>
                <div className={divStyles}>
                  <label htmlFor="card-number" className={labelStyles}>
                    Card Number
                  </label>
                  <input
                    id="card-number"
                    type="text"
                    className={inputStyles}
                    value={form.cardNumber}
                    onChange={e =>
                      FormHandler.updateFormOnlyNumbers(
                        e,
                        "cardNumber",
                        form,
                        setForm
                      )
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className={divStyles}>
                    <label htmlFor="expiration-date" className={labelStyles}>
                      Expiration Date
                    </label>
                    <input
                      id="expiration-date"
                      type="text"
                      className={inputStyles}
                      placeholder="MM/YYYY"
                      value={form.expirationDate}
                      onChange={e =>
                        FormHandler.updateFormExpirationDate(
                          e,
                          "expirationDate",
                          form,
                          setForm
                        )
                      }
                    />
                  </div>
                  <div className={divStyles}>
                    <label htmlFor="cvv" className={labelStyles}>
                      CVV
                    </label>
                    <input
                      id="cvv"
                      type="text"
                      className={inputStyles}
                      value={form.cvv}
                      onChange={e =>
                        FormHandler.updateFormOnlyNumbers(
                          e,
                          "cvv",
                          form,
                          setForm
                        )
                      }
                    />
                  </div>
                </div>
                <div className={divStyles}>
                  <label htmlFor="billing-address" className={labelStyles}>
                    Billing Address
                  </label>
                  <input
                    id="billing-address"
                    type="text"
                    className={inputStyles}
                    value={form.billingAddress}
                    onChange={e =>
                      FormHandler.updateForm(e, "billingAddress", form, setForm)
                    }
                  />
                </div>
              </div>
            )}
          </div>
          <div className="bg-dark-jade p-8 rounded-md h-max flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              {transaction.adultTicketCount !== 0 && (
                <p className={h2Styles}>
                  Adult Ticket x {transaction.adultTicketCount}
                </p>
              )}
              {transaction.childTicketCount !== 0 && (
                <p className={h2Styles}>
                  Child Ticket x {transaction.childTicketCount}
                </p>
              )}
              {transaction.seniorTicketCount !== 0 && (
                <p className={h2Styles}>
                  Senior Ticket x {transaction.seniorTicketCount}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p className={h2Styles}>Subtotal</p>
              <p className={h2Styles}>${transaction.subtotal?.toFixed(2)}</p>
              <p className={h2Styles}>Taxes</p>
              <p className={h2Styles}>${transaction.taxes?.toFixed(2)}</p>
              <p className={h2Styles}>Total</p>
              <p className={h2Styles}>${transaction.total?.toFixed(2)}</p>
            </div>
            <div className="flex flex-col">
              <input className="input" />
              <button className="back-button w-full">Apply Promotions</button>
            </div>
            <Link
              href="/order-confirmation"
              className="action-button w-full text-center"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    )
  )
}

export default CheckoutInfo
