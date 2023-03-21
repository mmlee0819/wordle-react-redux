import { ReactNode } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootStateType } from "@/store/reducers"
import { handleGuess } from "@/utils/functions/handleGuess"

const mainKeyButtonStyle =
  "max-w-[45px] w-full h-14 rounded bg-keyBg justify-center items-center text-xl text-white font-semibold uppercase select-none"
const specificButtonStyle =
  "flex max-w-[58px] w-full h-14 rounded justify-center items-center text-xs text-white font-semibold uppercase select-none bg-keyBg"

export function SingleButton({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  const stateRow = useSelector((state: RootStateType) => state.rowReducer)
  const stateGuess = useSelector(
    (state: RootStateType) => state.guessReducer.guesses
  )
  const stateAnswer = useSelector((state: RootStateType) => state.answerReducer)

  const dispatch = useDispatch()

  const handleClick = (e: React.MouseEvent) => {
    const currentClickKey = (e.target as HTMLElement).id

    handleGuess(
      currentClickKey,
      stateRow,
      stateGuess,
      dispatch,
      stateAnswer.currentAnswer
    )
  }

  return (
    <button
      type="button"
      className={
        id === "Enter" || id === "Backspace"
          ? specificButtonStyle
          : mainKeyButtonStyle
      }
      id={id}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
