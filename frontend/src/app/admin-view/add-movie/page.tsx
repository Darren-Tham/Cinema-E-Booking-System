"use client"

import UnauthorizedScreen from "@/components/UnauthorizedScreen"
import MovieRatings from "@/components/option/MovieRatings"
import MovieStatuses from "@/components/option/MovieStatuses"
import useAdmin from "@/hooks/useAdmin"
import APIFacade from "@/lib/APIFacade"
import FormHandler from "@/lib/FormHandler"
import { NewMovie } from "@/lib/Types"
import Link from "next/link"
import { FormEvent, useState } from "react"

const titleCase = (s: string) =>
  s[0].toUpperCase() + s.substring(1).toLowerCase()

const AddMovie = () => {
  const [form, setForm] = useState<NewMovie>({
    title: "",
    trailerLink: "",
    imageLink: "",
    status: "",
    ratingOutOf10: "",
    categories: [],
    castMembers: [],
    directors: [],
    producers: [],
    synopsis: "",
    ratingCode: "",
    adultTicketPrice: -1,
    childTicketPrice: -1,
    seniorTicketPrice: -1
  })
  const isAdmin = useAdmin()
  const labelStyles = "text-white font-semibold text-lg"
  const inputStyles = "rounded-sm outline-none p-2 text-sm w-[30rem]"
  const divStyles = "flex flex-col gap-1"

  const arrayInputEmpty = (input: string[]) => {
    return input.length === 1 && input[0] === ""
  }

  const isValidForm = () => {
    if (form.title === "") {
      alert("Movie title cannot be empty.")
      return false
    }

    if (form.synopsis === "") {
      alert("Movie synopsis cannot be empty.")
      return false
    }

    if (form.imageLink === "") {
      alert("Movie image link cannot be empty.")
      return false
    }

    if (form.trailerLink === "") {
      alert("Movie trailer link cannot be empty.")
      return false
    }

    const ratingOutOf10 = +form.ratingOutOf10
    if (
      form.ratingOutOf10 === "" ||
      isNaN(ratingOutOf10) ||
      ratingOutOf10 < 0 ||
      ratingOutOf10 > 10
    ) {
      alert("Movie rating out of 10 must be between 0 and 10.")
      return false
    }

    if (form.ratingCode === "") {
      alert("Movie must have a rating code.")
      return false
    }

    if (form.status === "") {
      alert("Movie must have a status.")
      return false
    }

    if (arrayInputEmpty(form.categories)) {
      alert("Movie must have a category.")
      return false
    }

    if (arrayInputEmpty(form.directors)) {
      alert("Movie must have a director.")
      return false
    }

    if (arrayInputEmpty(form.producers)) {
      alert("Movie must have a producer.")
      return false
    }

    if (arrayInputEmpty(form.castMembers)) {
      alert("Movie must have a cast member.")
      return false
    }

    return true
  }

  const formToMovie = (): NewMovie => {
    return {
      ...form,
      ratingCode: form.ratingCode.replace("-", "_"),
      status: form.status.toUpperCase().replace(" ", "_"),
      categories: form.categories.map(category => titleCase(category))
    }
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValidForm()) return
    await APIFacade.addMovie(formToMovie())
    alert("Movie is successfully added.")
    window.location.reload()
  }

  return (
    isAdmin && (
      <div className="flex flex-col p-8 gap-10 justify-center items-center">
        <Link
          href="/admin-view/manage-movies"
          className="bg-jade px-4 py-2 text-white font-bold scale-transition rounded-md self-start"
        >
          Back To Manage Movies
        </Link>
        <form
          className="bg-dark-jade flex flex-col gap-4 p-4 rounded-md"
          onSubmit={handleFormSubmit}
        >
          <div className={divStyles}>
            <label htmlFor="title" className={labelStyles}>
              Title
            </label>
            <input
              id="title"
              className={inputStyles}
              value={form.title}
              onChange={e => FormHandler.updateForm(e, "title", form, setForm)}
            />
          </div>
          <div className={divStyles}>
            <label htmlFor="synopsis" className={labelStyles}>
              Synopsis
            </label>
            <textarea
              id="synopsis"
              className={inputStyles}
              value={form.synopsis}
              onChange={e =>
                FormHandler.updateForm(e, "synopsis", form, setForm)
              }
            />
          </div>
          <div className={divStyles}>
            <label htmlFor="image-link" className={labelStyles}>
              Image Link
            </label>
            <input
              id="image-link"
              className={inputStyles}
              value={form.imageLink}
              onChange={e =>
                FormHandler.updateForm(e, "imageLink", form, setForm)
              }
            />
          </div>
          <div className={divStyles}>
            <label htmlFor="trailer-link" className={labelStyles}>
              Trailer Link
            </label>
            <input
              id="trailer-link"
              className={inputStyles}
              value={form.trailerLink}
              onChange={e =>
                FormHandler.updateForm(e, "trailerLink", form, setForm)
              }
            />
          </div>
          <div className={divStyles}>
            <label htmlFor="rating-out-of-10" className={labelStyles}>
              Rating Out Of 10
            </label>
            <input
              id="rating-out-of-10"
              className={inputStyles}
              value={form.ratingOutOf10}
              onChange={e =>
                FormHandler.updateForm(e, "ratingOutOf10", form, setForm)
              }
            />
          </div>
          <div className={divStyles}>
            <label htmlFor="rating-code" className={labelStyles}>
              Rating Code
            </label>
            <select
              id="rating-code"
              className={inputStyles}
              value={form.ratingCode}
              onChange={e =>
                FormHandler.updateForm(e, "ratingCode", form, setForm)
              }
            >
              <MovieRatings />
            </select>
          </div>
          <div className={divStyles}>
            <label htmlFor="status" className={labelStyles}>
              Status
            </label>
            <select
              id="status"
              className={inputStyles}
              value={form.status}
              onChange={e => FormHandler.updateForm(e, "status", form, setForm)}
            >
              <MovieStatuses />
            </select>
          </div>
          <div className={divStyles}>
            <p className={labelStyles}>Categories</p>
            <input
              className={inputStyles}
              value={form.categories}
              onChange={e =>
                FormHandler.updateFormArray(e, "categories", form, setForm)
              }
            />
          </div>
          <div className={divStyles}>
            <p className={labelStyles}>Directors</p>
            <input
              className={inputStyles}
              value={form.directors}
              onChange={e =>
                FormHandler.updateFormArray(e, "directors", form, setForm)
              }
            />
          </div>
          <div className={divStyles}>
            <p className={labelStyles}>Producers</p>
            <textarea
              className={inputStyles}
              value={form.producers}
              onChange={e =>
                FormHandler.updateFormArray(e, "producers", form, setForm)
              }
            />
          </div>
          <div className={divStyles}>
            <p className={labelStyles}>Cast Members</p>
            <textarea
              className={inputStyles}
              value={form.castMembers}
              onChange={e =>
                FormHandler.updateFormArray(e, "castMembers", form, setForm)
              }
            />
          </div>
          <button
            type="submit"
            className="text-white bg-jade p-2 rounded-sm font-bold hover:scale-[1.015] transition-transform duration-300"
          >
            Apply Changes
          </button>
        </form>
      </div>
    )
  )
}

export default AddMovie
