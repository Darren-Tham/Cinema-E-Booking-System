import MovieBanner from "@public/movie-banner.png"
import Image from "next/image"

export default function MainMovieBanner() {
  return (
    <div className="bg-dark-jade p-2">
      <Image src={MovieBanner} alt="Movie Banner" />
    </div>
  )
}
