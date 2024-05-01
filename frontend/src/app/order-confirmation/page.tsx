"use client"
import Image from "next/image"
import { useAuth } from "@/lib/useAuth"
import HomeNavbar from "@/components/HomeNavbar"
import EncantoPoster from "@public/Encanto_poster.png"

const OrderConfirmation = () => {
  const isUser = useAuth("user")
  const h1Styles = "font-bold text-6xl text-white text-center"
  const h1Styles2 = "text-xl font-semibold text-white"

  return isUser ? (
    <div className="h-screen bg-black">
      <HomeNavbar />
      <div className="p-10">
        <h1 className={h1Styles}>Thank you for your order!</h1>
      </div>
      <div className=" grid grid-flow-row grid-cols-2 auto-fit py-8 gap-20">
        <Image
          className="justify-self-end max-h-full max-w-full p-2 rounded-lg bg-light-jade"
          src={EncantoPoster}
          alt="Encanto Poster"
        />

        <div className="tracking-wideer pt-10 px-12 pb-10 rounded-lg flex flex-col content-start">
          <h1 className={h1Styles2}>
            <b>Order Confirmation Number:</b> 62P-452QR8
          </h1>
          <div>
            <p className={h1Styles2}>
              <b>Movie:</b> Encanto
            </p>
            <p className={h1Styles2}>
              <b>Date:</b> Thursday, Febuary 22, 2024
            </p>
            <p className={h1Styles2}>
              <b>Location:</b> University 16 Cinema
            </p>
            <p className={h1Styles2}>
              <b>Time:</b> 12:00pm
            </p>
            <br></br>
            <p className={h1Styles2}>
              <b>Adult Ticket</b> x 2
            </p>
            <p className={h1Styles2}>
              <b>Child Ticket</b> x 1
            </p>
            <p className={h1Styles2}>
              <b>Promotion Discount:</b> $0.00
            </p>
            <p className={h1Styles2}>
              <b>Total:</b> $37.99
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen bg-black flex justify-center items-center">
      <h1 className="text-white text-3xl">
        WOMP WOMP, you are not authorized.
      </h1>
    </div>
  )
}

export default OrderConfirmation
