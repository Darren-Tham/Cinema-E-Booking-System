"use client"

import Image from "next/image"
import HomeNavbar from "@/components/HomeNavbar"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import ReactPlayer from "react-player"
import Cancel from "@public/red-cancel-icon.svg"
import APIFacade from "@/lib/APIFacade"
import { Movie, Review, Showtime, Transaction } from "@/lib/Types"
import {
  createTransaction,
  destoryTransaction,
  getCustomer
} from "@/lib/Authentication"

const TheatersAndTimes = () => {
  const router = useRouter()
  const [load, setLoad] = useState(false)
  const searchParams = useSearchParams()
  const [movie, setMovie] = useState<Movie>()
  const [reviews, setReviews] = useState<Review[]>([])
  const [showtimes, setShowtimes] = useState<Showtime[]>([])
  const dialogRef = useRef<HTMLDialogElement>(null!)

  useEffect(() => {
    const param = searchParams.get("movieId")
    if (param === null) {
      throw Error("movieId should not be null.")
    }
    const movieId = +param

    const fetchMovie = async () => {
      const movie = await APIFacade.getMovieById(movieId)
      setMovie(movie)
    }

    const fetchShowTimes = async () => {
      const showtimes = await APIFacade.getShowtimesByMovieId(movieId)
      setShowtimes(showtimes)
    }

    const fetchMovieReviews = async () => {
      const reviews = await APIFacade.getMovieReviews(movieId)
      setReviews(reviews)
    }

    fetchMovie()
    fetchShowTimes()
    fetchMovieReviews()
    setLoad(true)
    destoryTransaction()
  }, [])

  return (
    movie !== undefined && (
      <>
        <div className="min-h-screen flex flex-col">
          <HomeNavbar />
          <div className="justify-items-center grid grid-cols-2 gap-4 py-8">
            <Image
              src={movie.imageLink}
              alt={movie.title}
              width={175}
              height={0}
              priority
            />
            {load && <ReactPlayer url={movie.trailerLink} playing />}
          </div>
          <div className="grid grid-cols-2 gap-4 px-20">
            <div className="">
              <div className="flex">
                <p className="text-white font-bold text-xl">{movie.title}</p>
                <p className="text-white ml-2">
                  {" "}
                  | {movie.ratingCode.replace("_", "-")}
                </p>
              </div>
              <p className="text-white">
                <b>Directed by:</b> {movie.directors.join(", ")}
              </p>
              <p className="text-white py-1">
                <b>Produced by:</b> {movie.producers.join(", ")}
              </p>
              <p className="text-white">
                <b>Cast:</b> {movie.castMembers.join(", ")}
              </p>
              <p className="text-white">
                <b>Categories:</b>{" "}
                {movie.categories
                  .map(
                    category => category[0] + category.slice(1).toLowerCase()
                  )
                  .join(", ")}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-white text-base max-w-full px-12 tracking-wider">
                {movie.synopsis}
              </p>
              <p className="text-white px-12">
                <b>Rating:</b> {movie.ratingOutOf10} / 10{" "}
              </p>
              <button
                className="text-white bg-jade mx-12 w-max py-2 px-4 rounded-sm font-semibold scale-transition"
                onClick={async () => dialogRef.current.showModal()}
              >
                View Reviews
              </button>
            </div>
          </div>
          <div className="justify-content-center align-middle"></div>
          <div className="px-12 py-8 flex flex-col gap-8">
            <div className="px-2 py-2">
              <h1 className="font-bold text-3xl text-white mb-3">
                UGA Theatre
              </h1>
              <div className="flex flex-col gap-2">
                {showtimes
                  .toSorted((a, b) => a.dateTime.localeCompare(b.dateTime))
                  .map(showtime => (
                    <button
                      key={showtime.id}
                      className="text-white bg-jade font-semibold p-2 rounded-sm"
                      onClick={async () => {
                        const customer = await getCustomer()
                        if (customer === undefined) return
                        const transaction: Transaction = {
                          movieId: movie.id,
                          customerId: customer.id,
                          showtimeId: showtime.id
                        } as const
                        await createTransaction(transaction)
                        router.push("/ticket-summary")
                      }}
                    >
                      {new Date(
                        showtime.dateTime.replace(" ", "T")
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        year: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric"
                      })}
                    </button>
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
            onClick={() => dialogRef.current.close()}
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
  )
}

export default TheatersAndTimes
