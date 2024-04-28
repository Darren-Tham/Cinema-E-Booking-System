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
    }, 100)

    return () => clearInterval(interval)
  }, [movies])

  return (
    <div className="flex flex-row">
      <Image src={movies[currentMovie]?.["imageLink"]} alt="Movie" width={200} height={200} />
      <Image src={movies[currentMovie]?.["imageLink"]} alt="Movie" width={200} height={200} />
      <Image src={movies[currentMovie]?.["imageLink"]} alt="Movie" width={200} height={200} />
      <Image src={movies[currentMovie]?.["imageLink"]} alt="Movie" width={200} height={200} />
      <Image src={movies[currentMovie]?.["imageLink"]} alt="Movie" width={200} height={200} />
      <Image src={movies[currentMovie]?.["imageLink"]} alt="Movie" width={200} height={200} />
      <Image src={movies[currentMovie]?.["imageLink"]} alt="Movie" width={200} height={200} />
      <Image src={movies[currentMovie]?.["imageLink"]} alt="Movie" width={200} height={200} />
      <Image src={movies[currentMovie]?.["imageLink"]} alt="Movie" width={200} height={200} />
      <Image src={movies[currentMovie]?.["imageLink"]} alt="Movie" width={200} height={200} />
    </div>
  )
}
