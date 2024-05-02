"use client"

import WhitePlusIcon from "@public/white-plus-icon.svg"
import WhiteMinusIcon from "@public/white-minus-icon.svg"
import Image from "next/image"
import { useState } from "react"

type Props = {
  onAdd: () => void
  onMinus: () => void
}

export default function Counter({ onAdd, onMinus }: Readonly<Props>) {
  const [count, setCount] = useState(0)

  const buttonStyles = "bg-jade p-1 rounded-full"
  const iconWidth = 30

  return (
    <div className="flex items-center gap-5">
      <button
        className={buttonStyles}
        onClick={() => {
          if (count == 0) return
          const newCount = count - 1
          setCount(newCount)
          onMinus()
        }}
      >
        <Image src={WhiteMinusIcon} alt="Minus Icon" width={iconWidth} />
      </button>
      <p className="text-white font-semibold text-xl">{count}</p>
      <button
        className={buttonStyles}
        onClick={() => {
          const newCount = count + 1
          setCount(newCount)
          onAdd()
        }}
      >
        <Image src={WhitePlusIcon} alt="Plus Icon" width={iconWidth} />
      </button>
    </div>
  )
}
