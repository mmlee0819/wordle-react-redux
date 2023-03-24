import { AnyAction } from "redux"

export interface RowStateType {
  currentRow: number
  status: string
}

const initialState = {
  currentRow: 1,
  status: "notSure",
}

export default function rowReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "NEXT_ROW": {
      return { ...state, currentRow: action.payload }
    }
    case "IS_BINGO": {
      return {
        ...state,
        currentRow: 7,
        status: action.payload,
      }
    }
    case "IS_FAIL": {
      return { ...state, currentRow: 7, status: action.payload }
    }
    case "IS_REMINDER": {
      return { ...state, status: action.payload }
    }
    case "IS_NO_REMINDER": {
      return { ...state, status: action.payload }
    }
    case "BACK_TO_FIRST_ROW": {
      return { ...state, currentRow: 1, status: "notSure" }
    }
    default:
      return state
  }
}
