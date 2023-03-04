import Image from "next/image"
import { MainKeyButton, SpecificButton } from "./singleButton"
import backSpaceIcon from "@/assets/backspace.png"

export default function KeyRow({
  arr,
  isThird,
}: {
  arr: string[]
  isThird: boolean
}) {
  return (
    <div className="flex justify-center mt-0 mb-2 mx-auto gap-1">
      {isThird && <SpecificButton>Enter</SpecificButton>}
      {arr.map((item) => (
        <MainKeyButton key={item}>{item}</MainKeyButton>
      ))}
      {isThird && (
        <SpecificButton>
          <Image
            src={backSpaceIcon}
            alt="backSpaceIcon"
            width={24}
            height={18}
          />
        </SpecificButton>
      )}
    </div>
  )
}
