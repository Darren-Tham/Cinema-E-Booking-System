"use client"

import APIFacade from "@/lib/APIFacade"
import { Customer, Email } from "@/lib/Types"
import { useEffect, useState } from "react"

type Props = {
  customer: Customer
}

const PromotionButton = ({ customer }: Readonly<Props>) => {
  const [isSubscribedForPromotions, setIsSubscribedForPromotions] =
    useState(false)

  useEffect(() => {
    const fetchIsSubscribedForPromotions = async () => {
      const isSubscribedForPromotions =
        await APIFacade.isCustomerSubscribedForPromotions(customer.id)
      setIsSubscribedForPromotions(isSubscribedForPromotions)
    }
    fetchIsSubscribedForPromotions()
  }, [customer])

  const updateSubscribedForPromotions = async () => {
    await APIFacade.updateCustomerSubscribedForPromotions(
      customer.id,
      !isSubscribedForPromotions
    )

    const email: Email = {
      receiverEmail: customer.email,
      subject: "Cinema E-Booking System Promotion Subscription Update",
      text: `${
        isSubscribedForPromotions
          ? "You are no longer subscribed for promotions."
          : "You are now subscribed for promotions."
      } If this was unexpected, please change your password to protect your account.`
    }
    await APIFacade.sendEmail(email)

    window.location.reload()
  }

  return (
    <button
      className="p-2 rounded-sm font-semibold bg-light-jade w-full hover:scale-[1.015] transition-transform duration-300"
      onClick={updateSubscribedForPromotions}
    >
      {isSubscribedForPromotions
        ? "Unsubscribe From Promotions"
        : "Subscribe For Promotions"}
    </button>
  )
}

export default PromotionButton
