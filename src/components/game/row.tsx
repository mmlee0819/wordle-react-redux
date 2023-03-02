import { useState, useEffect } from "react"
import Grid from "./grid"

const validRegex = /^[A-Za-z]$/
const backSpace = /Backspace/
const enter = /Enter/
const gridsArr = ["1", "2", "3", "4", "5"]
const maxGridsLength = gridsArr.length

function Row() {
  const [currentGuesses, setCurrentGuesses] = useState<string[]>([])

  useEffect(() => {
    const handleGuess = (e: KeyboardEvent) => {
      const currentPressKey = e.key
      const isValidLetter = validRegex.test(currentPressKey)
      const isBackSpace = backSpace.test(currentPressKey)
      const isEnter = enter.test(currentPressKey)

      if (!isValidLetter && !isBackSpace && !isEnter) return
      if (currentGuesses.length >= maxGridsLength && isValidLetter) return
      if (currentGuesses.length < 1 && isBackSpace) return
      if (isBackSpace) return setCurrentGuesses(currentGuesses.slice(0, -1))

      setCurrentGuesses((prev) => [...prev, currentPressKey])
    }
    window.addEventListener("keydown", handleGuess)
    return () => {
      window.removeEventListener("keydown", handleGuess)
    }
  }, [currentGuesses])

  return (
    <div className="flex flex-column justify-center items-center p-3">
      <div className="grid grid-cols-5 gap-1.5">
        {gridsArr?.map((item, index) => (
          <Grid key={`${item}-${index + 1}`}>{currentGuesses[index]}</Grid>
        ))}
      </div>
    </div>
  )
}

export default Row
