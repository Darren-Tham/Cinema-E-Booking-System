"use client"

import { Dispatch, MouseEvent, SetStateAction } from "react"
import { Form } from "./page"
import { CustomerCard, CustomerHomeAddress, NewCustomer } from "@/lib/Types"
import APIFacade from "@/lib/APIFacade"
import { useRouter } from "next/navigation"
import States from "@/components/option/States"
import FormHandler from "@/lib/FormHandler"
import PageFacade from "@/lib/PageFacade"

type Props = {
  form: Form
  setForm: Dispatch<SetStateAction<Form>>
  formStyles: string
  goToPaymentInformationForm: () => Promise<void>
  paymentInformationComplete: boolean
}

const HomeAddressInformationFormComponent = ({
  form,
  setForm,
  formStyles,
  goToPaymentInformationForm,
  paymentInformationComplete
}: Readonly<Props>) => {
  const router = useRouter()

  const homeAddressEmpty = () => {
    return (
      form.homeAddress === "" &&
      form.city === "" &&
      form.state === "" &&
      form.zipcode === ""
    )
  }

  const homeAddressComplete = () => {
    return (
      form.homeAddress !== "" &&
      form.city !== "" &&
      form.state !== "" &&
      form.zipcode !== ""
    )
  }

  const validHomeAddress = () => {
    return homeAddressComplete() || homeAddressEmpty()
  }

  const addCustomer = async () => {
    const customer: NewCustomer = { ...form }
    return await APIFacade.addCustomer(customer)
  }

  const addCard = async (customerId: number) => {
    const card: CustomerCard = {
      ...form,
      customerId
    }
    await APIFacade.addCard(card)
  }

  const addHomeAddress = async (customerId: number) => {
    const homeAddress: CustomerHomeAddress = {
      ...form,
      address: form.homeAddress,
      customerId
    }
    await APIFacade.addHomeAddress(homeAddress)
  }

  const handleFormSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!validHomeAddress()) {
      alert(
        "Please either complete the home address information form correctly or delete all incomplete fields."
      )
      return
    }

    const customerId = await addCustomer()
    if (paymentInformationComplete) {
      await addCard(customerId)
    }
    if (homeAddressComplete()) {
      await addHomeAddress(customerId)
    }

    router.push(PageFacade.registrationVerificationCode(customerId))
  }

  return (
    <form className={formStyles}>
      <h1 className="h1">(Optional) Home Address Information</h1>
      <div className="flex flex-col">
        <label htmlFor="home-address" className="label">
          Home Address
        </label>
        <input
          id="home-address"
          type="text"
          className="input"
          value={form.homeAddress}
          onChange={e =>
            FormHandler.updateForm(e, "homeAddress", form, setForm)
          }
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="city" className="label">
          City
        </label>
        <input
          id="city"
          type="text"
          className="input"
          value={form.city}
          onChange={e => FormHandler.updateForm(e, "city", form, setForm)}
        />
      </div>
      <div>
        <h2 className="label">State</h2>
        <select
          className="rounded-sm font-semibold p-[0.375rem] w-full"
          onChange={e => FormHandler.updateForm(e, "state", form, setForm)}
        >
          <States />
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="zip-code" className="label">
          Zip Code
        </label>
        <input
          id="zip-code"
          type="text"
          className="input"
          value={form.zipcode}
          onChange={e =>
            FormHandler.updateFormOnlyNumbers(e, "zipcode", form, setForm)
          }
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
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default HomeAddressInformationFormComponent
