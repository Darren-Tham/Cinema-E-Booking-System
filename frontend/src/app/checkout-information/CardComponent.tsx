import { ProfileCard } from "@/lib/Types"
import { Dispatch, SetStateAction } from "react"

type Props = {
  card: ProfileCard
  selectedCard: number | undefined
  setSelectedCard: Dispatch<SetStateAction<number | undefined>>
}

const CardComponent = ({
  card,
  selectedCard,
  setSelectedCard
}: Readonly<Props>) => {
  const formatExpirationDate = (expirationDate: string) => {
    const parts = expirationDate.split("-")
    return parts[1] + "/" + parts[0]
  }

  const pStyles = "font-semibold"

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: "auto auto" }}>
      <div className="bg-light-jade grid grid-cols-2 p-2 rounded-sm gap-x-10">
        <p className={pStyles}>Card Type</p>
        <p className={pStyles}>{card.cardType}</p>
        <p className={pStyles}>Card Number</p>
        <p className={pStyles}>Ending in {card.lastFourDigits}</p>
        <p className={pStyles}>Expiration Date</p>
        <p className={pStyles}>{formatExpirationDate(card.expirationDate)}</p>
        <p className={pStyles}>Billing Address</p>
        <p className={pStyles}>{card.billingAddress}</p>
      </div>
      <input
        type="checkbox"
        className="aspect-square w-8 self-center"
        checked={selectedCard === card.id}
        onChange={() =>
          setSelectedCard(selectedCard === card.id ? undefined : card.id)
        }
      />
    </div>
  )
}

export default CardComponent
