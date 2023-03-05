import { ReactNode } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootStateType } from "@/store/reducers"
import {
  validRegex,
  backSpace,
  enter,
  maxGridsLength,
  maxTries,
  answer,
} from "@/utils/data"

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

  const dispatch = useDispatch()

  const handleGuess = (e: React.MouseEvent) => {
    const currentClickKey = (e.target as HTMLElement).id
    console.log({ currentClickKey })
    const isValidLetter = validRegex.test(currentClickKey)
    const isBackSpace = backSpace.test(currentClickKey)
    const isEnter = enter.test(currentClickKey)

    if (!isValidLetter && !isBackSpace && !isEnter) return

    const currentRow = stateRow.currentRow
    const guessWordLength = stateGuess[currentRow].length
    const guessWord = stateGuess[currentRow]
      .map((item) => item.letter)
      .join("")
      .toUpperCase()

    if (guessWordLength === maxGridsLength && isValidLetter) return
    if (guessWordLength < 1 && isBackSpace) return
    if (
      currentRow === maxTries &&
      guessWordLength >= maxGridsLength &&
      isEnter &&
      guessWord !== answer
    ) {
      dispatch({
        type: "CHECK_GUESS",
        payload: {
          rowNumber: currentRow,
          answer: answer,
        },
      })
      dispatch({ type: "IS_FAIL", payload: "fail" })
      return
    }
    if (guessWordLength >= maxGridsLength && isEnter && guessWord === answer) {
      dispatch({ type: "IS_BINGO", payload: "bingo" })
      dispatch({ type: "BINGO_GUESS", payload: currentRow })
      return
    }

    if (guessWordLength >= maxGridsLength && isEnter) {
      dispatch({
        type: "CHECK_GUESS",
        payload: {
          rowNumber: currentRow,
          answer: answer,
        },
      })
      dispatch({
        type: "NEXT_ROW",
        payload: currentRow + 1,
      })
      return
    }
    if (isEnter) {
      dispatch({
        type: "IS_REMINDER",
        payload: "tooShort",
      })
      setTimeout(() => {
        dispatch({
          type: "IS_NO_REMINDER",
          payload: "notSure",
        })
      }, 1200)

      return
    }
    if (isBackSpace)
      return dispatch({
        type: "REMOVE_GUESS",
        payload: currentRow,
      })

    dispatch({
      type: "ADD_GUESS",
      payload: {
        rowNumber: currentRow,
        guess: [
          ...stateGuess[currentRow],
          {
            id: stateGuess[currentRow].length + 1,
            letter: currentClickKey,
            status: "default",
          },
        ],
      },
    })
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
      onClick={handleGuess}
    >
      {children}
    </button>
  )
}
