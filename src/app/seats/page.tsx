import Image from "next/image"
import HomeNavbar from "@/components/HomeNavbar"
import Seat from "@/components/Seat"

export default function SeatsPage() {
  const h2Styles = "text-white font-semibold text-lg"
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <HomeNavbar />
      <div className="bg-jade p-5">
        <div className="flex justify-between">
          <h2 className={h2Styles}>Movie: Encanto</h2>
          <h2 className={h2Styles}>Time: 12:00 PM</h2>
        </div>
        <h2 className={h2Styles}>Location: University 16 Cinema</h2>
        <h2 className={h2Styles}>Date: Thursday, February 22, 2024</h2>
      </div>
      <div className="px-20 py-10 flex flex-col items-center gap-10">
        <div className="bg-neutral-500 h-96 w-full" />
        <div className="grid grid-cols-8 grid-rows-4 w-max gap-3">
          <Seat />
          <Seat />
          <div />
          <div />
          <div />
          <div />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <Seat unavailable />
          <Seat unavailable />
          <Seat unavailable />
          <Seat />
          <Seat />
          <Seat />
          <div />
          <div />
          <Seat />
          <Seat />
          <Seat />
          <Seat />
          <div />
          <div />
        </div>
        <button className="bg-jade text-white font-semibold w-max py-3 px-20 text-xl rounded-md self-end scale-transition">
          Next
        </button>
      </div>
    </div>
  )
}
