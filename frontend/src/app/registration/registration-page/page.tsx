"use client"

type Customer = {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: string
  isSubscribedForPromotions: boolean
  verificationCode: string
}

type Card = {
  customerId: number
  cardType: string
  cardNumber: string
  expirationDate: string
  billingAddress: string
}

type HomeAddress = {
  customerId: number
  address: string
  city: string
  state: string
  zipcode: string
}

type Email = {
  receiverEmail: string
  verificationCode: string
}

import Link from "next/link"
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import HomeNavbar from "@/components/HomeNavbar"

export default function RegistrationPage() {
  const router = useRouter()
  const [showPersonalInformationForm, setShowPersonalInformationForm] =
    useState(true)
  const [showPaymentInformationForm, setShowPaymentInformationForm] =
    useState(false)
  const [showHomeAddressForm, setShowHomeAddressForm] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const promotionSubscriptionRef = useRef<HTMLInputElement | null>(null)
  const creditCardTypeRef = useRef<HTMLSelectElement | null>(null)
  const [creditCardNumber, setCreditCardNumber] = useState("")
  const [expirationDate, setExpirationDate] = useState("")
  const [cvv, setCVV] = useState("")
  const billingAddressRef = useRef<HTMLInputElement | null>(null)
  const homeAddressRef = useRef<HTMLInputElement | null>(null)
  const cityRef = useRef<HTMLInputElement | null>(null)
  const stateRef = useRef<HTMLSelectElement | null>(null)
  const [zipcode, setZipcode] = useState("")

  function goToPersonalInformationForm() {
    setShowPersonalInformationForm(true)
    setShowPaymentInformationForm(false)
    setShowHomeAddressForm(false)
  }

  function goToPaymentInformationForm() {
    if (hasPersonalInformation()) {
      setShowPersonalInformationForm(false)
      setShowPaymentInformationForm(true)
      setShowHomeAddressForm(false)
    }
  }

  function goToHomeAddressForm() {
    if (!validPaymentInformation()) {
      alert(
        "Please either complete the payment information form correctly or delete all incomplete fields."
      )
      return
    }
    if (hasPersonalInformation()) {
      setShowPersonalInformationForm(false)
      setShowPaymentInformationForm(false)
      setShowHomeAddressForm(true)
    }
  }

  function hasPersonalInformation() {
    if (firstName === "") {
      alert("First name cannot be empty.")
      return false
    }
    if (lastName === "") {
      alert("Last name cannot be empty.")
      return false
    }
    if (email === "") {
      alert("Email cannot be empty.")
      return false
    }
    if (!email.includes("@")) {
      alert("Email must contain the @ character.")
      return false
    }
    const password = passwordRef.current?.value
    const confirmPassword = confirmPasswordRef.current?.value
    if (password === "") {
      alert("Password cannot be empty.")
      return false
    }
    if (password !== confirmPassword) {
      alert("Passwords must match.")
      return false
    }
    if (phoneNumber === "") {
      alert("Phone number cannot be empty.")
      return false
    }
    return true
  }

  function validPaymentInformation() {
    return paymentInformationComplete() || paymentInformationEmpty()
  }

  function paymentInformationComplete() {
    return (
      creditCardTypeRef.current?.value !== "" &&
      creditCardNumber !== "" &&
      /^\d{2}\/\d{4}$/.test(expirationDate) &&
      cvv !== "" &&
      billingAddressRef.current?.value !== ""
    )
  }

  function paymentInformationEmpty() {
    return (
      creditCardTypeRef.current?.value === "" &&
      creditCardNumber === "" &&
      expirationDate === "" &&
      cvv === "" &&
      billingAddressRef.current?.value === ""
    )
  }

  function validHomeAddress() {
    return homeAddressComplete() || homeAddressEmpty()
  }

  function homeAddressComplete() {
    return (
      homeAddressRef.current?.value !== "" &&
      cityRef.current?.value !== "" &&
      stateRef.current?.value !== "" &&
      zipcode !== ""
    )
  }

  function homeAddressEmpty() {
    return (
      homeAddressRef.current?.value === "" &&
      cityRef.current?.value === "" &&
      stateRef.current?.value === "" &&
      zipcode === ""
    )
  }

  function getCustomer(verificationCode: string): Customer {
    if (passwordRef.current === null) {
      throw Error("passwordRef should not be null.")
    }
    if (promotionSubscriptionRef.current === null) {
      throw Error("promotionSubscriptionRef should not be null.")
    }
    return {
      firstName,
      lastName,
      email,
      password: passwordRef.current.value,
      phoneNumber,
      isSubscribedForPromotions: promotionSubscriptionRef.current.checked,
      verificationCode
    }
  }

  async function addCustomer(verificationCode: string) {
    const customer = getCustomer(verificationCode)
    const response = await fetch("http://localhost:8080/api/customer/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
    const customerId = await response.text()
    return parseInt(customerId)
  }

  function getCard(customerId: number): Card {
    if (creditCardTypeRef.current === null) {
      throw Error("creditCardTypeRef should not be null.")
    }
    if (billingAddressRef.current === null) {
      throw Error("billingAddressRef should not be null.")
    }
    const { value: cardType } = creditCardTypeRef.current
    const { value: billingAddress } = billingAddressRef.current
    return {
      customerId,
      cardType,
      cardNumber: creditCardNumber,
      expirationDate,
      billingAddress
    }
  }

  async function addCard(customerId: number) {
    const card = getCard(customerId)
    await fetch("http://localhost:8080/api/card/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(card)
    })
  }

  function getHomeAddress(customerId: number): HomeAddress {
    if (homeAddressRef.current === null) {
      throw Error("homeAddressRef should not be null.")
    }
    if (cityRef.current === null) {
      throw Error("cityRef should not be null.")
    }
    if (stateRef.current === null) {
      throw Error("stateRef should not be null.")
    }
    return {
      customerId,
      address: homeAddressRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      zipcode: zipcode
    }
  }

  async function addHomeAddress(customerId: number) {
    const homeAddress = getHomeAddress(customerId)
    await fetch("http://localhost:8080/api/home_address/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(homeAddress)
    })
  }

  function getEmail(verificationCode: string): Email {
    return {
      receiverEmail: email,
      verificationCode
    }
  }

  async function sendEmail(verificationCode: string) {
    const email = getEmail(verificationCode)
    await fetch("http://localhost:8080/api/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(email)
    })
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
                <input
                  id="first-name"
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={e => setValueWithNoSpaces(e, setFirstName)}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label htmlFor="last-name" className="label">
                  Last Name *
                </label>
                <input
                  id="last-name"
                  type="text"
                  value={lastName}
                  className="input"
                  onChange={e => setValueWithNoSpaces(e, setLastName)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="label">
                Email *
              </label>
              <input
                id="email"
                type="text"
                value={email}
                className="input"
                onChange={e => setValueWithNoSpaces(e, setEmail)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="label">
                Password *
              </label>
              <input
                id="password"
                type="password"
                className="input"
                ref={passwordRef}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="confirm-password" className="label">
                Confirm Password *
              </label>
              <input
                id="confirm-password"
                type="password"
                className="input"
                ref={confirmPasswordRef}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone-number" className="label">
                Phone Number *
              </label>
              <input
                id="phone-number"
                type="text"
                value={phoneNumber}
                className="input"
                onChange={e => setValueWithOnlyDigits(e, setPhoneNumber)}
              />
            </div>
            <div className="flex items-center gap-2 mt-2 mb-1">
              <input
                id="promotions"
                type="checkbox"
                className="w-6 aspect-square"
                ref={promotionSubscriptionRef}
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
              <select className={selectStyles} ref={creditCardTypeRef}>
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
              <input
                id="credit-card-number"
                type="text"
                value={creditCardNumber}
                className="input"
                onChange={e => setValueWithOnlyDigits(e, setCreditCardNumber)}
              />
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col">
                <label htmlFor="expiration-date" className="label">
                  Expiration Date
                </label>
                <input
                  id="expiration-date"
                  type="text"
                  value={expirationDate}
                  placeholder="MM/YYYY"
                  className="input"
                  onChange={e => {
                    const { value } = e.target
                    if (
                      /(?:\d|\/)*/.test(value) &&
                      value.length <= 7 &&
                      value.indexOf("/") === value.lastIndexOf("/")
                    ) {
                      setExpirationDate(value)
                    }
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="cvv" className="label">
                  CVV
                </label>
                <input
                  id="cvv"
                  type="text"
                  value={cvv}
                  className="input"
                  onChange={e => setValueWithOnlyDigits(e, setCVV)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="billing-address" className="label">
                Billing Address
              </label>
              <input
                id="billing-address"
                type="text"
                className="input"
                ref={billingAddressRef}
              />
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
              <input
                id="home-address"
                type="text"
                className="input"
                ref={homeAddressRef}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className="label">
                City
              </label>
              <input id="city" type="text" className="input" ref={cityRef} />
            </div>
            <div>
              <h2 className="label">State</h2>
              <select className={selectStyles} ref={stateRef}>
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
                <option>New Hampshire</option>
                <option>New Jersey</option>
                <option>New Mexico</option>
                <option>New York</option>
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
              <input
                id="zip-code"
                type="text"
                value={zipcode}
                className="input"
                onChange={e => setValueWithOnlyDigits(e, setZipcode)}
              />
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
                onClick={async e => {
                  e.preventDefault()
                  if (!validHomeAddress()) {
                    alert(
                      "Please either complete the home address information form correctly or delete all incomplete fields."
                    )
                    return
                  }

                  const verificationCode = generateVerificationCode()
                  const customerId = await addCustomer(verificationCode)
                  if (paymentInformationComplete()) {
                    await addCard(customerId)
                  }
                  if (homeAddressComplete()) {
                    await addHomeAddress(customerId)
                  }
                  await sendEmail(verificationCode)
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

function setValueWithNoSpaces(
  e: ChangeEvent<HTMLInputElement>,
  setValue: Dispatch<SetStateAction<string>>
) {
  const { value } = e.target
  if (!value.includes(" ")) {
    setValue(value)
  }
}

function setValueWithOnlyDigits(
  e: ChangeEvent<HTMLInputElement>,
  setValue: Dispatch<SetStateAction<string>>
) {
  const { value } = e.target
  if (/^\d*$/.test(value)) {
    setValue(value)
  }
}

function generateVerificationCode() {
  const randomNumber = Math.floor(Math.random() * 1_000_000)
  let verificationCode = randomNumber.toString()
  while (verificationCode.length < 6) {
    verificationCode = "0" + verificationCode
  }
  return verificationCode
}
