import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { RootStateType } from "@/store/reducers"
import Row from "./row"
import { options } from "@/utils/wordsAPI"

const rowsArr = [1, 2, 3, 4, 5, 6]

const BingoText = "Bingo! Let's try next one!"

export default function Rows() {
  const stateRow = useSelector((state: RootStateType) => state.rowReducer)
  const guessStatus = stateRow.status
  const stateAnswer = useSelector((state: RootStateType) => state.answerReducer)
  const dispatch = useDispatch()

  const FailText = `The correct answer is ${stateAnswer.currentAnswer}.`

  const handleContinue = async () => {
    dispatch({ type: "NEXT_WORDLE" })
    dispatch({ type: "BACK_TO_FIRST_ROW" })
    try {
      const response = await axios.request(options)
      const newAnswer = (response.data as string).toUpperCase()
      dispatch({
        type: "GET_NEW_ANSWER",
        payload: {
          currentAnswer: newAnswer,
          answerHistory: stateAnswer.currentAnswer,
        },
      })
    } catch (err) {
      console.log({ err })
    }
  }

  return (
    <>
      <div className="grid gap-y-1.5 justify-center items-center p-3">
        {rowsArr?.map((item) => (
          <Row key={`row-${item}`} id={item} />
        ))}
      </div>

      <div
        className={`${
          guessStatus === "bingo" || guessStatus === "fail" ? "flex" : "hidden"
        } flex-col flex-wrap items-center font-semibold `}
      >
        <div className="mb-3">
          {guessStatus === "fail" ? FailText : BingoText}
        </div>
        <button
          className="flex mx-auto px-3 py-1 text-black bg-white rounded"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </>
  )
}
