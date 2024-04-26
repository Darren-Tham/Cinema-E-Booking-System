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

export default function TheatersAndTimes() {
  const [load, setLoad] = useState(false)
  const searchParams = useSearchParams()
  const [movie, setMovie] = useState<MovieType>()
  const [reviews, setReviews] = useState<Review[]>([])
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const iconWidth = 20

  useEffect(() => {
    async function getMovie() {
      const movieId = searchParams.get("movieId")
      if (movieId === null) {
        throw Error("Invalid movie id.")
      }
      const response = await fetch(`http://localhost:8080/api/movie/${movieId}`)
      const data = await response.json()
      setMovie(data)
    }
    getMovie()
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
            <h1 className="font-bold text-3xl text-white mb-3 text-center">
              UGA Theatre
            </h1>
            <div className="flex gap-10">
              <div className="flex justify-center items-center gap-2 bg-slate-700 px-8 rounded-md">
                <p className="text-white font-semibold text-xl">04/26/2024</p>
                <button>
                  <Image
                    src={CalendarIcon}
                    alt="Calender Icon"
                    width={iconWidth}
                  />
                </button>
              </div>
              <div className="bg-dark-jade flex flex-wrap gap-5 p-5 rounded-md flex-grow">
                {[
                  "11:00 AM",
                  "12:00 PM",
                  "1:30 PM",
                  "4:00 PM",
                  "6:00 PM",
                  "8:45 PM"
                ].map(time => (
                  <Link
                    href="/ticket-summary"
                    key={time}
                    className="bg-jade px-5 py-2 text-white font-semibold text-xl rounded-md scale-transition"
                  >
                    {time}
                  </Link>
                ))}
              </div>
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
