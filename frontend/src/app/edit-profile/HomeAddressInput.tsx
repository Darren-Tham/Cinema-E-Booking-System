"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import Image from "next/image"
import PencilIcon from "@public/pencil-icon.svg"
import BluePlusIcon from "@public/blue-plus-icon.svg"
import RedDeleteIcon from "@public/red-delete-icon.svg"
import { Customer, Email, ProfileHomeAddress } from "@/lib/Types"
import APIFacade from "@/lib/APIFacade"
import States from "@/components/States"

type Props = {
  customer: Customer
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function HomeAddressInput({
  customer,
  setDialogOpen
}: Readonly<Props>) {
  const [homeAddress, setHomeAddress] = useState<ProfileHomeAddress>()
  const editDialogRef = useRef<HTMLDialogElement>(null!)
  const addDialogRef = useRef<HTMLDialogElement>(null!)
  const editAddressInputRef = useRef<HTMLInputElement>(null!)
  const editCityInputRef = useRef<HTMLInputElement>(null!)
  const editStateSelectRef = useRef<HTMLSelectElement>(null!)
  const [editZipcode, setEditZipcode] = useState("")
  const addAddressInputRef = useRef<HTMLInputElement>(null!)
  const addCityInputref = useRef<HTMLInputElement>(null!)
  const addStateSelectRef = useRef<HTMLSelectElement>(null!)
  const [addZipcode, setAddZipcode] = useState("")

  useEffect(() => {
    const fetchHomeAddress = async () => {
      const homeAddress = await APIFacade.getCustomerHomeAddress(customer.id)
      setHomeAddress(homeAddress)
      setEditZipcode(homeAddress.zipcode)
    }

    fetchHomeAddress()
  }, [customer])

  const deleteHomeAddress = async () => {
    if (homeAddress === undefined) {
      throw Error("Customer's home address is undefined.")
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

  const updateHomeAddress = async () => {
    const address = editAddressInputRef.current?.value.trim()
    const city = editCityInputRef.current?.value.trim()
    const state = editStateSelectRef.current?.value

    if (address === undefined) {
      throw Error("The customer's address is undefined.")
    }

    if (city === undefined) {
      throw Error("The customer's city is undefined.")
    }

    if (state === undefined) {
      throw Error("The customer's state is undefined.")
    }

    window.location.reload()
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="p-2 rounded-sm font-semibold bg-light-jade w-full">
            Home Address
          </div>
          {homeAddress === undefined && (
            <button
              className="scale-transition"
              onClick={() => {
                addDialogRef.current?.showModal()
                setDialogOpen(true)
              }}
            >
              <Image src={BluePlusIcon} alt="Blue Plus Icon" width={35} />
            </button>
          )}
        </div>
        {homeAddress !== undefined && (
          <div className="flex gap-3">
            <div
              className="p-2 rounded-sm font-semibold bg-emerald-50 grid gap-x-6 w-full"
              style={{ gridTemplateColumns: "repeat(2, auto)" }}
            >
              <p>Home Address</p>
              <p>{homeAddress?.address}</p>
              <p>City</p>
              <p>{homeAddress?.city}</p>
              <p>State</p>
              <p>{homeAddress?.state}</p>
              <p>Zipcode</p>
              <p>{homeAddress?.zipcode}</p>
            </div>
            <div className="flex flex-col justify-evenly">
              <button
                className="scale-transition w-max"
                onClick={() => {
                  editDialogRef.current?.showModal()
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
      </div>
      <dialog
        ref={editDialogRef}
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
              defaultValue={homeAddress?.address}
              ref={editAddressInputRef}
            />
            <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
              City
            </div>
            <input
              className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
              defaultValue={homeAddress?.city}
              ref={editCityInputRef}
            />
            <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
              State
            </div>
            <select
              className="rounded-sm font-semibold p-[0.375rem] bg-emerald-50"
              ref={editStateSelectRef}
              defaultValue={homeAddress?.state}
            >
              <States />
            </select>
            <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
              Zipcode
            </div>
            <input
              className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
              defaultValue={homeAddress?.zipcode}
              value={editZipcode}
              onChange={e => {
                const { value } = e.target
                if (/^\d*$/.test(value)) {
                  setEditZipcode(value)
                }
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              className="border-[3px] text-white font-bold p-2 hover:scale-[1.015] transition-transform duration-300"
              onClick={() => {
                editDialogRef.current?.close()
                setDialogOpen(false)
              }}
            >
              Close
            </button>
            <button
              className="bg-light-jade font-bold p-2 hover:scale-[1.015] transition-transform duration-300 rounded-sm"
              onClick={async () => {
                const address = editAddressInputRef.current?.value.trim()
                const city = editCityInputRef.current?.value.trim()
                const state = editStateSelectRef.current?.value
                if (
                  address === homeAddress?.address &&
                  city === homeAddress?.city &&
                  state === homeAddress?.state &&
                  editZipcode === homeAddress?.zipcode
                ) {
                  alert(
                    "The updated home address is the same as the current home address!"
                  )
                } else {
                  await fetch("http://localhost:8080/api/home_address/update", {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      id: homeAddress?.id,
                      address,
                      city,
                      state,
                      zipcode: editZipcode
                    })
                  })
                  await fetch("http://localhost:8080/api/email/profile", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      receiverEmail: customer.email,
                      subject: "Cinema E-Booking System Home Address Update",
                      text: "The home address in your account has been updated. If this was unexpected, please change your password to protect your account."
                    })
                  })
                  window.location.reload()
                }
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
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
              ref={addAddressInputRef}
            />
            <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
              City
            </div>
            <input
              className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
              ref={addCityInputref}
            />
            <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
              State
            </div>
            <select
              className="rounded-sm font-semibold p-[0.375rem] bg-emerald-50"
              ref={addStateSelectRef}
            >
              <States />
            </select>
            <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
              Zipcode
            </div>
            <input
              className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
              value={addZipcode}
              onChange={e => {
                const { value } = e.target
                if (/^\d*$/.test(value)) {
                  setAddZipcode(value)
                }
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              className="border-[3px] text-white font-bold p-2 hover:scale-[1.015] transition-transform duration-300"
              onClick={() => {
                addDialogRef.current?.close()
                setDialogOpen(false)
              }}
            >
              Close
            </button>
            <button
              className="bg-light-jade font-bold p-2 hover:scale-[1.015] transition-transform duration-300 rounded-sm"
              onClick={async () => {
                const address = addAddressInputRef.current?.value.trim()
                const city = addCityInputref.current?.value.trim()
                const state = addStateSelectRef.current?.value
                if (address === "") {
                  alert("Home address cannot be empty.")
                } else if (city === "") {
                  alert("City cannot be empty.")
                } else if (state === "") {
                  alert("State cannot be empty.")
                } else if (addZipcode === "") {
                  alert("Zipcode cannot be empty.")
                } else {
                  await fetch("http://localhost:8080/api/home_address/add", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      customerId: customer.id,
                      address,
                      city,
                      state,
                      zipcode: addZipcode
                    })
                  })
                  await fetch("http://localhost:8080/api/email/profile", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      receiverEmail: customer.email,
                      subject: "Cinema E-Booking System Home Address Add",
                      text: "A home address has been added to your account. If this was unexpected, please change your password to protect your account."
                    })
                  })
                  window.location.reload()
                }
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
