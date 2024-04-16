import Link from "next/link"

type Props = {
  heading: string
  times: string[]
}

export default function TheaterAndTimesContainer({
  heading,
  times
}: Readonly<Props>) {
  return (
    <div className="px-2 py-2">
      <h1 className="font-bold text-3xl text-white mb-3">{heading}</h1>
      <div className="bg-dark-jade grid grid-flow-col grid-rows-2 gap-5 p-5 rounded-md">
        {times.map(time => (
          <Link
            href="/ticket-summary"
            key={time}
            className="justify-centent-center bg-jade px-5 py-2 text-white font-semibold text-xl rounded-md scale-transition"
          >
            {time}
          </Link>
        ))}
      </div>
    </div>
  )
}
