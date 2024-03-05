import Image from "next/image"
import PlayCircle from "@public/play-circle-icon.svg"
import Link from "next/link"

export type MovieType = {
<<<<<<< HEAD:frontend/src/components/Movie.tsx
  movieId: number
  movieName: string
  movieTrailerLink: string
  movieImageLink: string
  movieCategory: string
}

type Props = {
  movieName: string
  movieImageLink: string
=======
  name: string
  trailerLink: string
  imageLink: string
  category: string
}

type Props = {
  name: string
  imageLink: string
>>>>>>> main:src/components/Movie.tsx
  handleTrailerClick: () => void
}

export default function Movie({
<<<<<<< HEAD:frontend/src/components/Movie.tsx
  movieName,
  movieImageLink,
=======
  name,
  imageLink,
>>>>>>> main:src/components/Movie.tsx
  handleTrailerClick
}: Readonly<Props>) {
  return (
    <div className="bg-jade p-2 flex flex-col justify-end">
      <div className="relative">
        <button className="absolute left-1 top-1" onClick={handleTrailerClick}>
          <Image src={PlayCircle} alt="Play Circle" />
        </button>
        <Link href="/theaters-and-times">
<<<<<<< HEAD:frontend/src/components/Movie.tsx
          <Image
            src={movieImageLink}
            alt={movieName}
            width={175}
            height={0}
            priority
          />
        </Link>
      </div>
      <h2 className="text-white text-center font-semibold mt-1">{movieName}</h2>
=======
          <Image src={imageLink} alt={name} width={175} height={0} priority />
        </Link>
      </div>
      <h2 className="text-white text-center font-semibold mt-1">{name}</h2>
>>>>>>> main:src/components/Movie.tsx
    </div>
  )
}
