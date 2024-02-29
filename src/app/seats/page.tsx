import Image from "next/image"
import HomeNavbar from "@/components/HomeNavbar"
import Seat from "@/components/Seat"
import CheckoutBanner from "@/components/CheckoutBanner"
import Link from "next/link"

export default function SeatsPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <HomeNavbar />
      <CheckoutBanner />
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
        <Link
          href="/gay"
          className="bg-jade text-white font-semibold w-max py-3 px-20 text-xl rounded-md self-end scale-transition"
        >
          Next
        </Link>
      </div>
    </div>
  )
}
