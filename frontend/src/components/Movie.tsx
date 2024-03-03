import Image from "next/image"
import PlayCircle from "@public/play-circle-icon.svg"
import Link from "next/link"

export type MovieType = {
  name: string
  trailerLink: string
  imageLink: string
  category: string
}

type Props = {
  name: string
  imageLink: string
  handleTrailerClick: () => void
}

export default function Movie({
  name,
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
          <Image src={imageLink} alt={name} width={175} height={0} priority />
        </Link>
      </div>
      <h2 className="text-white text-center font-semibold mt-1">{name}</h2>
    </div>
  )
}
