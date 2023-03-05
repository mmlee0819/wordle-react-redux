import Image from "next/image"
import { SingleButton } from "./singleButton"
import backSpaceIcon from "@/assets/backspace.png"

export default function KeyRow({
  arr,
  isThird,
}: {
  arr: string[]
  isThird: boolean
}) {
  return (
    <div className="flex justify-center mt-0 mb-2 mx-auto gap-1.5">
      {isThird && <SingleButton id="Enter">Enter</SingleButton>}
      {arr.map((item) => (
        <SingleButton key={item} id={item}>
          {item}
        </SingleButton>
      ))}
      {isThird && (
        <SingleButton id="Backspace">
          <Image
            id="Backspace"
            src={backSpaceIcon}
            alt="backSpaceIcon"
            width={24}
            height={18}
          />
        </SingleButton>
      )}
    </div>
  )
}
