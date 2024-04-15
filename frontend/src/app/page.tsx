"use client"

import Image from "next/image"
import MoviesContainer from "@/components/MoviesContainer"
import { MovieType } from "@/components/Movie"
import { useEffect, useState } from "react"
import UserNavbar from "@/components/UserNavbar"
import MainMovieBanner from "@/components/MainMovieBanner"
import FilterIcon from "@public/filter-icon.svg"

export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([])
  const [filterType, setFilterType] = useState("All")

  useEffect(() => {
    async function getMovies() {
      const response = await fetch("http://localhost:8080/api/movie")
      const data = await response.json()
      console.log(data)
      setMovies(data)
    }
    getMovies()
  }, [])

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <UserNavbar />
      <MainMovieBanner />
      <div className="w-screen flex items-center my-10 flex-col gap-8 px-16">
        <div className="text-white font-semibold flex items-center gap-1 bg-jade p-3 text-lg rounded-sm self-end">
          <Image src={FilterIcon} alt="Filter Icon" width={25} />
          Filter Movies
          <select
            className="ml-2 bg-light-jade p-2 text-sm rounded-sm"
            onClick={e => setFilterType(e.currentTarget.value)}
          >
            <option>All</option>
            <option>Now Playing</option>
            <option>Coming Soon</option>
            <option>Animation</option>
            <option>Action</option>
            <option>Adventure</option>
            <option>Biography</option>
            <option>Comedy</option>
            <option>Drama</option>
            <option>Family</option>
            <option>History</option>
            <option>Horror</option>
            <option>Mystery</option>
            <option>Sci-Fi</option>
            <option>Thriller</option>
          </select>
        </div>

        {(filterType === "All" || filterType === "Now Playing") && (
          <MoviesContainer
            heading="Now Playing"
            movies={movies.filter(movie => movie.status === "NOW_PLAYING")}
          />
        )}

        {(filterType === "All" || filterType === "Coming Soon") && (
          <MoviesContainer
            heading="Coming Soon"
            movies={movies.filter(movie => movie.status === "COMING_SOON")}
          />
        )}
      </div>
    </div>
  )
}
