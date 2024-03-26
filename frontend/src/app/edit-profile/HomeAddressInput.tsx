"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import Image from "next/image"
import PencilIcon from "@public/pencil-icon.svg"
import BluePlusIcon from "@public/blue-plus-icon.svg"

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
            <button
              className="self-center scale-transition w-max"
              onClick={() => {
                dialogRef.current?.showModal()
                setDialogOpen(true)
              }}
            >
              <Image src={PencilIcon} alt="Edit Icon" width={30} />
            </button>
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
            >
              <option selected={homeAddress?.state === "Alabama"}>
                Alabama
              </option>
              <option selected={homeAddress?.state === "Alaska"}>Alaska</option>
              <option selected={homeAddress?.state === "Arizona"}>
                Arizona
              </option>
              <option selected={homeAddress?.state === "Arkansas"}>
                Arkansas
              </option>
              <option selected={homeAddress?.state === "California"}>
                California
              </option>
              <option selected={homeAddress?.state === "Colorado"}>
                Colorado
              </option>
              <option selected={homeAddress?.state === "Connecticut"}>
                Connecticut
              </option>
              <option selected={homeAddress?.state === "Delaware"}>
                Delaware
              </option>
              <option selected={homeAddress?.state === "Florida"}>
                Florida
              </option>
              <option selected={homeAddress?.state === "Georgia"}>
                Georgia
              </option>
              <option selected={homeAddress?.state === "Hawaii"}>Hawaii</option>
              <option selected={homeAddress?.state === "Idaho"}>Idaho</option>
              <option selected={homeAddress?.state === "Illinois"}>
                Illinois
              </option>
              <option selected={homeAddress?.state === "Indiana"}>
                Indiana
              </option>
              <option selected={homeAddress?.state === "Iowa"}>Iowa</option>
              <option selected={homeAddress?.state === "Kansas"}>Kansas</option>
              <option selected={homeAddress?.state === "Kentucky"}>
                Kentucky
              </option>
              <option selected={homeAddress?.state === "Louisiana"}>
                Louisiana
              </option>
              <option selected={homeAddress?.state === "Maine"}>Maine</option>
              <option selected={homeAddress?.state === "Maryland"}>
                Maryland
              </option>
              <option selected={homeAddress?.state === "Massachusetts"}>
                Massachusetts
              </option>
              <option selected={homeAddress?.state === "Michigan"}>
                Michigan
              </option>
              <option selected={homeAddress?.state === "Minnesota"}>
                Minnesota
              </option>
              <option selected={homeAddress?.state === "Mississippi"}>
                Mississippi
              </option>
              <option selected={homeAddress?.state === "Missouri"}>
                Missouri
              </option>
              <option selected={homeAddress?.state === "Montana"}>
                Montana
              </option>
              <option selected={homeAddress?.state === "Nebraska"}>
                Nebraska
              </option>
              <option selected={homeAddress?.state === "Nevada"}>Nevada</option>
              <option selected={homeAddress?.state === "New Hampshire"}>
                New Hampshire
              </option>
              <option selected={homeAddress?.state === "New Jersey"}>
                New Jersey
              </option>
              <option selected={homeAddress?.state === "New Mexico"}>
                New Mexico
              </option>
              <option selected={homeAddress?.state === "New York"}>
                New York
              </option>
              <option selected={homeAddress?.state === "North"}>North</option>
              <option selected={homeAddress?.state === "Carolina"}>
                Carolina
              </option>
              <option selected={homeAddress?.state === "North"}>North</option>
              <option selected={homeAddress?.state === "Dakota"}>Dakota</option>
              <option selected={homeAddress?.state === "Ohio"}>Ohio</option>
              <option selected={homeAddress?.state === "Oklahoma"}>
                Oklahoma
              </option>
              <option selected={homeAddress?.state === "Oregon"}>Oregon</option>
              <option selected={homeAddress?.state === "Pennsylvania"}>
                Pennsylvania
              </option>
              <option selected={homeAddress?.state === "Rhode"}>Rhode</option>
              <option selected={homeAddress?.state === "Island"}>Island</option>
              <option selected={homeAddress?.state === "South"}>South</option>
              <option selected={homeAddress?.state === "Carolina"}>
                Carolina
              </option>
              <option selected={homeAddress?.state === "South"}>South</option>
              <option selected={homeAddress?.state === "Dakota"}>Dakota</option>
              <option selected={homeAddress?.state === "Tennessee"}>
                Tennessee
              </option>
              <option selected={homeAddress?.state === "Texas"}>Texas</option>
              <option selected={homeAddress?.state === "Utah"}>Utah</option>
              <option selected={homeAddress?.state === "Vermont"}>
                Vermont
              </option>
              <option selected={homeAddress?.state === "Virginia"}>
                Virginia
              </option>
              <option selected={homeAddress?.state === "Washington"}>
                Washington
              </option>
              <option selected={homeAddress?.state === "West"}>West</option>
              <option selected={homeAddress?.state === "Virginia"}>
                Virginia
              </option>
              <option selected={homeAddress?.state === "Wisconsin"}>
                Wisconsin
              </option>
              <option selected={homeAddress?.state === "Wyoming"}>
                Wyoming
              </option>
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
