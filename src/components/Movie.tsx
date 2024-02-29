import Image from "next/image"
import PlayCircle from "@public/play-circle-icon.svg"
import Link from "next/link"

export type MovieType = {
  movieName: string
  trailerLink: string
  imageLink: string
  movieDesc: string
}

type Props = {
  movieName: string
  imageLink: string
  handleTrailerClick: () => void
}

export default function Movie({
  movieName,
  imageLink,
  handleTrailerClick
}: Readonly<Props>) {
  return (
    <div className="bg-jade p-2 flex flex-col justify-end">
      <div className="relative">
        <button className="absolute left-1 top-1" onClick={handleTrailerClick}>
          <Image src={PlayCircle} alt="Play Circle" />
        </button>
        <Link href="/theaters-and-times">
          <Image
            src={imageLink}
            alt={movieName}
            width={175}
            height={0}
            priority
          />
        </Link>
      </div>
      <h2 className="text-white text-center font-semibold mt-1">{movieName}</h2>
    </div>
  )
}
