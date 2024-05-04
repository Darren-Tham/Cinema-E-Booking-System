"use client"

import Image from "next/image"
import WhiteChairIcon from "@public/white-chair-icon.svg"
import RedChairIcon from "@public/red-chair-icon.svg"
import GreenChairIcon from "@public/green-chair-icon.svg"
import { Dispatch, SetStateAction, useState } from "react"

type Props = {
  unavailable: boolean | undefined
  label: string
  seats: string[]
  setSeats: Dispatch<SetStateAction<string[]>>
}

export default function Seat({
  unavailable,
  label,
  seats,
  setSeats
}: Readonly<Props>) {
  const [isSelected, setIsSelected] = useState(false)
  const iconWidth = 75

  return unavailable ? (
    <Image src={RedChairIcon} alt="Unavaiable Seat" width={iconWidth} />
  ) : (
    <button
      onClick={() => {
        if (isSelected) {
          const i = seats.indexOf(label)
          seats.splice(i, 1)
          setSeats([...seats])
        } else {
          setSeats([...seats, label])
        }
        setIsSelected(!isSelected)
      }}
    >
      <Image
        src={isSelected ? GreenChairIcon : WhiteChairIcon}
        alt="Available Seat"
        width={iconWidth}
      />
    </button>
  )
}
