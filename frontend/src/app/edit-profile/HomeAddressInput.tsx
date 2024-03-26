"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import Image from "next/image"
import PencilIcon from "@public/pencil-icon.svg"
import BluePlusIcon from "@public/blue-plus-icon.svg"
import RedDeleteIcon from "@public/red-delete-icon.svg"

type Props = {
  customerId: number | undefined
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}

type HomeAddress = {
  id: number
  address: string
  city: string
  state: string
  zipcode: string
}

export default function HomeAddressInput({
  customerId,
  setDialogOpen
}: Readonly<Props>) {
  const [homeAddress, setHomeAddress] = useState<HomeAddress>()
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const addressInputRef = useRef<HTMLInputElement | null>(null)
  const cityInputRef = useRef<HTMLInputElement | null>(null)
  const stateSelectRef = useRef<HTMLSelectElement | null>(null)
  const [zipcode, setZipcode] = useState("")

  useEffect(() => {
    async function initHomeAddress() {
      if (customerId === undefined) {
        return
      }
      const homeAddressResponse = await fetch(
        `http://localhost:8080/api/home_address/${customerId}`
      )
      if (homeAddressResponse.ok) {
        const homeAddress = await homeAddressResponse.json()
        setHomeAddress(homeAddress)
        setZipcode(homeAddress.zipcode)
      }
    }
    initHomeAddress()
  }, [customerId])

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="p-2 rounded-sm font-semibold bg-emerald-50 w-full">
            Home Address
          </div>
          {homeAddress === undefined && (
            <button className="scale-transition">
              <Image src={BluePlusIcon} alt="Blue Plus Icon" width={35} />
            </button>
          )}
        </div>
        {homeAddress !== undefined && (
          <div className="flex gap-3">
            <div
              className="p-2 rounded-sm font-semibold bg-light-jade grid gap-x-6 w-full"
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
                  dialogRef.current?.showModal()
                  setDialogOpen(true)
                }}
              >
                <Image src={PencilIcon} alt="Edit Icon" width={30} />
              </button>
              <button
                className="scale-transition w-max"
                onClick={async () => {
                  console.log(
                    await fetch(
                      `http://localhost:8080/api/home_address/delete/${homeAddress.id}`,
                      { method: "DELETE" }
                    )
                  )
                  window.location.reload()
                }}
              >
                <Image src={RedDeleteIcon} alt="Delete Icon" width={30} />
              </button>
            </div>
          </div>
        )}
      </div>
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
              defaultValue={homeAddress?.address}
              ref={addressInputRef}
            />
            <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
              City
            </div>
            <input
              className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
              defaultValue={homeAddress?.city}
              ref={cityInputRef}
            />
            <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
              State
            </div>
            <select
              className="rounded-sm font-semibold p-[0.375rem] bg-emerald-50"
              ref={stateSelectRef}
              defaultValue={homeAddress?.state}
            >
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
            <div className="bg-light-jade outline-none font-semibold p-2 rounded-sm">
              Zipcode
            </div>
            <input
              className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
              defaultValue={homeAddress?.zipcode}
              value={zipcode}
              onChange={e => {
                const { value } = e.target
                if (/^\d*$/.test(value)) {
                  setZipcode(value)
                }
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              className="border-[3px] text-white font-bold p-2 hover:scale-[1.015] transition-transform duration-300"
              onClick={() => {
                dialogRef.current?.close()
                setDialogOpen(false)
              }}
            >
              Close
            </button>
            <button
              className="bg-light-jade font-bold p-2 hover:scale-[1.015] transition-transform duration-300 rounded-sm"
              onClick={async () => {
                const address = addressInputRef.current?.value.trim()
                const city = cityInputRef.current?.value.trim()
                const state = stateSelectRef.current?.value
                if (
                  address === homeAddress?.address &&
                  city === homeAddress?.city &&
                  state === homeAddress?.state &&
                  zipcode === homeAddress?.zipcode
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
                      zipcode
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
