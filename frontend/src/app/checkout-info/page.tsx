"use client"
import Link from "next/link"
import { useAuth } from "@/lib/useAuth"
import UnauthorizedScreen from "@/components/UnauthorizedScreen"
const CheckoutInfo = () => {
  const isUser = useAuth("user")
  const h1Styles = "font-bold text-4xl text-white text-center p-10"
  const h2Styles = "text-lg text-white font-semibold"
  const inputStyles =
    "bg-light-jade outline-none flex-grow rounded h-8 max-w-80 p-2"

  return isUser ? (
    <div className="grid place-items-center bg-black min-h-screen">
      <div className="flex gap-10">
        <div className="flex flex-col bg-dark-jade rounded-md pb-10 h-max">
          <button className="action-button mt-11 ml-11">
            Use Existing Card
          </button>
          <h1 className={h1Styles}>Billing Information</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-20 px-10 ">
              <h3 className={h2Styles}>Name *</h3>
              <input className={inputStyles} type="email" />
            </div>
            <div className="flex items-center space-x-5 px-10">
              <h3 className={h2Styles}>Email Address *</h3>
              <input className={inputStyles} type="email" />
            </div>
            <div className="flex items-center space-x-16 px-10">
              <h3 className={h2Styles}>Country *</h3>
              <input className={inputStyles} type="text" />
            </div>

            <div className="flex items-center space-x-4 px-10">
              <div className="flex items-center space-x-4">
                <h3 className={h2Styles}>State *</h3>
                <input className={inputStyles} type="text" />
              </div>
              <div className="flex items-center space-x-4">
                <h3 className={h2Styles}>Zip *</h3>
                <input className={inputStyles} type="text" />
              </div>
            </div>
          </div>

          <h1 className={h1Styles}>Payment</h1>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-11 px-10 ">
              <h3 className={h2Styles}>Credit Card *</h3>
              <input className={inputStyles} type="email" />
            </div>

            <div className="flex items-center space-x-4 px-10">
              <div className="flex items-center space-x-4">
                <h3 className={h2Styles}>Expiration *</h3>
                <input className={inputStyles} type="text" />
              </div>
              <div className="flex items-center space-x-4">
                <h3 className={h2Styles}>CVV *</h3>
                <input className={inputStyles} type="text" />
              </div>
            </div>
            <p className="text-white ml-11 font-semibold">* Required Field</p>
            <Link
              href="seats"
              className="border-[3px] text-white font-semibold w-max py-2 px-10 text-lg rounded-md scale-transition ml-11"
            >
              Back
            </Link>
          </div>
        </div>
        <div className="bg-dark-jade p-8 rounded-md h-max flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <p className={h2Styles}>Adult Ticket x 2</p>
            <p className={h2Styles}>Child Ticket x 1</p>
          </div>
          <div className="grid grid-cols-2 gap-4 place-items-center">
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
