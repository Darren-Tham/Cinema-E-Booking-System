"use client"
import { MovieType } from "@/components/Movie"
import { useAuth } from "@/lib/useAuth"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useRef, useState } from "react"

type ShowTime = {
  id: number
  movieId: number
  dateTime: string
}

export default function EditMovie() {
  const searchParams = useSearchParams()
  const [movie, setMovie] = useState<MovieType>({
    id: 0,
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
  const [showTimeDateTimes, setShowTimeDateTimes] = useState<string[]>([])
  const dateRef = useRef<HTMLInputElement | null>(null)
  const timeRef = useRef<HTMLInputElement | null>(null)
  const isAdmin = useAuth("admin")
  const labelStyles = "text-white font-semibold text-lg"
  const inputStyles = "rounded-sm outline-none p-2 text-sm w-[30rem]"
  const divStyles = "flex flex-col gap-1"

  useEffect(() => {
    const movieId = searchParams.get("movieId")
    async function getMovie() {
      const response = await fetch(`http://localhost:8080/api/movie/${movieId}`)
      const data: MovieType = await response.json()
      setMovie(data)
    }

    async function getShowTimes() {
      const response = await fetch(
        `http://localhost:8080/api/show_time/movieId/${movieId}`
      )
      const data: ShowTime[] = await response.json()
      const showTimeDateTimes: string[] = []
      data.forEach(showTime => {
        const tokens = showTime.dateTime.split(" ")
        const date = tokens[0]
        const time = tokens[1]
        showTimeDateTimes.push(`${date}T${time}`)
      })
      setShowTimeDateTimes(
        showTimeDateTimes.toSorted((a, b) => a.localeCompare(b))
      )
    }

    getMovie()
    getShowTimes()
  }, [])

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { id, value } = e.target
    setMovie({ ...movie, [id]: value })
  }

  function handleArrayChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value } = e.target
    setMovie({ ...movie, [id]: value.split(",") })
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
        onSubmit={async e => {
          e.preventDefault()
          if (movie.title === "") {
            alert("Movie title cannot be empty.")
            return
          }

          if (movie.synopsis === "") {
            alert("Movie synopsis cannot be empty.")
            return
          }

          if (movie.imageLink === "") {
            alert("Movie image link cannot be empty.")
            return
          }

          if (movie.trailerLink === "") {
            alert("Movie trailer link cannot be empty.")
            return
          }

          const ratingOutOf10 = +movie.ratingOutOf10
          if (
            movie.ratingOutOf10 === "" ||
            isNaN(ratingOutOf10) ||
            ratingOutOf10 < 0 ||
            ratingOutOf10 > 10
          ) {
            alert("Movie rating out of 10 must be between 0 and 10.")
            return
          }

          if (arrayInputEmpty(movie.categories)) {
            alert("Movie must have a category.")
            return
          }

          if (arrayInputEmpty(movie.directors)) {
            alert("Movie must have a director.")
            return
          }

          if (arrayInputEmpty(movie.producers)) {
            alert("Movie must have a producer.")
            return
          }

          if (arrayInputEmpty(movie.castMembers)) {
            alert("Movie must have a cast member.")
            return
          }

          const movieDTO = movie
          movieDTO.categories = movieDTO.categories.map(category =>
            category.toUpperCase()
          )
          movieDTO.ratingCode = movieDTO.ratingCode.replace("-", "_")
          await fetch("http://localhost:8080/api/movie/update", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(movieDTO)
          })

          await fetch(
            `http://localhost:8080/api/show_time/update/movieId/${movie.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(
                showTimeDateTimes.map(dateTime => dateTime.replace("T", " "))
              )
            }
          )

          window.location.reload()
        }}
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
            <option>G</option>
            <option>PG</option>
            <option>PG-13</option>
            <option>R</option>
            <option>NC-17</option>
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
            <option>Now Playing</option>
            <option>Coming Soon</option>
          </select>
        </div>
        <div className={divStyles}>
          <p className={labelStyles}>Categories</p>
          <input
            id="categories"
            className={inputStyles}
            defaultValue={movie?.categories.map(category =>
              upperCaseToTitleCase(category)
            )}
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
        <div>
          <p className={labelStyles}>Schedule Movie</p>
          <div className="flex gap-3 justify-center">
            <input className="outline-none p-2" type="date" ref={dateRef} />
            <input className="outline-none p-2" type="time" ref={timeRef} />
            <button
              type="button"
              className="bg-jade text-white font-semibold px-4 py-2"
              onClick={() => {
                const date = dateRef.current?.value
                const time = timeRef.current?.value
                if (date === undefined || date === "") {
                  alert("Date cannot be empty.")
                  return
                }

                if (time === undefined || time === "") {
                  alert("Time cannot be empty.")
                  return
                }

                const dateTime = `${date}T${time}:00`
                if (showTimeDateTimes.includes(dateTime)) {
                  alert("Show time already exists.")
                  return
                }
                setShowTimeDateTimes(
                  [...showTimeDateTimes, dateTime].toSorted((a, b) =>
                    a.localeCompare(b)
                  )
                )
              }}
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <p className={labelStyles}>Scheduled Movies</p>
          <div className="flex flex-col gap-2">
            {showTimeDateTimes.map((dateTime, i) => (
              <div
                key={dateTime}
                className="grid"
                style={{ gridTemplateColumns: "80% 20%" }}
              >
                <div className="bg-light-jade text-white font-bold p-2">
                  {new Date(dateTime).toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                  })}
                </div>
                <button
                  type="button"
                  className="bg-red-500 text-white font-semibold"
                  onClick={() => {
                    const newShowTimeDateTimes = [...showTimeDateTimes]
                    newShowTimeDateTimes.splice(i, 1)
                    setShowTimeDateTimes(newShowTimeDateTimes)
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
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
    <div className="h-screen bg-black flex justify-center items-center">
      <h1 className="text-white text-3xl">
        WOMP WOMP, you are not authorized.
      </h1>
    </div>
  )
}

function upperCaseToTitleCase(s: string) {
  return s[0] + s.substring(1).toLowerCase()
}

function statusMap(status: string | undefined) {
  switch (status) {
    case "NOW_PLAYING":
      return "Now Playing"
    case "COMING_SOON":
      return "Coming Soon"
    default:
      return ""
  }
}

function arrayInputEmpty(input: string[]) {
  return input.length === 1 && input[0] === ""
}
