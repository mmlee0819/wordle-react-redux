import { AnyAction } from "redux"

export interface RowStateType {
  currentRow: number
  point: number
  status: string
}

const initialState = {
  currentRow: 1,
  point: 0,
  status: "notSure",
}

export default function rowReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "NEXT_ROW": {
      return { ...state, currentRow: action.payload }
    }
    case "IS_BINGO": {
      return { ...state, status: action.payload }
    }
    case "IS_FAIL": {
      return { ...state, currentRow: 1, status: action.payload }
    }
    case "Back_TO_FIRST_ROW": {
      return {}
    }
    default:
      return state
  }
}
