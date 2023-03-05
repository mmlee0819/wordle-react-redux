import { useDispatch, useSelector } from "react-redux"
import { RootStateType } from "@/store/reducers"
import Row from "./row"

const rowsArr = [1, 2, 3, 4, 5, 6]
const presentContinueStatus = "bingo" || "fail"
const BingoText = "Bingo! Let's try next one!"
const FailText = `The correct answer is xxx.`

export default function Rows() {
  const stateRow = useSelector((state: RootStateType) => state.rowReducer)
  const guessStatus = stateRow.status
  const dispatch = useDispatch()

  return (
    <>
      <div className="grid gap-y-1.5 justify-center items-center p-3">
        {rowsArr?.map((item) => (
          <Row key={`row-${item}`} id={item} />
        ))}
      </div>

      <div
        className={`${
          guessStatus === presentContinueStatus ? "flex" : "hidden"
        } flex-col flex-wrap items-center font-semibold `}
      >
        <div className="mb-3">
          {guessStatus === "bingo" ? BingoText : FailText}
        </div>
        <button
          className="flex mx-auto px-3 py-1 text-black bg-white rounded"
          onClick={() => {
            dispatch({ type: "NEXT_WORDLE" })
            dispatch({ type: "BACK_TO_FIRST_ROW" })
          }}
        >
          Continue
        </button>
      </div>
    </>
  )
}
