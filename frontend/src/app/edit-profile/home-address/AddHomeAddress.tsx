import States from "@/components/States"
import APIFacade from "@/lib/APIFacade"
import FormHandler from "@/lib/FormHandler"
import { Customer, CustomerHomeAddress, Email } from "@/lib/Types"
import { Dispatch, MutableRefObject, SetStateAction, useState } from "react"

type Form = {
  address: string
  city: string
  state: string
  zipcode: string
}

type Props = {
  customer: Customer
  addDialogRef: MutableRefObject<HTMLDialogElement>
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}

const AddHomeAddress = ({
  customer,
  addDialogRef,
  setDialogOpen
}: Readonly<Props>) => {
  const [form, setForm] = useState<Form>({
    address: "",
    city: "",
    state: "",
    zipcode: ""
  })

  const isValidForm = () => {
    if (form.address === "") {
      alert("Home address cannot be empty.")
      return false
    }

    if (form.city === "") {
      alert("City cannot be empty.")
      return false
    }

    if (form.state === "") {
      alert("State cannot be empty.")
      return false
    }

    if (form.zipcode === "") {
      alert("Zipcode cannot be empty.")
      return false
    }

    return true
  }

  const addHomeAddress = async () => {
    if (!isValidForm()) return
    const homeAddress: CustomerHomeAddress = {
      customerId: customer.id,
      ...form
    }
    await APIFacade.addHomeAddress(homeAddress)

    const email: Email = {
      receiverEmail: customer.email,
      subject: "Cinema E-Booking System Home Address Add",
      text: "A home address has been added to your account. If this was unexpected, please change your password to protect your account."
    }
    await APIFacade.sendEmail(email)

    window.location.reload()
  }

  return (
    <dialog
      ref={addDialogRef}
      className="bg-transparent"
      onKeyDown={e => {
        if (e.key === "Escape") {
          return
        }
      }}
    >
      <div className="bg-dark-jade p-6 flex flex-col gap-3 rounded-md border-2">
        <h2 className="bg-light-jade font-bold text-center text-2xl py-3 px-20 rounded-sm">
          Add Home Address
        </h2>
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(2, auto)" }}
        >
          <div className="p-2 rounded-sm font-semibold bg-light-jade">
            Home Address
          </div>
          <input
            className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
            value={form.address}
            onChange={e => FormHandler.updateForm(e, "address", form, setForm)}
          />
          <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
            City
          </div>
          <input
            className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
            value={form.city}
            onChange={e => FormHandler.updateForm(e, "city", form, setForm)}
          />
          <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
            State
          </div>
          <select
            className="rounded-sm font-semibold p-[0.375rem] bg-emerald-50"
            value={form.state}
            onChange={e => FormHandler.updateForm(e, "state", form, setForm)}
          >
            <States />
          </select>
          <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
            Zipcode
          </div>
          <input
            className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
            value={form.zipcode}
            onChange={e =>
              FormHandler.updateFormOnlyNumbers(e, "zipcode", form, setForm)
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            className="border-[3px] text-white font-bold p-2 hover:scale-[1.015] transition-transform duration-300"
            onClick={() => {
              addDialogRef.current.close()
              setDialogOpen(false)
            }}
          >
            Close
          </button>
          <button
            className="bg-light-jade font-bold p-2 hover:scale-[1.015] transition-transform duration-300 rounded-sm"
            onClick={addHomeAddress}
          >
            Submit
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default AddHomeAddress
