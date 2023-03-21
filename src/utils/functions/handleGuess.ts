import { Dispatch } from "redux"
import { GuessGridType } from "@/store/reducers/guessReducer"
import { RowStateType } from "@/store/reducers/rowReducer"
import {
  validRegex,
  backSpace,
  enter,
  maxGridsLength,
  maxTries,
} from "@/utils/data"

export const handleGuess = (
  currentKey: string,
  stateRow: RowStateType,
  stateGuess: {
    [key: number]: GuessGridType[]
  },
  dispatch: Dispatch,
  answer: string
) => {
  const isValidLetter = validRegex.test(currentKey)
  const isBackSpace = backSpace.test(currentKey)
  const isEnter = enter.test(currentKey)
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
          letter: currentKey,
          status: "default",
        },
      ],
    },
  })
}
