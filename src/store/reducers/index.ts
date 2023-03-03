import { AnyAction } from "redux"

export interface GuessType {
  id: number
  letter: string
  status: string
}

export interface RootStateType {
  guesses: GuessType[]
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
            status: "wrong",
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
    case "CHECK_GUESS": {
      return { guesses: action.payload }
    }
    default:
      return state
  }
}
