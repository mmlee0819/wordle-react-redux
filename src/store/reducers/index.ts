import { combineReducers } from "redux"
import answerReducer, { AnswerStateType } from "./answerReducer"
import guessReducer, { GuessStateType } from "./guessReducer"
import rowReducer, { RowStateType } from "./rowReducer"

export interface RootStateType {
  guessReducer: GuessStateType
  rowReducer: RowStateType
  answerReducer: AnswerStateType
}

const rootReducer = combineReducers({ guessReducer, rowReducer, answerReducer })

export default rootReducer
