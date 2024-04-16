"use client"

import { useEffect, useState } from "react"

type Props = {
  customerId: number | undefined
  email: string | undefined
}

export default function PromotionButton({
  customerId,
  email
}: Readonly<Props>) {
  const [isSubscribedForPromotions, setIsSubscribedForPromotions] =
    useState(false)

  useEffect(() => {
    async function initIsSubscribedForPromotions() {
      if (customerId === null) {
        return
      }
      const response = await fetch(
        `http://localhost:8080/api/customer/promotions/${customerId}`
      )
      setIsSubscribedForPromotions((await response.text()) === "true")
    }
    initIsSubscribedForPromotions()
  }, [customerId])

  return (
    <button
      className="p-2 rounded-sm font-semibold bg-light-jade w-full hover:scale-[1.015] transition-transform duration-300"
      onClick={async () => {
        await fetch(
          `http://localhost:8080/api/customer/change_promotion/${customerId}/${!isSubscribedForPromotions}`,
          { method: "PUT" }
        )
        await fetch("http://localhost:8080/api/email/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            receiverEmail: email,
            subject: "Cinema E-Booking System Promotion Subscription Update",
            text: `${
              isSubscribedForPromotions
                ? "You are no longer subscribed for promotions."
                : "You are now subscribed for promotions."
            } If this was unexpected, please change your password to protect your account.`
          })
        })
        window.location.reload()
      }}
    >
      {isSubscribedForPromotions
        ? "Unsubscribe From Promotions"
        : "Subscribe For Promotions"}
    </button>
  )
}
