"use client"

import { getTransaction, updateTransaction } from "@/lib/Authentication"
import { useEffect, useState } from "react"
import CardTypes from "@/components/option/CardTypes"
import FormHandler from "@/lib/FormHandler"
import CardComponent from "./CardComponent"
import useCustomer from "@/hooks/useCustomer"
import {
  CheckoutBooking,
  CheckoutCard,
  Email,
  ProfileCard,
  Transaction
} from "@/lib/Types"
import APIFacade from "@/lib/APIFacade"
import { useRouter } from "next/navigation"
import Link from "next/link"
import PageFacade from "@/lib/PageFacade"

type Form = {
  cardType: string
  cardNumber: string
  expirationDate: string
  cvv: string
  billingAddress: string
  promotion: string
}

const CheckoutInformation = () => {
  const isCustomer = useCustomer()
  const router = useRouter()
  const [transaction, setTransaction] = useState<Transaction>()
  const [cards, setCards] = useState<ProfileCard[]>([])
  const [form, setForm] = useState<Form>({
    cardType: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
    promotion: ""
  })
  const [selectedCard, setSelectedCard] = useState<number>()
  const [promotion, setPromotion] = useState<number>(0)

  useEffect(() => {
    const getInformation = async () => {
      const transaction = await getTransaction()

      if (transaction?.customerId === undefined) {
        throw Error
      }

      const cards = await APIFacade.getCustomerCards(transaction.customerId)
      setCards(cards)
      setTransaction(transaction)
    }
    getInformation()
  }, [])

  const isValidForm = () => {
    if (selectedCard !== undefined) return true

    if (form.cardType === "") {
      alert("Card type cannot be empty.")
      return false
    }

    if (form.cardNumber === "") {
      alert("Card number cannot be empty.")
      return false
    }

    if (form.expirationDate.length !== 7) {
      alert("Expiration date must be filled out fully.")
      return false
    }

    if (form.cvv === "") {
      alert("CVV cannot be empty.")
      return false
    }

    if (form.billingAddress === "") {
      alert("Billing address cannot be empty.")
      return false
    }

    return true
  }

  const formatExpirationDate = (expirationDate: string) => {
    const [month, year] = expirationDate.split("/")
    return `${year}-${month}-01`
  }

  const getCard = async (): Promise<CheckoutCard> => {
    if (selectedCard === undefined) {
      return {
        ...form,
        expirationDate: formatExpirationDate(form.expirationDate),
        lastFourDigits: form.cardNumber.substring(form.cardNumber.length - 4)
      }
    } else {
      return await APIFacade.getCardById(selectedCard)
    }
  }

  const sendEmail = async (bookingId: number, customerId: number) => {
    const formatExpirationDate = (expirationDate: string) => {
      const [year, month] = expirationDate.split("-")
      return `${month}/${year}`
    }
    const booking = await APIFacade.getBookingById(bookingId)
    const tickets = await APIFacade.getTicketsByBookingId(bookingId)
    const receiverEmail = await APIFacade.getCustomerEmailById(customerId)
    let text = `Your order is confirmed. Here are the details to your booking.

Booking Information
Booking Id: ${booking.bookingId}
Booking Date: ${new Date(
      booking.bookingDate.replace(" ", "T")
    ).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    })}
Movie: ${booking.movieTitle}
Show Date: ${new Date(booking.dateTime.replace(" ", "T")).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "numeric"
      }
    )}
Location: UGA Theatre
Seats: ${booking.seats.join(", ")}
Total: $${booking.total.toFixed(2)}

Card Information
Card Type: ${booking.cardType}
Card Number: Ending in ${booking.lastFourDigits}
Expiration Date: ${formatExpirationDate(booking.expirationDate)}
Billing Address: ${booking.billingAddress}

Ticket Information
`

    for (const ticket of tickets) {
      text += `
Ticket Id: ${ticket.ticketId}
Ticket Type: ${ticket.ticketType}
Price: ${ticket.price}
`
    }

    text +=
      "\nWe look forward to welcoming you to our cinema and providing you with an unforgettable movie experience."
    const email: Email = {
      receiverEmail,
      subject: "Cinema E-Booking System Order Confirmation",
      text
    }
    await APIFacade.sendEmail(email)
  }

  const handleCheckoutClick = async () => {
    if (!isValidForm()) return

    if (
      transaction?.movieId === undefined ||
      transaction.customerId === undefined ||
      transaction.showtimeId === undefined ||
      transaction.adultTicketCount === undefined ||
      transaction.childTicketCount === undefined ||
      transaction.seniorTicketCount === undefined ||
      transaction.seats === undefined ||
      transaction.total === undefined
    ) {
      throw Error
    }

    const card = await getCard()
    const booking: CheckoutBooking = {
      movieId: transaction.movieId,
      customerId: transaction.customerId,
      showtimeId: transaction.showtimeId,
      adultTicketCount: transaction.adultTicketCount,
      childTicketCount: transaction.childTicketCount,
      seniorTicketCount: transaction.seniorTicketCount,
      seats: transaction.seats,
      total: +(transaction.total - promotion).toFixed(2),
      ...card
    } as const

    const bookingId = await APIFacade.addBooking(booking)
    await APIFacade.updateUnavilableSeats(
      transaction.showtimeId,
      transaction.seats
    )
    await sendEmail(bookingId, transaction.customerId)
    await updateTransaction({ bookingId })
    router.push(PageFacade.ORDER_CONFIRMATION)
  }

  const applyPromotion = async () => {
    if (promotion !== 0) {
      alert("Another promotion cannot be applied.")
      return
    }

    if (form.promotion === "") {
      alert("Promotion cannot be empty.")
      return
    }

    const promo = await APIFacade.getPromotion(form.promotion)
    if (promo === undefined) {
      alert("Promotion not found. Try again.")
      return
    }

    const startDate = new Date(promo.startDate)
    if (startDate > new Date(Date.now())) {
      alert(
        `This promotion can be applied on ${startDate.toLocaleDateString(
          "en-US",
          { year: "numeric", month: "long", day: "numeric" }
        )}.`
      )
      return
    }

    if (new Date(Date.now()) > new Date(promo.endDate)) {
      alert("This promotion is now expired.")
      return
    }

    if (transaction?.total === undefined) {
      throw Error
    }

    setPromotion(
      +((transaction.total * promo.discountPercentage) / 100).toFixed(2)
    )
  }

  const labelStyles = "text-white font-semibold"
  const h1Styles = "text-white font-bold text-2xl text-center"
  const h2Styles = "text-lg text-white font-semibold"
  const inputStyles =
    "bg-light-jade outline-none flex-grow rounded h-8 p-2 placeholder:text-neutral-500"
  const divStyles = "flex flex-col gap-1"

  return (
    isCustomer &&
    transaction?.total && (
      <div className="flex flex-col min-h-screen p-10 gap-8">
        <Link
          href={PageFacade.SEATS}
          className="bg-jade px-4 py-2 text-white font-bold scale-transition rounded-md self-start"
        >
          Back to Seats Page
        </Link>
        <div className="flex gap-10 self-center justify-self-center">
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
              <p className={h2Styles}>Promotion</p>
              <p className={h2Styles}>-${promotion.toFixed(2)}</p>
              <p className={h2Styles}>Total</p>
              <p className={h2Styles}>
                ${(transaction.total - promotion).toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                className="input"
                value={form.promotion}
                onChange={e =>
                  FormHandler.updateForm(e, "promotion", form, setForm)
                }
              />
              <button className="action-button w-full" onClick={applyPromotion}>
                Apply Promotion
              </button>
              <button
                className="back-button w-full"
                onClick={() => setPromotion(0)}
              >
                Remove Promotion
              </button>
            </div>
            <button
              //   href="/order-confirmation"
              className="action-button w-full text-center"
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default CheckoutInformation
