export type Props = {
  movieTitle: string
  showtimeDateTime: string
}

const CheckoutBanner = ({ movieTitle, showtimeDateTime }: Readonly<Props>) => {
  const h2Styles = "text-white font-semibold text-lg"

  const formatDateTime = () =>
    new Date(showtimeDateTime.replace(" ", "T")).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      weekday: "long",
      hour: "numeric",
      minute: "numeric"
    })

  return (
    <div className="bg-jade p-5">
      <h2 className={h2Styles}>Movie: {movieTitle}</h2>
      <h2 className={h2Styles}>Location: UGA Theatre</h2>
      <h2 className={h2Styles}>Date: {formatDateTime()}</h2>
    </div>
  )
}

export default CheckoutBanner
