import Movie, { MovieType } from "./Movie"

type Props = {
  heading: string
  movies: MovieType[]
  handleTrailerClick: (trailerLink: string) => void
}

export default function MoviesContainer({
  heading,
  movies,
  handleTrailerClick
}: Readonly<Props>) {
  return (
    <div className="w-max">
      <h2 className="font-bold text-3xl text-white mb-4">{heading}</h2>
      <div className="flex bg-dark-jade p-3 gap-3">
        {movies.map(movie => (
          <Movie
            key={movie.movieName}
            {...movie}
            handleTrailerClick={() => handleTrailerClick(movie.trailerLink)}
          />
        ))}
      </div>
    </div>
  )
}
