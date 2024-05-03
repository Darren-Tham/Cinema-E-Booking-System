"use client"

import Link from "next/link"
import { useAuth } from "@/lib/useAuth"
import UnauthorizedScreen from "@/components/UnauthorizedScreen"
import CardTypes from "@/components/option/CardTypes"
import { useState } from "react"
import FormHandler from "@/lib/FormHandler"
import CardComponent from "./CardComponent"

type Form = {
  cardType: string
  cardNumber: string
  expirationDate: string
  cvv: string
  billingAddress: string
}

const CheckoutInfo = () => {
  const isUser = useAuth("user")
  const [form, setForm] = useState<Form>({
    cardType: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: ""
  })
  const [selectedCard, setSelectedCard] = useState<number>()

  const labelStyles = "text-white font-semibold"
  const inputStyles = "outline-none p-2 rounded-sm text-sm font-semibold"
  const h1Styles = "text-white font-bold text-2xl text-center"
  const h2Styles = "text-lg text-white font-semibold"
  const divStyles = "flex flex-col gap-1"

  return isUser ? (
    <div className="grid place-items-center bg-black min-h-screen">
      <div className="flex gap-10">
        <div className="flex flex-col bg-dark-jade rounded gap-4 p-8">
          <div className="flex flex-col gap-4">
            <h1 className={h1Styles}>Use Existing Card</h1>
            {new Array(3).fill(undefined).map((_, i) => (
              <CardComponent
                key={i}
                checked={selectedCard === i}
                handleChange={() =>
                  setSelectedCard(selectedCard === i ? undefined : i)
                }
              />
            ))}
          </div>
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
                      FormHandler.updateFormOnlyNumbers(e, "cvv", form, setForm)
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
            <p className={h2Styles}>Adult Ticket x 2</p>
            <p className={h2Styles}>Child Ticket x 1</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p className={h2Styles}>Subtotal</p>
            <p className={h2Styles}>$35.50</p>
            <p className={h2Styles}>Taxes</p>
            <p className={h2Styles}>$2.49</p>
            <p className={h2Styles}>Total</p>
            <p className={h2Styles}>$37.99</p>
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
  ) : (
    <UnauthorizedScreen />
  )
}

export default CheckoutInfo
