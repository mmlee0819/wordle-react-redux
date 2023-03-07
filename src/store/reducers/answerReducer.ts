import { AnyAction } from "redux"

export interface AnswerStateType {
  currentAnswer: string
  answerHistory: string[]
}

const initialState = {
  currentAnswer: "SHARK",
  answerHistory: [],
}

export default function answerReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "GET_NEW_ANSWER": {
      return {
        currentAnswer: action.payload.currentAnswer,
        answerHistory: [...state.answerHistory, action.payload.answerHistory],
      }
    }
    default:
      return state
  }
}
