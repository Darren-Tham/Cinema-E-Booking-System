"use client"

import Image from "next/image"
import Link from "next/link"
import BluePlusIcon from "@public/blue-plus-icon.svg"
import PencilIcon from "@public/pencil-icon.svg"
import { MutableRefObject, KeyboardEvent, useRef, useState } from "react"

export default function EditProfile() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState("")
  const firstNameDialogRef = useRef<HTMLDialogElement | null>(null)
  const lastNameDialogRef = useRef<HTMLDialogElement | null>(null)
  const phoneNumberDialogRef = useRef<HTMLDialogElement | null>(null)
  const homeAddressDialogRef = useRef<HTMLDialogElement | null>(null)
  const boxStyles = "p-2 rounded-sm font-semibold"
  const jadeBoxStyles = `${boxStyles} bg-light-jade`
  const emeraldBoxStyles = `${boxStyles} bg-emerald-50`

  function editButton(dialogRef: MutableRefObject<HTMLDialogElement | null>) {
    return (
      <button
        className="self-center scale-transition w-max"
        onClick={() => {
          dialogRef.current?.showModal()
          setDialogOpen(true)
        }}
      >
        <Image src={PencilIcon} alt="Edit Icon" width={30} />
      </button>
    )
  }

  function dialog(
    dialogRef: MutableRefObject<HTMLDialogElement | null>,
    heading: string
  ) {
    return (
      <dialog
        ref={dialogRef}
        className="bg-transparent"
        onKeyDown={preventEscape}
      >
        <div className="bg-dark-jade p-6 flex flex-col gap-3 rounded-md border-2">
          <h2 className="bg-light-jade font-bold text-center text-2xl py-3 px-20 rounded-sm">
            Edit {heading}
          </h2>
          <input
            className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
            placeholder={`Enter updated ${heading.toLowerCase()}...`}
          />
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
            <button className="bg-light-jade font-bold p-2 hover:scale-[1.015] transition-transform duration-300 rounded-sm">
              Submit
            </button>
          </div>
        </div>
      </dialog>
    )
  }

  return (
    <>
      <div className="flex flex-col bg-black h-screen items-center justify-center p-6">
        <div
          className={`flex flex-col bg-dark-jade items-center gap-10 rounded-lg p-8 overflow-auto ${
            dialogOpen ? "blur-md" : undefined
          }`}
        >
          <h1 className="text-white text-4xl font-semibold">Edit Profile</h1>
          <div className="flex">
            <div>
              <Image
                className="bg-white rounded-full"
                src="https://static.thenounproject.com/png/363633-200.png"
                alt="pfp"
                width={140}
                height={140}
              />
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <div
                className="grid gap-x-6 gap-y-3"
                style={{ gridTemplateColumns: "repeat(3, auto)" }}
              >
                <div className={jadeBoxStyles}>First Name</div>
                <div className={jadeBoxStyles}>Darren</div>
                {editButton(firstNameDialogRef)}
                <div className={emeraldBoxStyles}>Last Name</div>
                <div className={emeraldBoxStyles}>Thammavong</div>
                {editButton(lastNameDialogRef)}
                <div className={jadeBoxStyles}>Email</div>
                <div className={jadeBoxStyles}>darrent9859@gmail.com</div>
                <div />
                <div className={emeraldBoxStyles}>Phone Number</div>
                <div className={emeraldBoxStyles}>6789252555</div>
                {editButton(phoneNumberDialogRef)}
              </div>
              <button
                className={`${jadeBoxStyles} hover:scale-[1.015] transition-transform duration-300`}
              >
                Change Password
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <div className={`${jadeBoxStyles} w-full`}>Credit Cards</div>
                {addButton()}
              </div>
              <div className="flex gap-3">
                <div
                  className={`${emeraldBoxStyles} grid gap-x-6 w-full`}
                  style={{ gridTemplateColumns: "repeat(2, auto)" }}
                >
                  <p>Credit Card Type</p>
                  <p>Visa</p>
                  <p>Credit Card Number</p>
                  <p>5555555555555555</p>
                  <p>Expiration Date</p>
                  <p>MM/YYYY</p>
                  <p>Billing Address</p>
                  <p>123 Example St.</p>
                </div>
                {/* {editButton()} */}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <div className={`${emeraldBoxStyles} w-full`}>Home Address</div>
                {addButton()}
              </div>
              <div className="flex gap-3">
                <div
                  className={`${jadeBoxStyles} grid gap-x-6 w-full`}
                  style={{ gridTemplateColumns: "repeat(2, auto)" }}
                >
                  <p>Home Address</p>
                  <p>123 Example St.</p>
                  <p>City</p>
                  <p>Example City</p>
                  <p>State</p>
                  <p>Example State</p>
                  <p>Zipcode</p>
                  <p>55555</p>
                </div>
                {editButton(homeAddressDialogRef)}
              </div>
            </div>
          </div>
          <Link
            href="/"
            className={`${jadeBoxStyles} w-full hover:scale-[1.015] transition-transform duration-300 text-center`}
          >
            Back Home
          </Link>
        </div>
      </div>
      {dialog(firstNameDialogRef, "First Name")}
      {dialog(lastNameDialogRef, "Last Name")}
      <dialog
        ref={phoneNumberDialogRef}
        className="bg-transparent"
        onKeyDown={preventEscape}
      >
        <div className="bg-dark-jade p-6 flex flex-col gap-3 rounded-md border-2">
          <h2 className="bg-light-jade font-bold text-center text-2xl py-3 px-20 rounded-sm">
            Edit Phone Number
          </h2>
          <input
            className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm"
            placeholder="Enter updated phone number..."
            value={updatedPhoneNumber}
            onChange={e => {
              const { value } = e.target
              if (/^\d*$/.test(value)) {
                setUpdatedPhoneNumber(value)
              }
            }}
          />
          <div className="grid grid-cols-2 gap-3">
            <button
              className="border-[3px] text-white font-bold p-2 hover:scale-[1.015] transition-transform duration-300"
              onClick={() => {
                phoneNumberDialogRef.current?.close()
                setDialogOpen(false)
              }}
            >
              Close
            </button>
            <button className="bg-light-jade font-bold p-2 hover:scale-[1.015] transition-transform duration-300 rounded-sm">
              Submit
            </button>
          </div>
        </div>
      </dialog>
      <dialog
        ref={homeAddressDialogRef}
        className="bg-transparent"
        onKeyDown={preventEscape}
      >
        <div className="bg-dark-jade p-6 flex flex-col gap-3 rounded-md border-2">
          <h2 className="bg-light-jade font-bold text-center text-2xl py-3 px-20 rounded-sm">
            Edit Home Address
          </h2>
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "repeat(2, auto)" }}
          >
            <div className={jadeBoxStyles}>Home Address</div>
            <input className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm" />
            <div className={jadeBoxStyles}>City</div>
            <input className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm" />
            <div className={jadeBoxStyles}>State</div>
            <input className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm" />
            <div className={jadeBoxStyles}>Zipcode</div>
            <input className="bg-emerald-50 outline-none font-semibold p-2 rounded-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              className="border-[3px] text-white font-bold p-2 hover:scale-[1.015] transition-transform duration-300"
              onClick={() => {
                homeAddressDialogRef.current?.close()
                setDialogOpen(false)
              }}
            >
              Close
            </button>
            <button className="bg-light-jade font-bold p-2 hover:scale-[1.015] transition-transform duration-300 rounded-sm">
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}

function addButton() {
  return (
    <button className="scale-transition">
      <Image src={BluePlusIcon} alt="Blue Plus Icon" width={35} />
    </button>
  )
}

function preventEscape(e: KeyboardEvent<HTMLDialogElement>) {
  if (e.key === "Escape") {
    e.preventDefault()
  }
}
