import KeyRow from "./keyRow"

const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"]

export default function Keyboard() {
  return (
    <div className="mt-5">
      <KeyRow arr={firstRow} isThird={false} />
      <KeyRow arr={secondRow} isThird={false} />
      <KeyRow arr={thirdRow} isThird />
    </div>
  )
}
