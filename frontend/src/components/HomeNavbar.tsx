import PageFacade from "@/lib/PageFacade"
import Link from "next/link"

export default function HomeNavbar() {
  return (
    <nav className="bg-dark-jade w-full p-4">
      <Link
        href={PageFacade.HOME}
        className="font-bold text-white text-2xl inline-block hover:scale-[1.025] transition-transform duration-300"
      >
        Cinema E-Booking System
      </Link>
    </nav>
  )
}
