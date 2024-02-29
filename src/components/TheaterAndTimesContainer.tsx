type Props = {
  heading: string
  times: string[]
}

export default function TheaterAndTimesContainer({
  heading,
  times
}: Readonly<Props>) {
  return (
    <div>
      <h1 className="font-bold text-3xl text-white mb-3">{heading}</h1>
      <div className="bg-dark-jade flex gap-5 p-5 flex-wrap">
        {times.map(time => (
          <button
            key={time}
            className="bg-jade px-10 py-2 text-white font-semibold text-xl rounded-md scale-transition"
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  )
}
