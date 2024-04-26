"use client"

import Image from "next/image"
import HomeNavbar from "@/components/HomeNavbar"
import CalendarIcon from "@public/calendar-icon.svg"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { MovieType } from "@/components/Movie"
import ReactPlayer from "react-player"
import Cancel from "@public/red-cancel-icon.svg"

type ShowTime = {
  id: number
  movieId: number
  dateTime: string
}

export default function TheatersAndTimes() {
  const [load, setLoad] = useState(false)
  const searchParams = useSearchParams()
  const [movie, setMovie] = useState<MovieType>()
  const [reviews, setReviews] = useState<Review[]>([])
  const [showTimes, setShowTimes] = useState<ShowTime[]>([])
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const iconWidth = 20

  useEffect(() => {
    const movieId = searchParams.get("movieId")
    async function getMovie() {
      if (movieId === null) {
        throw Error("Invalid movie id.")
      }
      const response = await fetch(`http://localhost:8080/api/movie/${movieId}`)
      const data = await response.json()
      setMovie(data)
    }

    async function getShowTimes() {
      const response = await fetch(
        `http://localhost:8080/api/show_time/movieId/${movieId}`
      )
      const data: ShowTime[] = await response.json()
      setShowTimes(data)
    }

    getMovie()
    getShowTimes()
    setLoad(true)
  }, [])

  return (
    <>
      <div className="min-h-screen bg-black flex flex-col">
        <HomeNavbar />
        <div className="justify-items-center grid grid-cols-2 gap-4 py-8">
          {movie !== undefined && (
            <Image
              src={movie.imageLink}
              alt={movie.title}
              width={175}
              height={0}
              priority
            />
          )}
          {load && <ReactPlayer url={movie?.trailerLink} playing />}
        </div>
        <div className="grid grid-cols-2 gap-4 px-20">
          <div className="">
            <div className="flex">
              <p className="text-white font-bold text-xl">{movie?.title}</p>
              <p className="text-white ml-2">
                {" "}
                | {movie?.ratingCode.replace("_", "-")}
              </p>
            </div>
            <p className="text-white">
              <b>Directed by:</b> {movie?.directors.join(", ")}
            </p>
            <p className="text-white py-1">
              <b>Produced by:</b> {movie?.producers.join(", ")}
            </p>
            <p className="text-white">
              <b>Cast:</b> {movie?.castMembers.join(", ")}
            </p>
            <p className="text-white">
              <b>Categories:</b>{" "}
              {movie?.categories
                .map(category => category[0] + category.slice(1).toLowerCase())
                .join(", ")}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-white text-base max-w-full px-12 tracking-wider">
              {movie?.synopsis}
            </p>
            <p className="text-white px-12">
              <b>Rating:</b> {movie?.ratingOutOf10} / 10{" "}
            </p>
            <button
              className="text-white bg-jade mx-12 w-max py-2 px-4 rounded-sm font-semibold scale-transition"
              onClick={async () => {
                dialogRef.current?.showModal()
                if (movie !== undefined) {
                  setReviews(await getReviews(movie.id))
                }
              }}
            >
              View Reviews
            </button>
          </div>
        </div>
        <div className="justify-content-center align-middle"></div>
        <div className="px-12 py-8 flex flex-col gap-8">
          <div className="px-2 py-2">
            <h1 className="font-bold text-3xl text-white mb-3">UGA Theatre</h1>
            <div className="flex flex-col gap-2">
              {showTimes
                .toSorted((a, b) => a.dateTime.localeCompare(b.dateTime))
                .map(showTime => (
                  <Link
                    href="/ticket-summary"
                    key={showTime.id}
                    className="text-white bg-jade font-semibold p-2 rounded-sm"
                  >
                    {new Date(
                      showTime.dateTime.replace(" ", "T")
                    ).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      year: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric"
                    })}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="bg-transparent shadow-md w-1/2 h-[80%] border-[3px]"
      >
        <button
          className="fixed hover:scale-105 transition-transform duration-300 m-2"
          onClick={() => dialogRef.current?.close()}
        >
          <Image src={Cancel} alt="Cancel" width={35} />
        </button>
        <div className="bg-dark-jade p-4 rounded-sm flex flex-col gap-4">
          {reviews.map(review => (
            <div key={review.id} className="bg-jade rounded-sm p-4">
              <p className="text-white">
                <b>Rating</b>: {review.ratingOutOf10} / 10
              </p>
              <p className="text-white mb-2">
                <b>Review Date</b>:{" "}
                {new Date(review.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </p>
              <p className="text-white font-bold text-xl">{review.title}</p>
              <p className="text-white">{review.content}</p>
            </div>
          ))}
        </div>
      </dialog>
    </>
  )
}

type Review = {
  id: number
  ratingOutOf10: number
  date: string
  title: string
  content: string
}

async function getReviews(movieId: number): Promise<Review[]> {
  const response = await fetch(
    `http://localhost:8080/api/review/movieId/${movieId}`
  )
  return await response.json()
}
