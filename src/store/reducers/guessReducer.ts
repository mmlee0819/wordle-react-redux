import { AnyAction } from "redux"

export interface GuessGridType {
  id: number
  letter: string
  status: string
}

export interface GuessStateType {
  guesses: {
    [key: number]: GuessGridType[]
  }
}

const initialState = {
  guesses: {
    1: [] as GuessGridType[],
    2: [] as GuessGridType[],
    3: [] as GuessGridType[],
    4: [] as GuessGridType[],
    5: [] as GuessGridType[],
    6: [] as GuessGridType[],
  },
}

export default function guessReducer(
  state = initialState as GuessStateType,
  action: AnyAction
) {
  switch (action.type) {
    case "ADD_GUESS": {
      return {
        guesses: {
          ...state.guesses,
          [action.payload.rowNumber]: action.payload.guess,
        },
      }
    }
    case "REMOVE_GUESS": {
      return {
        guesses: {
          ...state.guesses,
          [action.payload]: state.guesses[action.payload].filter(
            (item: GuessGridType) =>
              item.id !== state.guesses[action.payload].length
          ),
        },
      }
    }
    case "CHECK_GUESS": {
      const currentRow = action.payload.rowNumber
      const currentAnswer = action.payload.answer
      return {
        guesses: {
          ...state.guesses,
          [currentRow]: state.guesses[currentRow].map(
            (item: GuessGridType, index: number) => {
              const upperCaseLetter = item.letter.toUpperCase()
              if (upperCaseLetter === currentAnswer[index])
                return { ...item, status: "perfectCorrect" }
              if (currentAnswer.includes(upperCaseLetter))
                return { ...item, status: "wrongSpot" }
              return item
            }
          ),
        },
      }
    }
    default:
      return state
  }
}
