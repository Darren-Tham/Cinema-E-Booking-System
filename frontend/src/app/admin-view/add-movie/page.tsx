"use client"
import UnauthorizedScreen from "@/components/UnauthorizedScreen"
import MovieRatings from "@/components/option/MovieRatings"
import MovieStatuses from "@/components/option/MovieStatuses"
import APIFacade from "@/lib/APIFacade"
import { NewMovie } from "@/lib/Types"
import { useAuth } from "@/lib/useAuth"
import Link from "next/link"
import { ChangeEvent, FormEvent, useRef, useState } from "react"
const AddMovie = () => {
  const [movie, setMovie] = useState<NewMovie>({
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
    ratingCode: ""
  })
  const [dateTimes, setDateTimes] = useState<string[]>([])
  const dateRef = useRef<HTMLInputElement>(null!)
  const timeRef = useRef<HTMLInputElement>(null!)
  const isAdmin = useAuth("admin")

  const labelStyles = "text-white font-semibold text-lg"
  const inputStyles = "rounded-sm outline-none p-2 text-sm w-[30rem]"
  const divStyles = "flex flex-col gap-1"

  const arrayInputEmpty = (input: string[]) => {
    return input.length === 1 && input[0] === ""
  }

  const isValidForm = () => {
    if (movie.title === "") {
      alert("Movie title cannot be empty.")
      return false
    }

    if (movie.synopsis === "") {
      alert("Movie synopsis cannot be empty.")
      return false
    }

    if (movie.imageLink === "") {
      alert("Movie image link cannot be empty.")
      return false
    }

    if (movie.trailerLink === "") {
      alert("Movie trailer link cannot be empty.")
      return false
    }

    const ratingOutOf10 = +movie.ratingOutOf10
    if (
      movie.ratingOutOf10 === "" ||
      isNaN(ratingOutOf10) ||
      ratingOutOf10 < 0 ||
      ratingOutOf10 > 10
    ) {
      alert("Movie rating out of 10 must be between 0 and 10.")
      return false
    }

    if (movie.ratingCode === "") {
      alert("Movie must have a rating code.")
      return false
    }

    if (movie.status === "") {
      alert("Movie must have a status.")
      return false
    }

    if (arrayInputEmpty(movie.categories)) {
      alert("Movie must have a category.")
      return false
    }

    if (arrayInputEmpty(movie.directors)) {
      alert("Movie must have a director.")
      return false
    }

    if (arrayInputEmpty(movie.producers)) {
      alert("Movie must have a producer.")
      return false
    }

    if (arrayInputEmpty(movie.castMembers)) {
      alert("Movie must have a cast member.")
      return false
    }

    return true
  }

  const formatMovie = (movie: NewMovie) => {
    movie.categories = movie.categories.map(category => category.toUpperCase())
    movie.ratingCode = movie.ratingCode.replace("-", "_")
    return movie
  }

  const formatDateTimes = (dateTimes: string[]) => {
    return dateTimes.map(dateTime => dateTime.replace("T", " "))
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValidForm()) return
    await APIFacade.updateMovie(formatMovie(movie))
    await APIFacade.updateMovieShowtimes(movie.id, formatDateTimes(dateTimes))
    window.location.reload()
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target
    setMovie({ ...movie, [id]: value })
  }

  const handleArrayChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setMovie({ ...movie, [id]: value.split(",") })
  }

  const upperCaseToTitleCase = (s: string) =>
    s[0] + s.substring(1).toLowerCase()

  const formatCategories = () =>
    movie.categories.map(category => upperCaseToTitleCase(category))

  const handleAddShowTime = () => {
    const date = dateRef.current.value
    const time = timeRef.current.value
    if (date === "") {
      alert("Date cannot be empty.")
      return
    }

    if (time === "") {
      alert("Time cannot be empty.")
      return
    }

    const dateTime = `${date}T${time}:00`
    if (dateTimes.includes(dateTime)) {
      alert("Show time already exists.")
      return
    }
    setDateTimes(
      [...dateTimes, dateTime].toSorted((a, b) => a.localeCompare(b))
    )
  }

  const statusMap = (status: string | undefined) => {
    switch (status) {
      case "NOW_PLAYING":
        return "Now Playing"
      case "COMING_SOON":
        return "Coming Soon"
      default:
        return ""
    }
  }

  return isAdmin ? (
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
            defaultValue={movie?.title}
            onChange={handleChange}
          />
        </div>
        <div className={divStyles}>
          <label htmlFor="synopsis" className={labelStyles}>
            Synopsis
          </label>
          <textarea
            id="synopsis"
            className={inputStyles}
            defaultValue={movie?.synopsis}
            onChange={handleChange}
          />
        </div>
        <div className={divStyles}>
          <label htmlFor="imageLink" className={labelStyles}>
            Image Link
          </label>
          <input
            id="imageLink"
            className={inputStyles}
            defaultValue={movie?.imageLink}
            onChange={handleChange}
          />
        </div>
        <div className={divStyles}>
          <label htmlFor="trailerLink" className={labelStyles}>
            Trailer Link
          </label>
          <input
            id="trailerLink"
            className={inputStyles}
            defaultValue={movie?.trailerLink}
            onChange={handleChange}
          />
        </div>
        <div className={divStyles}>
          <label htmlFor="ratingOutOf10" className={labelStyles}>
            Rating Out Of 10
          </label>
          <input
            id="ratingOutOf10"
            className={inputStyles}
            defaultValue={movie?.ratingOutOf10}
            onChange={handleChange}
          />
        </div>
        <div className={divStyles}>
          <label htmlFor="ratingCode" className={labelStyles}>
            Rating Code
          </label>
          <select
            id="ratingCode"
            className={inputStyles}
            defaultValue={movie?.ratingCode.replace("_", "-")}
            onChange={handleChange}
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
            defaultValue={statusMap(movie?.status)}
            onChange={handleChange}
          >
            <MovieStatuses />
          </select>
        </div>
        <div className={divStyles}>
          <p className={labelStyles}>Categories</p>
          <input
            id="categories"
            className={inputStyles}
            defaultValue={formatCategories()}
            onChange={handleArrayChange}
          />
        </div>
        <div className={divStyles}>
          <p className={labelStyles}>Directors</p>
          <input
            id="directors"
            className={inputStyles}
            defaultValue={movie?.directors}
            onChange={handleArrayChange}
          />
        </div>
        <div className={divStyles}>
          <p className={labelStyles}>Producers</p>
          <textarea
            id="producers"
            className={inputStyles}
            defaultValue={movie?.producers}
            onChange={handleArrayChange}
          />
        </div>
        <div className={divStyles}>
          <p className={labelStyles}>Cast Members</p>
          <textarea
            id="castMembers"
            className={inputStyles}
            defaultValue={movie?.castMembers}
            onChange={handleArrayChange}
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
  ) : (
    <UnauthorizedScreen />
  )
}

export default AddMovie
