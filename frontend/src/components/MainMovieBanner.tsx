import MovieBanner from "@public/movie-banner.png"
import Image from "next/image"
import { useEffect, useState } from "react"
import { MovieType } from "@/components/Movie"

export default function MainMovieBanner() {
  const [movies, setMovies] = useState([])
  const [currentMovie, setCurrentMovie] = useState(0)
  useEffect(() => {
    async function getMovies() {
      const response = await fetch("http://localhost:8080/api/movie")
      const data = await response.json()
      setMovies(data)
    }
    getMovies()
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovie((curr) => (curr + 1) % movies.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [movies])
  const width = 275
  const height = 200
  return (
    <div className="flex flex-row gap-4 justify-center bg-dark-jade h-96" >
      <div
          className="transform transition-transform duration-1000"
          style={{ transform: `translateX(${(0 - currentMovie) * (width + 4)}px)` }}>
      <Image src={movies[currentMovie]?.["imageLink"]} alt="Movie" width={width} height={height} />
      </div>
      <div
          className="transform transition-transform duration-1000"
          style={{ transform: `translateX(${( 1 -currentMovie ) * (width + 4)}px)` }}>
        <Image src={movies[(currentMovie + 1 ) % movies.length]?.["imageLink"]} alt="Movie" width={width} height={height} />
      </div>
      <div
          className="transform transition-transform duration-1000"
          style={{ transform: `translateX(${(2 - currentMovie ) * (width + 4)}px)` }}>
        <Image src={movies[(currentMovie + 2 ) % movies.length]?.["imageLink"]} alt="Movie" width={width} height={height} />
      </div>
      <div
          className="transform transition-transform duration-1000"
          style={{ transform: `translateX(${(3- currentMovie ) * (width + 4)}px)` }}>
        <Image src={movies[(currentMovie + 3 ) % movies.length]?.["imageLink"]} alt="Movie" width={width} height={height} />
      </div>

    </div>
  )
}
