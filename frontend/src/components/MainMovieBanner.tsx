import Image from "next/image"
import { useEffect, useState } from "react"

export default function MainMovieBanner() {
  const [movies, setMovies] = useState([])
  const [currentMovie, setCurrentMovie] = useState(0)
  useEffect(() => {
    async function getMovies() {
      const response = await fetch("http://localhost:8080/api/movies")
      const data = await response.json()
      setMovies(data)
    }
    getMovies()
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovie(curr => (curr + 1) % movies.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [movies])
  const width = 275
  const height = 200
  return (
    <div className="flex flex-col justify-center mt-12">
      <div className="flex justify-center">
        <h1
          className={`mt-10 text-[#2CC295] text-center text-3xl font-semibold mb-10 w-fit`}
        >
          {movies[currentMovie]?.["title"]}
        </h1>
      </div>

      <div className="flex flex-row justify-between items-center h-96">
        {movies.map((movie, index) => (
          <Image
            key={index}
            src={movie?.["imageLink"]}
            alt="Movie"
            width={width}
            height={height}
            className={`absolute left-56 transition-opacity duration-500 ${
              index === currentMovie ? "opacity-100" : "opacity-0"
            } shadow-[0_35px_60px_-10px_rgba(255,255,255,0.3)]`}
          />
        ))}
        <p className="absolute text-white text-xl w-1/4 right-96">
          {movies[currentMovie]?.["synopsis"]}
        </p>
      </div>
    </div>
  )
}
