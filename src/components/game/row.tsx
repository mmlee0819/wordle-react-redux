import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootStateType, GuessType } from "../../store/reducers"
import Grid from "./grid"

const validRegex = /^[A-Za-z]$/
const backSpace = /Backspace/
const enter = /Enter/
const gridsArr = ["1", "2", "3", "4", "5"]
const maxGridsLength = gridsArr.length
const answer = "SHARK"

function Row() {
  const [showReminder, setShowReminder] = useState(false)
  const stateGuess = useSelector((state: RootStateType) => state.guesses)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleGuess = (e: KeyboardEvent) => {
      const currentPressKey = e.key
      const isValidLetter = validRegex.test(currentPressKey)
      const isBackSpace = backSpace.test(currentPressKey)
      const isEnter = enter.test(currentPressKey)

      if (!isValidLetter && !isBackSpace && !isEnter) return
      if (stateGuess.length < 1 && isBackSpace) return
      if (stateGuess.length >= maxGridsLength && isValidLetter) return
      if (stateGuess.length >= maxGridsLength && isEnter)
        return dispatch({
          type: "CHECK_GUESS",
          payload: stateGuess.map((item: GuessType, index: number) => {
            const upperCaseLetter = item.letter.toUpperCase()
            if (upperCaseLetter === answer[index])
              return { ...item, status: "perfectCorrect" }
            if (answer.includes(upperCaseLetter))
              return { ...item, status: "wrongSpot" }
            return item
          }),
        })

      if (isBackSpace) return dispatch({ type: "REMOVE_GUESS" })

      if (isEnter) return setShowReminder(true)

      dispatch({
        type: "ADD_GUESS",
        payload: currentPressKey,
      })
    }

    window.addEventListener("keydown", handleGuess)
    return () => {
      window.removeEventListener("keydown", handleGuess)
    }
  }, [dispatch, stateGuess])

  return (
    <div className="flex flex-column justify-center items-center p-3">
      <div className="grid grid-cols-5 gap-1.5">
        {gridsArr?.map((item, index) => (
          <Grid key={`${item}-${index + 1}`}>{stateGuess[index]?.letter}</Grid>
        ))}
      </div>
    </div>
  )
}

export default Row
