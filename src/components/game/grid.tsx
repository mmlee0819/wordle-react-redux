import { ReactNode } from "react"

interface ColorKeyType {
  [key: string]: string
}

const bgColor: ColorKeyType = {
  default: "bg-black",
  wrong: "bg-wrong",
  wrongSpot: "bg-wrongSpot",
  perfectCorrect: "bg-correct",
}

const borderColor: ColorKeyType = {
  default: "border-gloomy",
  wrong: "border-wrong",
  wrongSpot: "border-wrongSpot",
  perfectCorrect: "border-correct",
}

function Grid({
  category = "default",
  children,
}: {
  category: string
  children: ReactNode
}) {
  return (
    <div
      className={`flex xs:w-12 xs:h-12 xs:text-2xl w-14 h-14 justify-center items-center border-2 border-solid text-center text-3xl text-white font-semibold uppercase select-none ${borderColor[category]} ${bgColor[category]}`}
    >
      {children}
    </div>
  )
}

export default Grid
