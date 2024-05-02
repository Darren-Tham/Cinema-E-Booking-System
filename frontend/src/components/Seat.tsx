"use client"

import Image from "next/image"
import WhiteChairIcon from "@public/white-chair-icon.svg"
import RedChairIcon from "@public/red-chair-icon.svg"
import GreenChairIcon from "@public/green-chair-icon.svg"
import { useState } from "react"

type Props = {
  unavailable?: boolean
}

export default function Seat({ unavailable }: Readonly<Props>) {
  const [isSelected, setIsSelected] = useState(false)
  const iconWidth = 75

  return unavailable ? (
    <Image src={RedChairIcon} alt="Unavaiable Seat" width={iconWidth} />
  ) : (
    <button onClick={() => {
      setIsSelected(!isSelected)
    }}>
      <Image
        src={isSelected ? GreenChairIcon : WhiteChairIcon}
        alt="Available Seat"
        width={iconWidth}
      />
    </button>
  )
}
