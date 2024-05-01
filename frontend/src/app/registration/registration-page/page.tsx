"use client"

export const enum FormType {
  Personal,
  Payment,
  HomeAddress
}

export type Form = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  isSubscribedForPromotions: boolean
  cardType: string
  cardNumber: string
  expirationDate: string
  cvv: string
  billingAddress: string
  homeAddress: string
  city: string
  state: string
  zipcode: string
}

import { useState } from "react"
import HomeNavbar from "@/components/HomeNavbar"
import PersonalInformationFormComponent from "./PersonalInformationFormComponent"
import PaymentInformationFormComponent from "./PaymentInformationFormComponent"
import HomeAddressInformationFormComponent from "./HomeAddressInformationFormComponent"
import APIFacade from "@/lib/APIFacade"

const RegistrationPage = () => {
  const [formType, setFormType] = useState(FormType.Personal)
  const [form, setForm] = useState<Form>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    isSubscribedForPromotions: true,
    cardType: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
    homeAddress: "",
    city: "",
    state: "",
    zipcode: ""
  })

  const goToPersonalInformationForm = () => {
    setFormType(FormType.Personal)
  }

  const goToPaymentInformationForm = async () => {
    if (!(await hasPersonalInformation())) return
    setFormType(FormType.Payment)
  }

  const goToHomeAddressForm = async () => {
    if (!validPaymentInformation()) {
      alert(
        "Please either complete the payment information form correctly or delete all incomplete fields."
      )
      return
    }
    if (!(await hasPersonalInformation())) return
    setFormType(FormType.HomeAddress)
  }

  const hasPersonalInformation = async () => {
    if (form.firstName === "") {
      alert("First name cannot be empty.")
      return false
    }
    if (form.lastName === "") {
      alert("Last name cannot be empty.")
      return false
    }
    if (form.email === "") {
      alert("Email cannot be empty.")
      return false
    }
    if (!form.email.includes("@")) {
      alert("Email must contain the @ character.")
      return false
    }
    if (await APIFacade.customerEmailExists(form.email)) {
      alert("Email is already taken.")
      return false
    }
    if (form.password === "") {
      alert("Password cannot be empty.")
      return false
    }
    if (form.password !== form.confirmPassword) {
      alert("Passwords must match.")
      return false
    }
    if (form.phoneNumber === "") {
      alert("Phone number cannot be empty.")
      return false
    }
    return true
  }

  const validPaymentInformation = () => {
    return paymentInformationComplete() || paymentInformationEmpty()
  }

  const paymentInformationComplete = () => {
    return (
      form.cardType !== "" &&
      form.cardNumber !== "" &&
      /^(?:0[1-9]|1[0-2])\/\d{4}$/.test(form.expirationDate) &&
      form.cvv !== "" &&
      form.billingAddress !== ""
    )
  }

  const paymentInformationEmpty = () => {
    return (
      form.cardType === "" &&
      form.cardNumber === "" &&
      form.expirationDate === "" &&
      form.cvv === "" &&
      form.billingAddress === ""
    )
  }

  const getFormStyles = (showForm: boolean) => {
    return `flex flex-col p-8 gap-3 w-96 ${showForm ? undefined : "hidden"}`
  }

  const getButtonStepStyles = (showForm: boolean) => {
    return `text-white text-left p-6 font-semibold ${
      showForm
        ? "bg-jade"
        : "hover:bg-light-jade transition-colors duration-300"
    }`
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <HomeNavbar />
      <div className="grow grid place-items-center">
        <div className="flex bg-dark-jade w-max rounded-sm h-max">
          <div className="flex flex-col border-r-2">
            <button
              className={getButtonStepStyles(formType === FormType.Personal)}
              onClick={goToPersonalInformationForm}
            >
              1. Personal Information
            </button>
            <button
              className={getButtonStepStyles(formType === FormType.Payment)}
              onClick={async () => await goToPaymentInformationForm()}
            >
              2. (Optional) Payment Information
            </button>
            <button
              className={getButtonStepStyles(formType === FormType.HomeAddress)}
              onClick={async () => await goToHomeAddressForm()}
            >
              3. (Optional) Home Address
            </button>
          </div>
          <PersonalInformationFormComponent
            form={form}
            setForm={setForm}
            goToPaymentInformationForm={goToPaymentInformationForm}
            formStyles={getFormStyles(formType === FormType.Personal)}
          />
          <PaymentInformationFormComponent
            form={form}
            setForm={setForm}
            formStyles={getFormStyles(formType === FormType.Payment)}
            goToPersonalInformationForm={goToPersonalInformationForm}
            goToHomeAddressForm={goToHomeAddressForm}
          />
          <HomeAddressInformationFormComponent
            form={form}
            setForm={setForm}
            formStyles={getFormStyles(formType === FormType.HomeAddress)}
            goToPaymentInformationForm={goToPaymentInformationForm}
            paymentInformationComplete={paymentInformationComplete()}
          />
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage
