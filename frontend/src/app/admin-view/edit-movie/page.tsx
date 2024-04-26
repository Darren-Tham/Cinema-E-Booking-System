"use client"
import { useAuth } from "@/lib/useAuth";
import Image from "next/image"
import EncantoPoster from "@public/Encanto_poster.png"

export default function EditMovie() {
  const buttonStyles =
    "text-white w-max font-bold px-4 py-2 rounded-md hover:scale-105 transition-transform duration-300 mt-2 bg-light-jade min-w-[200px] min-h-[50px]";
  const textBox = "mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full";
  const textBoxNumbers = "mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-28";
  const isAdmin = useAuth("admin")
  return (
    isAdmin ? (
      <div className="grid items-center h-screen bg-black">
      <div className="grid grid-cols-2 justify-center items-center flex-col">
        <div className=" pl-40">
        <Image className="h-7/12 w-7/12 p-2 rounded-lg bg-light-jade hover:scale-105" src={EncantoPoster} alt="Encanto Poster" />
        </div>
        <div className="bg-teal-950 p-12 rounded-lg flex flex-col gap-5 mt-2 max-w-fit">
          <div className="flex flex-row items-center gap-12">
            <label htmlFor="title" className="block font-large text-white">Title:</label>
            <input type="text" id="title" name="title" className={textBox} placeholder="Enter title..." />
          </div>
          <div className="flex flex-row items-center gap-1">
            <label htmlFor="description" className="block font-large text-white">Description:</label>
            <input type="text" id="description" name="description" className={textBox} placeholder="Enter Description..." />
          </div>

          <div className="flex items-center gap-2 justify-evenly">
            <label className=" flex flex-row items-center text-white">
              Types:
            </label>
            <input type="checkbox" id="senior" name="ticketType" value="senior" />
            <label htmlFor="senior" className="text-white bg-light-jade p-3 w-28 rounded-lg ">Senior</label>

            <input type="checkbox" id="adult" name="ticketType" value="adult" />
            <label htmlFor="adult" className="text-white bg-light-jade p-3 w-28 rounded-lg ">Adult</label>

            <input type="checkbox" id="child" name="ticketType" value="child" />
            <label htmlFor="child" className="text-white bg-light-jade p-3 w-28 rounded-lg ">Child</label>
          </div>

          <div className="flex items-center gap-1 justify-evenly">
            <label className="block text-white">
              Cost:
            </label>
            <input type="number" id="senior" name="senior" className={textBoxNumbers} placeholder="Senior" min="0" />

            <input type="number" id="adult" name="adult" className={textBoxNumbers} placeholder="Adult" min="0" />

            <input type="number" id="child" name="child" className={textBoxNumbers} placeholder="Child" min="0" />
          </div>


          <div className="flex flex-row items-center gap-4">
            <label htmlFor="genre" className="block font-large text-white">Genre:</label>
            <input type="text" id="genre" name="genre" className={textBox} placeholder="Enter genre of movie..." />
          </div>
          <div className=" grid grid-flow-row grid-cols-2 auto-fit gap-6">
          <div className="flex items-center min-w-0 gap-4">
            <label htmlFor="end-date" className="text-gray-100">
              Date:
            </label>
            <input
              id="end-date"
              type="date"
              className="w-full mt-1 p-2 bg-bright-jade text-black rounded border border-gray-500 focus:border-blue-500 focus:ring-blue-500"
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
            />
          </div>

          </div>
          
        </div>

        </div>
        <div className="flex justify-center mt-4">
          <button className={buttonStyles}>Confirm</button>
        </div>
      </div>
      
    ) : (
      <div className="h-screen bg-black flex justify-center items-center">
        <h1 className="text-white text-3xl">WOMP WOMP, you are not authorized.</h1>
      </div>
    )

  )
}
