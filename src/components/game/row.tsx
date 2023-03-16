import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootStateType } from "@/store/reducers"
import { handleGuess } from "@/utils/functions/handleGuess"
import Grid from "./grid"

const gridsArr = ["1", "2", "3", "4", "5"]

export default function Row({ id }: { id: number }) {
  const stateRow = useSelector((state: RootStateType) => state.rowReducer)
  const stateGuess = useSelector(
    (state: RootStateType) => state.guessReducer.guesses
  )
  const stateAnswer = useSelector((state: RootStateType) => state.answerReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (id !== stateRow.currentRow) return
      const currentPressKey = e.key
      handleGuess(
        currentPressKey,
        stateRow,
        stateGuess,
        dispatch,
        stateAnswer.currentAnswer
      )
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [dispatch, id, stateGuess, stateRow])

  return (
    <div className="relative grid grid-cols-5 gap-1.5">
      {gridsArr?.map((item, index) => (
        <Grid
          key={`${item}-${index + 1}`}
          category={stateGuess[id]?.[index]?.status}
        >
          {stateGuess[id]?.[index]?.letter}
        </Grid>
      ))}
      {stateRow.status === "tooShort" && id === stateRow.currentRow && (
        <div className="xs:h-8 xs:text-sm absolute right-2/4 translate-x-2/4 flex px-2 justify-center items-center w-3/5 h-10 rounded font-semibold text-base text-black bg-white select-none">
          Not enough letters
        </div>
      )}
    </div>
  )
}
