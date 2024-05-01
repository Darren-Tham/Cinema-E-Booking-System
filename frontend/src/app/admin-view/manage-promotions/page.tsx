"use client"

import { FormEvent, useState } from "react"
import { useAuth } from "@/lib/useAuth"
import UnauthorizedScreen from "@/components/UnauthorizedScreen"
import { Email, Promotion } from "@/lib/Types"
import APIFacade from "@/lib/APIFacade"
import FormHandler from "@/lib/FormHandler"
import Link from "next/link"

const ManagePromotions = () => {
  const [form, setForm] = useState<Promotion>({
    name: "",
    discountCode: "",
    discountPercentage: 0,
    startDate: "",
    endDate: ""
  })
  const isAdmin = useAuth("admin")

  const isValidForm = async () => {
    if (form.name === "") {
      alert("Name cannot be empty.")
      return false
    }

    if (form.discountCode === "") {
      alert("Discount code cannot be empty.")
      return false
    }

    if (form.startDate === "") {
      alert("Start date cannot be empty.")
      return false
    }

    if (form.endDate === "") {
      alert("End date cannot be empty.")
      return false
    }

    if (new Date(form.endDate) <= new Date(form.startDate)) {
      alert("End date must be after the start date.")
      return false
    }

    if (await APIFacade.discountCodeExists(form.discountCode)) {
      alert("Discount code already exists.")
      return false
    }

    return true
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    })
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!(await isValidForm())) return

    await APIFacade.addPromotion(form)
    const subscribedCustomersEmails =
      await APIFacade.getSubscribedCustomersEmails()
    for (const receiverEmail of subscribedCustomersEmails) {
      const email: Email = {
        receiverEmail,
        subject: `New Promotion: ${form.name}`,
        text: `Use the code ${form.discountCode} to get ${
          form.discountPercentage
        }% off! Promotion starts on ${formatDate(
          form.startDate
        )}, and it ends on ${formatDate(form.endDate)}.`
      }
      await APIFacade.sendEmail(email)
    }
    alert(
      "Promotion has been successfully created and sent to all subscribed customers."
    )
    window.location.reload()
  }

  return isAdmin ? (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md bg-teal-950 p-4 rounded-md shadow-lg">
        <h1 className="text-white text-2xl font-bold mb-4 text-center">
          Promotions
        </h1>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-100 font-semibold">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 p-2 bg-bright-jade text-black rounded border border-gray-500 outline-none font-semibold"
              value={form.name}
              onChange={e =>
                FormHandler.updateForm(e, "name", form, setForm, false)
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="code" className="text-gray-100 font-semibold">
              Discount Code
            </label>
            <input
              id="code"
              type="text"
              className="mt-1 p-2 bg-bright-jade text-black rounded border border-gray-500 outline-none font-semibold"
              value={form.discountCode}
              onChange={e =>
                FormHandler.updateFormNoSpaces(
                  e,
                  "discountCode",
                  form,
                  setForm,
                  false
                )
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="discount" className="text-gray-100 font-semibold">
              Discount Percentage
            </label>
            <input
              id="discount"
              type="range"
              className="mt-1"
              value={form.discountPercentage}
              onChange={e =>
                FormHandler.updateForm(
                  e,
                  "discountPercentage",
                  form,
                  setForm,
                  true
                )
              }
              min="0"
              max="100"
            />
            <div className="flex justify-between text-white text-sm">
              <span className="font-semibold">0%</span>
              <span className="font-semibold">{form.discountPercentage}%</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 min-w-0">
              <label
                htmlFor="start-date"
                className="text-gray-100 font-semibold"
              >
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                className="w-full mt-1 p-2 bg-bright-jade text-black rounded border border-gray-500 outline-none font-semibold"
                value={form.startDate}
                onChange={e =>
                  FormHandler.updateForm(e, "startDate", form, setForm, false)
                }
              />
            </div>
            <div className="flex-1 min-w-0">
              <label htmlFor="end-date" className="text-gray-100 font-semibold">
                End Date
              </label>
              <input
                id="end-date"
                type="date"
                className="w-full mt-1 p-2 bg-bright-jade text-black rounded border border-gray-500 outline-none font-semibold"
                value={form.endDate}
                onChange={e =>
                  FormHandler.updateForm(e, "endDate", form, setForm, false)
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/admin-view"
              className="bg-jade px-4 py-2 text-white font-bold hover:scale-[1.015] transition-transform duration-300 rounded self-start"
            >
              Back To Admin View
            </Link>
            <button
              type="submit"
              className="w-full p-2 bg-light-jade text-white rounded hover:scale-[1.015] transition-transform duration-300 font-semibold"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <UnauthorizedScreen />
  )
}

export default ManagePromotions
