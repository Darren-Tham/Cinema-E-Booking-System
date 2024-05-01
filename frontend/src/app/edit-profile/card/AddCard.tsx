"use client"

import CardTypes from "@/components/CardTypes"
import APIFacade from "@/lib/APIFacade"
import FormHandler from "@/lib/FormHandler"
import { Customer, CustomerCard, Email } from "@/lib/Types"
import { Dispatch, MutableRefObject, SetStateAction, useState } from "react"

type Props = {
  setDialogOpen: Dispatch<SetStateAction<boolean>>
  customer: Customer
  addDialogRef: MutableRefObject<HTMLDialogElement>
}

type Form = {
  cardType: string
  cardNumber: string
  expirationDate: string
  billingAddress: string
}

const AddCard = ({
  setDialogOpen,
  customer,
  addDialogRef
}: Readonly<Props>) => {
  const [form, setForm] = useState<Form>({
    cardType: "",
    cardNumber: "",
    expirationDate: "",
    billingAddress: ""
  })

  const isValidCardInfo = () => {
    if (form.cardType === "") {
      alert("Please select a credit card type.")
      return false
    }

    if (form.cardNumber === "") {
      alert("Credit card number cannot be empty.")
      return false
    }

    if (form.expirationDate.length !== 7) {
      alert("Expiration date must be filled out fully.")
      return false
    }

    if (form.billingAddress === "") {
      alert("Billing address cannot be empty.")
      return false
    }

    return true
  }

  const addCard = async () => {
    if (!isValidCardInfo()) return

    const card: CustomerCard = {
      customerId: customer.id,
      ...form
    }
    await APIFacade.addCard(card)

    const email: Email = {
      receiverEmail: customer.email,
      subject: "Cinema E-Booking System Credit Card Add",
      text: `The credit card ending in ${form.cardNumber.substring(
        form.cardNumber.length - 4
      )} in your account has been added to your account. If this was unexpected, please change your password to protect your account.`
    }
    await APIFacade.sendEmail(email)

    window.location.reload()
  }

  return (
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
            value={form.cardType}
            onChange={e =>
              FormHandler.updateForm(e, "cardType", form, setForm, false)
            }
          >
            <CardTypes />
          </select>
          <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
            Credit Card Number
          </div>
          <input
            className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
            value={form.cardNumber}
            onChange={e =>
              FormHandler.updateFormOnlyNumbers(
                e,
                "cardNumber",
                form,
                setForm,
                false
              )
            }
          />
          <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
            Expiration Date
          </div>
          <input
            className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
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
          <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
            Billing Address
          </div>
          <input
            className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
            value={form.billingAddress}
            onChange={e =>
              FormHandler.updateForm(e, "billingAddress", form, setForm, false)
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            className="border-[3px] text-white font-bold p-2 hover:scale-[1.015] transition-transform duration-300"
            onClick={() => {
              addDialogRef.current.close()
              setDialogOpen(false)
            }}
          >
            Close
          </button>
          <button
            className="bg-light-jade font-bold p-2 hover:scale-[1.015] transition-transform duration-300 rounded-sm"
            onClick={addCard}
          >
            Submit
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default AddCard
