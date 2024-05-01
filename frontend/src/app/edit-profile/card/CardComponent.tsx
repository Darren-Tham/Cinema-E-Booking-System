"use client"

import CardTypes from "@/components/CardTypes"
import APIFacade from "@/lib/APIFacade"
import { Customer, Email, ProfileCard } from "@/lib/Types"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import PencilIcon from "@public/pencil-icon.svg"
import RedDeleteIcon from "@public/red-delete-icon.svg"
import Image from "next/image"
import FormHandler from "@/lib/FormHandler"

type Props = {
  setDialogOpen: Dispatch<SetStateAction<boolean>>
  card: ProfileCard
  customer: Customer
}

type Form = {
  cardType: string
  expirationDate: string
  billingAddress: string
}

const formatExpirationDate = (expirationDate: string) => {
  const parts = expirationDate.split("-")
  return parts[1] + "/" + parts[0]
}

export const CardComponent = ({
  setDialogOpen,
  card,
  customer
}: Readonly<Props>) => {
  const [form, setForm] = useState<Form>({
    cardType: card.cardType,
    expirationDate: formatExpirationDate(card.expirationDate),
    billingAddress: card.billingAddress
  })
  const dialogRef = useRef<HTMLDialogElement>(null!)

  const isValidCardInfo = (card: ProfileCard) => {
    if (
      form.cardType === card.cardType &&
      form.expirationDate === formatExpirationDate(card.expirationDate) &&
      form.billingAddress === card.billingAddress
    ) {
      alert(
        "Updated card information is the same as the current card information."
      )
      return false
    }

    if (form.cardType === "") {
      alert("Card type cannot be empty.")
      return false
    }

    if (form.billingAddress === "") {
      alert("Billing address cannot be empty.")
      return false
    }

    if (form.expirationDate.length !== 7) {
      alert("Expiration date must be filled out fully.")
      return false
    }

    return true
  }

  const updateCard = async (card: ProfileCard) => {
    if (!isValidCardInfo(card)) return

    const updatedCard: ProfileCard = {
      id: card.id,
      cardType: form.cardType,
      expirationDate: form.expirationDate,
      billingAddress: form.billingAddress,
      lastFourDigits: card.lastFourDigits
    }
    await APIFacade.updateCard(updatedCard)

    const email: Email = {
      receiverEmail: customer.email,
      subject: "Cinema E-Booking System Credit Card Update",
      text: `The credit card ending in ${card.lastFourDigits} in your account has been updated. If this was unexpected, please change your password to protect your account.`
    }
    await APIFacade.sendEmail(email)

    window.location.reload()
  }

  const deleteCard = async (card: ProfileCard) => {
    await APIFacade.deleteCard(card.id)
    const email: Email = {
      receiverEmail: customer.email,
      subject: "Cinema E-Booking System Credit Card Delete",
      text: `The credit card ending in ${card.lastFourDigits} in your account has been deleted. If this was unexpected, please change your password to protect your account.`
    }
    await APIFacade.sendEmail(email)
    window.location.reload()
  }

  return (
    <>
      <dialog
        ref={dialogRef}
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
              value={form.cardType}
              onChange={e =>
                FormHandler.updateForm(e, "cardType", form, setForm, false)
              }
            >
              <CardTypes />
            </select>
            <div className="p-2 rounded-sm font-semibold bg-light-jade">
              Expiration Date
            </div>
            <input
              className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
              value={form.expirationDate}
              onChange={e =>
                FormHandler.updateFormExpirationDate(
                  e,
                  "expirationDate",
                  form,
                  setForm
                )
              }
              placeholder="MM/YYYY"
            />
            <div className="p-2 rounded-sm font-semibold bg-light-jade">
              Billing Address
            </div>
            <input
              className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
              value={form.billingAddress}
              onChange={e =>
                FormHandler.updateForm(
                  e,
                  "billingAddress",
                  form,
                  setForm,
                  false
                )
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              className="border-[3px] text-white font-bold p-2 hover:scale-[1.015] transition-transform duration-300"
              onClick={() => {
                dialogRef.current.close()
                setDialogOpen(false)
              }}
            >
              Close
            </button>
            <button
              className="bg-light-jade font-bold p-2 hover:scale-[1.015] transition-transform duration-300 rounded-sm"
              onClick={() => updateCard(card)}
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
              dialogRef.current.showModal()
              setDialogOpen(true)
            }}
          >
            <Image src={PencilIcon} alt="Edit Icon" width={30} />
          </button>
          <button
            className="scale-transition w-max"
            onClick={() => deleteCard(card)}
          >
            <Image src={RedDeleteIcon} alt="Delete Icon" width={30} />
          </button>
        </div>
      </div>
    </>
  )
}

export default CardComponent
