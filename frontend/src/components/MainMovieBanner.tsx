import MovieBanner from "@public/movie-banner.png"
import Image from "next/image"

export default function MainMovieBanner() {
  return <Image src={MovieBanner} alt="Movie Banner" />
}
