import { AnyAction } from "redux"

export interface UserStateType {
  isAuthenticated: boolean
  email: string
  displayName: string
  photoURL: string
  id: string
  point: number
  wordleHistory: string[]
}

const initialState = {
  isAuthenticated: false,
  email: "",
  displayName: "",
  photoURL: "",
  id: "",
  point: 0,
  wordleHistory: [],
}

export default function userReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "HAS_CURRENT_USER": {
      return {
        isAuthenticated: true,
        email: action.payload.email,
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL,
        id: action.payload.id,
        point: action.payload.point,
        wordleHistory: action.payload.wordleHistory,
      }
    }
    case "UPDATE_USER_POINTS": {
      return {
        ...state,
        point: action.payload,
      }
    }
    case "LOG_OUT": {
      return {
        isAuthenticated: false,
        email: "",
        displayName: "",
        photoURL: "",
        id: "",
        point: 0,
        wordleHistory: [],
      }
    }
    default:
      return state
  }
}
