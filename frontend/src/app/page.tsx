"use client"

import Image from "next/image"
import MoviesContainer from "@/components/MoviesContainer"
import { useEffect, useState } from "react"
import UserNavbar from "@/components/UserNavbar"
import MainMovieBanner from "@/components/MainMovieBanner"
import FilterIcon from "@public/filter-icon.svg"
import APIFacade from "@/lib/APIFacade"
import { Movie } from "@/lib/Types"
import { destoryTransaction } from "@/lib/Authentication"

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [filterType, setFilterType] = useState("All")
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchInformation = async () => {
      const movies = await APIFacade.getAllMovies()
      const categories = await APIFacade.getAllCategories()
      setMovies(movies)
      setCategories(categories)
    }
    fetchInformation()
    destoryTransaction()
  }, [])

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <UserNavbar />
      <MainMovieBanner />
      <div className="w-screen flex items-center my-10 flex-col gap-8 px-16">
        <div className="text-white font-semibold flex items-center gap-1 bg-jade p-3 text-lg rounded-sm self-end">
          <Image src={FilterIcon} alt="Filter Icon" width={25} />
          <h1 className="text-emerald-100">Filter Movies</h1>
          <select
            className="ml-2 bg-light-jade p-2 text-sm rounded-sm"
            onClick={e => setFilterType(e.currentTarget.value)}
          >
            <option>All</option>
            <option>Now Playing</option>
            <option>Coming Soon</option>
            {categories.map(category => (
              <option key={category}>{category}</option>
            ))}
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
        {categories.includes(filterType) && (
          <MoviesContainer
            heading={filterType}
            movies={movies.filter(movie =>
              movie.categories.includes(filterType)
            )}
          />
        )}
      </div>
    </div>
  )
}

export default Home
