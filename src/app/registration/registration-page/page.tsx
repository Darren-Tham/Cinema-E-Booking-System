"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import HomeNavbar from "@/components/HomeNavbar"
import PhoneInput from "react-phone-number-input/input"

export default function RegistrationPage() {
  const router = useRouter()
  const [showPersonalInformationForm, setShowPersonalInformationForm] =
    useState(true)
  const [showPaymentInformationForm, setShowPaymentInformationForm] =
    useState(false)
  const [showHomeAddressForm, setShowHomeAddressForm] = useState(false)

  function goToPersonalInformationForm() {
    setShowPersonalInformationForm(true)
    setShowPaymentInformationForm(false)
    setShowHomeAddressForm(false)
  }

  function goToPaymentInformationForm() {
    setShowPersonalInformationForm(false)
    setShowPaymentInformationForm(true)
    setShowHomeAddressForm(false)
  }

  function goToHomeAddressForm() {
    setShowPersonalInformationForm(false)
    setShowPaymentInformationForm(false)
    setShowHomeAddressForm(true)
  }

  const selectStyles = "rounded-sm font-semibold p-[0.375rem] w-full"

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <HomeNavbar />
      <div className="grow grid place-items-center">
        <div className="flex bg-dark-jade w-max rounded-sm h-max">
          <div className="flex flex-col border-r-2">
            <button
              className={getButtonStepStyles(showPersonalInformationForm)}
              onClick={goToPersonalInformationForm}
            >
              1. Personal Information
            </button>
            <button
              className={getButtonStepStyles(showPaymentInformationForm)}
              onClick={goToPaymentInformationForm}
            >
              2. (Optional) Payment Information
            </button>
            <button
              className={getButtonStepStyles(showHomeAddressForm)}
              onClick={goToHomeAddressForm}
            >
              3. (Optional) Home Address
            </button>
          </div>
          <form className={getFormStyles(showPersonalInformationForm)}>
            <h1 className="h1">Personal Information</h1>
            <div className="flex gap-3">
              <div className="flex flex-col w-1/2">
                <label htmlFor="first-name" className="label">
                  First Name *
                </label>
                <input id="first-name" type="text" className="input" />
              </div>
              <div className="flex flex-col w-1/2">
                <label htmlFor="last-name" className="label">
                  Last Name *
                </label>
                <input id="last-name" type="text" className="input" />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="label">
                Email *
              </label>
              <input id="email" type="text" className="input" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="label">
                Password *
              </label>
              <input id="password" type="password" className="input" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone-number" className="label">
                Phone Number *
              </label>
              <PhoneInput
                id="phone-number"
                country="US"
                maxLength={14}
                onChange={e => e}
                className="input"
              />
            </div>
            <div className="flex items-center gap-2 mt-2 mb-1">
              <input
                id="promotions"
                type="checkbox"
                className="w-6 aspect-square"
              />
              <label htmlFor="promotions" className="label select-none">
                Subscribe For Promotions
              </label>
            </div>
            <button
              type="button"
              className="action-button w-full mt-0"
              onClick={goToPaymentInformationForm}
            >
              Next
            </button>
            <div className="flex justify-center">
              <p className="inline text-white font-semibold mr-3">
                Already Have An Account?
              </p>
              <Link
                href="/login/login-page"
                className="inline-block font-semibold text-bright-jade hover:scale-[1.075] transition-transform duration-300"
              >
                Log In
              </Link>
            </div>
            <p className="text-white font-semibold text-sm">* Required Field</p>
          </form>
          <form className={getFormStyles(showPaymentInformationForm)}>
            <h1 className="h1">(Optional) Payment Information</h1>
            <div
              className="grid gap-3 items-center"
              style={{
                gridTemplateColumns: "max-content auto"
              }}
            >
              <h2 className="label">Credit Card Type</h2>
              <select className={selectStyles}>
                <option />
                <option>Visa</option>
                <option>Mastercard</option>
                <option>American Express</option>
                <option>Discover</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="credit-card-number" className="label">
                Credit Card Number
              </label>
              <input id="credit-card-number" type="text" className="input" />
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col">
                <label htmlFor="expiration-date" className="label">
                  Expiration Date
                </label>
                <input
                  id="expiration-date"
                  type="text"
                  placeholder="MM/YYYY"
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="cvv" className="label">
                  CVV
                </label>
                <input id="cvv" type="password" className="input" />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="billing-address" className="label">
                Billing Address
              </label>
              <input id="billing-address" type="text" className="input" />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="back-button"
                onClick={goToPersonalInformationForm}
              >
                Back
              </button>
              <button
                type="button"
                className="action-button"
                onClick={goToHomeAddressForm}
              >
                Next
              </button>
            </div>
          </form>
          <form className={getFormStyles(showHomeAddressForm)}>
            <h1 className="h1">(Optional) Home Address Information</h1>
            <div className="flex flex-col">
              <label htmlFor="home-address" className="label">
                Home Address
              </label>
              <input id="home-address" type="text" className="input" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className="label">
                City
              </label>
              <input id="city" type="text" className="input" />
            </div>
            <div>
              <h2 className="label">State</h2>
              <select className={selectStyles}>
                <option />
                <option>Alabama</option>
                <option>Alaska</option>
                <option>Arizona</option>
                <option>Arkansas</option>
                <option>California</option>
                <option>Colorado</option>
                <option>Connecticut</option>
                <option>Delaware</option>
                <option>Florida</option>
                <option>Georgia</option>
                <option>Hawaii</option>
                <option>Idaho</option>
                <option>Illinois</option>
                <option>Indiana</option>
                <option>Iowa</option>
                <option>Kansas</option>
                <option>Kentucky</option>
                <option>Louisiana</option>
                <option>Maine</option>
                <option>Maryland</option>
                <option>Massachusetts</option>
                <option>Michigan</option>
                <option>Minnesota</option>
                <option>Mississippi</option>
                <option>Missouri</option>
                <option>Montana</option>
                <option>Nebraska</option>
                <option>Nevada</option>
                <option>New</option>
                <option>Hampshire</option>
                <option>New</option>
                <option>Jersey</option>
                <option>New</option>
                <option>Mexico</option>
                <option>New</option>
                <option>York</option>
                <option>North</option>
                <option>Carolina</option>
                <option>North</option>
                <option>Dakota</option>
                <option>Ohio</option>
                <option>Oklahoma</option>
                <option>Oregon</option>
                <option>Pennsylvania</option>
                <option>Rhode</option>
                <option>Island</option>
                <option>South</option>
                <option>Carolina</option>
                <option>South</option>
                <option>Dakota</option>
                <option>Tennessee</option>
                <option>Texas</option>
                <option>Utah</option>
                <option>Vermont</option>
                <option>Virginia</option>
                <option>Washington</option>
                <option>West</option>
                <option>Virginia</option>
                <option>Wisconsin</option>
                <option>Wyoming</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="zip-code" className="label">
                Zip Code
              </label>
              <input id="zip-code" type="text" className="input" />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="back-button"
                onClick={goToPaymentInformationForm}
              >
                Back
              </button>
              <button
                type="submit"
                className="action-button"
                onClick={e => {
                  e.preventDefault()
                  router.push("./registration-verification-code")
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function getFormStyles(showForm: boolean) {
  return `flex flex-col p-8 gap-3 w-96 ${showForm ? undefined : "hidden"}`
}

function getButtonStepStyles(showForm: boolean) {
  return `text-white text-left p-6 font-semibold ${
    showForm ? "bg-jade" : "hover:bg-light-jade transition-colors duration-300"
  }`
}
