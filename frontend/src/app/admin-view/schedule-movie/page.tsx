"use client"
import { useAuth } from "@/lib/useAuth";
import { ChangeEvent, useState , useEffect} from "react";
export default function AddMovie() {
  const buttonStyles =
    "text-white w-max font-bold px-4 py-2 rounded-md hover:scale-105 transition-transform duration-300 mt-2 bg-teal-950 border-2 min-w-[200px] min-h-[50px]";
  const textBox = "mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full";
  const isAdmin = useAuth("admin")
  const [time, setTime] = useState("")
  const [validInfo, setValidInfo] = useState(true)
  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [movies, setMovies] = useState([])
  const [movie, setMovie] = useState("")

  const handleTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value)
  }

    const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
  }

const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleMovieChange  = (e: ChangeEvent<HTMLSelectElement>) => {
    setMovie(e.target.value)
  }
  
  useEffect(() => {

    async function getMovies() {
        const response = await fetch("http://localhost:8080/api/movie")
        const data = await response.json()
        setMovies(data)
    }
        getMovies()
  }, [])
  /**
   *   async function handleClick() {
    if (title.length == 0 || imageLink.length == 0 || trailerLink.length == 0 || synopsis.length == 0 || ratingValue.length == 0 || time.length == 0 || date.length == 0) {
      setValidInfo(false)
    }
    else {
      setValidInfo(true)
      const movie = {
        "title": title,
        "trailerLink": trailerLink,
        "imageLink": imageLink,
        "synopsis": synopsis,
        "ratingOutOf10": ratingValue,
        "ratingCode": ratingCode,
        "status": status
      }
      const response = await fetch("http://localhost:8080/api/movie/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(movie)
        }
      )
    }
  }
   */


  return (
    isAdmin ? (
      <div className="flex justify-center items-center flex-col h-screen bg-black">
        <div className="bg-teal-950 p-16 rounded-lg flex flex-col gap-5 items-center mt-2">
          <div className="flex flex-row items-center gap-12">
            <label htmlFor="title" className="block font-large text-white">Title:</label>
            <input type="text" id="title" name="title" className={textBox} placeholder="Enter title..." value={title} onChange={handleTitleChange} />
          </div>
          <div className="flex flex-row items-center gap-4">
            <label htmlFor="movie" className="block font-large text-white">Rating Code:</label>
            <select id="rating-code" value={movie} onChange={handleMovieChange} className="rounded-md">
                {movies.map(e => (
                    <option key={e["id"]} value={e["title"]}>{e["title"]}</option>
                ))}
            </select>
          </div>
          <div className="flex items-center min-w-0 gap-4">
            <label htmlFor="end-date" className="text-gray-100">
              Date:
            </label>
            <input
              id="end-date"
              type="date"
              className="w-full mt-1 p-2 bg-bright-jade text-black rounded border border-gray-500 focus:border-blue-500 focus:ring-blue-500"
              value={date}
              onChange={handleDate}
            />
          </div>
          <div className="flex items-center min-w-0 gap-4">
            <label htmlFor="end-date" className="text-gray-100">
              Time:
            </label>
            <input
              id="end-date"
              type="time"
              className="w-full mt-1 p-2 bg-bright-jade text-black rounded border border-gray-500 focus:border-blue-500 focus:ring-blue-500"
              value={time}
              onChange={handleTime}
            />
          </div>
          {!validInfo && (
            <div role="alert">
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Missing Info
              </div>
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>
                  Please fill out all the required fields.
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button className={buttonStyles}>Confirm and Add Movie</button>
        </div>
      </div >
    )
      : (
        <div className="h-screen bg-black flex justify-center items-center">
          <h1 className="text-white text-3xl">WOMP WOMP, you are not authorized.</h1>
        </div>
      )
  )
}
