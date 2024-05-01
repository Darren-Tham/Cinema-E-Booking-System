"use client"

import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react"
import { Form } from "./page"
import { CustomerCard, CustomerHomeAddress, NewCustomer } from "@/lib/Types"
import APIFacade from "@/lib/APIFacade"
import { useRouter } from "next/navigation"

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

  const handleHomeAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, homeAddress: e.target.value })
  }

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, city: e.target.value })
  }

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, state: e.target.value })
  }

  const handleZipcodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: zipcode } = e.target
    if (/^\d*$/.test(zipcode)) {
      setForm({
        ...form,
        zipcode
      })
    }
  }

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

    router.push(`./registration-verification-code?id=${customerId}`)
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
          onChange={handleHomeAddressChange}
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
          onChange={handleCityChange}
        />
      </div>
      <div>
        <h2 className="label">State</h2>
        <select
          className="rounded-sm font-semibold p-[0.375rem] w-full"
          onChange={handleStateChange}
        >
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
          className="input"
          value={form.zipcode}
          onChange={handleZipcodeChange}
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
