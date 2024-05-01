"use client"

import States from "@/components/States"
import APIFacade from "@/lib/APIFacade"
import { Customer, Email, ProfileHomeAddress } from "@/lib/Types"
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from "react"
import Image from "next/image"
import PencilIcon from "@public/pencil-icon.svg"
import RedDeleteIcon from "@public/red-delete-icon.svg"

type Props = {
  homeAddress: ProfileHomeAddress | undefined
  customer: Customer
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}

const HomeAddressComponent = ({
  homeAddress,
  customer,
  setDialogOpen
}: Readonly<Props>) => {
  const [form, setForm] = useState<ProfileHomeAddress>()
  const dialogRef = useRef<HTMLDialogElement>(null!)

  useEffect(() => {
    if (homeAddress !== undefined) {
      setForm({ ...homeAddress })
    }
  }, [homeAddress])

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (form !== undefined) {
      setForm({ ...form, address: e.target.value })
    }
  }

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (form !== undefined) {
      setForm({ ...form, city: e.target.value })
    }
  }

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (form !== undefined) {
      setForm({ ...form, state: e.target.value })
    }
  }

  const handleZipcodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: zipcode } = e.target
    if (/^\d*$/.test(zipcode) && form !== undefined) {
      setForm({ ...form, zipcode })
    }
  }

  const isValidForm = () => {
    if (
      homeAddress?.address === form?.address &&
      homeAddress?.city === form?.city &&
      homeAddress?.state === form?.state &&
      homeAddress?.zipcode === form?.zipcode
    ) {
      alert("The updated home address is the same as the current home address!")
      return false
    }

    if (form?.address === "") {
      alert("Home address cannot be empty.")
      return false
    }

    if (form?.city === "") {
      alert("City cannot be empty.")
      return false
    }

    if (form?.state === "") {
      alert("State cannot be empty.")
      return false
    }

    if (form?.zipcode === "") {
      alert("Zipcode cannot be empty.")
      return false
    }

    return true
  }

  const updateHomeAddress = async () => {
    if (form === undefined) {
      throw Error("Form is undefined.")
    }

    if (!isValidForm()) return
    await APIFacade.updateHomeAddress(form)
    const email: Email = {
      receiverEmail: customer.email,
      subject: "Cinema E-Booking System Home Address Update",
      text: "The home address in your account has been updated. If this was unexpected, please change your password to protect your account."
    }
    await APIFacade.sendEmail(email)
    window.location.reload()
  }

  const deleteHomeAddress = async () => {
    if (homeAddress === undefined) {
      throw Error("Home address is undefined.")
    }

    await APIFacade.deleteHomeAddress(homeAddress.id)
    const emailDTO: Email = {
      receiverEmail: customer.email,
      subject: "Cinema E-Booking System Home Address Delete",
      text: "The home address in your account has been deleted. If this was unexpected, please change your password to protect your account."
    }
    await APIFacade.sendEmail(emailDTO)

    window.location.reload()
  }

  return (
    <>
      {homeAddress !== undefined && (
        <div className="flex gap-3">
          <div
            className="p-2 rounded-sm font-semibold bg-emerald-50 grid gap-x-6 w-full"
            style={{ gridTemplateColumns: "repeat(2, auto)" }}
          >
            <p>Home Address</p>
            <p>{homeAddress.address}</p>
            <p>City</p>
            <p>{homeAddress.city}</p>
            <p>State</p>
            <p>{homeAddress.state}</p>
            <p>Zipcode</p>
            <p>{homeAddress.zipcode}</p>
          </div>
          <div className="flex flex-col justify-evenly">
            <button
              className="scale-transition w-max"
              onClick={() => {
                dialogRef.current.showModal()
                setDialogOpen(true)
              }}
            >
              <Image src={PencilIcon} alt="Edit Icon" width={30} />
            </button>
            <button
              className="scale-transition w-max"
              onClick={deleteHomeAddress}
            >
              <Image src={RedDeleteIcon} alt="Delete Icon" width={30} />
            </button>
          </div>
        </div>
      )}
      {form !== undefined && (
        <dialog
          ref={dialogRef}
          className="bg-transparent"
          onKeyDown={e => {
            if (e.key === "Escape") {
              return
            }
          }}
        >
          <div className="bg-dark-jade p-6 flex flex-col gap-3 rounded-md border-2">
            <h2 className="bg-light-jade font-bold text-center text-2xl py-3 px-20 rounded-sm">
              Edit Home Address
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
                onChange={handleAddressChange}
              />
              <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
                City
              </div>
              <input
                className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
                value={form.city}
                onChange={handleCityChange}
              />
              <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
                State
              </div>
              <select
                className="rounded-sm font-semibold p-[0.375rem] bg-emerald-50"
                value={form.state}
                onChange={handleStateChange}
              >
                <States />
              </select>
              <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
                Zipcode
              </div>
              <input
                className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
                value={form.zipcode}
                onChange={handleZipcodeChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                className="border-[3px] text-white font-bold p-2 hover:scale-[1.015] transition-transform duration-300"
                onClick={() => {
                  dialogRef.current.close()
                  setDialogOpen(false)
                }}
              >
                Close
              </button>
              <button
                className="bg-light-jade font-bold p-2 hover:scale-[1.015] transition-transform duration-300 rounded-sm"
                onClick={updateHomeAddress}
              >
                Submit
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  )
}

export default HomeAddressComponent
