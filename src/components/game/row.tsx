import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootStateType } from "../../store/reducers"
import { GuessStateType } from "../../store/reducers/guessReducer"

import Grid from "./grid"

const validRegex = /^[A-Za-z]$/
const backSpace = /Backspace/
const enter = /Enter/
const gridsArr = ["1", "2", "3", "4", "5"]
const maxGridsLength = gridsArr.length
const maxTries = 6
const answer = "SHARK"

function Row({ id }: { id: number }) {
  const [showReminder, setShowReminder] = useState(false)

  const stateRow = useSelector((state: RootStateType) => state.rowReducer)
  const stateGuess = useSelector(
    (state: RootStateType) => state.guessReducer.guesses
  )

  const dispatch = useDispatch()

  useEffect(() => {
    const handleGuess = (e: KeyboardEvent) => {
      if (id !== stateRow.currentRow) return

      const currentPressKey = e.key
      const isValidLetter = validRegex.test(currentPressKey)
      const isBackSpace = backSpace.test(currentPressKey)
      const isEnter = enter.test(currentPressKey)

      if (!isValidLetter && !isBackSpace && !isEnter) return

      const guessWordLength = stateGuess[id]?.length
      const guessWord = stateGuess[id]
        .map((item) => item.letter)
        .join("")
        .toUpperCase()

      if (guessWordLength === maxGridsLength && isValidLetter) return
      if (guessWordLength < 1 && isBackSpace) return
      if (
        id === maxTries &&
        guessWordLength >= maxGridsLength &&
        isEnter &&
        guessWord !== answer
      )
        return dispatch({ type: "IS_FAIL", payload: "fail" })
      if (guessWordLength >= maxGridsLength && isEnter && guessWord === answer)
        return dispatch({ type: "IS_BINGO", payload: "bingo" })
      if (guessWordLength >= maxGridsLength && isEnter) {
        dispatch({
          type: "CHECK_GUESS",
          payload: {
            rowNumber: id,
            answer: answer,
          },
        })
        dispatch({
          type: "NEXT_ROW",
          payload: stateRow.currentRow + 1,
        })
        return
      }
      if (isEnter) return setShowReminder(true)
      if (isBackSpace)
        return dispatch({
          type: "REMOVE_GUESS",
          payload: id,
        })

      dispatch({
        type: "ADD_GUESS",
        payload: {
          rowNumber: id,
          guess: [
            ...stateGuess[id],
            {
              id: stateGuess[id].length + 1,
              letter: currentPressKey,
              status: "unknown",
            },
          ],
        },
      })
    }
    window.addEventListener("keydown", handleGuess)
    return () => {
      window.removeEventListener("keydown", handleGuess)
    }
  }, [dispatch, id, stateGuess, stateRow.currentRow])

  return (
    <div className="grid grid-cols-5 gap-1.5">
      {gridsArr?.map((item, index) => (
        <Grid key={`${item}-${index + 1}`}>
          {stateGuess[id]?.[index]?.letter}
        </Grid>
      ))}
    </div>
  )
}

export default Row
