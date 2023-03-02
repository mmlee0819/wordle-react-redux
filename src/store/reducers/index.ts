import { AnyAction } from "redux"

export interface GuessType {
  id: number
  letter: string
  isCorrectSpot: boolean
  isPerfectCorrect: boolean
}

export interface RootStateType {
  guesses: any
  state: {
    guesses: GuessType[]
  }
}
const initialState = {
  guesses: [] as GuessType[],
}

export default function guessReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "ADD_GUESS": {
      return {
        guesses: [
          ...state.guesses,
          {
            id: state.guesses.length + 1,
            letter: action.payload,
            isCorrectSpot: false,
            isPerfectCorrect: false,
          },
        ],
      }
    }
    case "REMOVE_GUESS": {
      return {
        guesses: state.guesses.filter(
          (item) => item.id !== state.guesses.length
        ),
      }
    }
    default:
      return state
  }
}
