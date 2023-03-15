import { combineReducers } from "redux"
import answerReducer, { AnswerStateType } from "./answerReducer"
import guessReducer, { GuessStateType } from "./guessReducer"
import rowReducer, { RowStateType } from "./rowReducer"
import userReducer, { UserStateType } from "./userReducer"

export interface RootStateType {
  guessReducer: GuessStateType
  rowReducer: RowStateType
  answerReducer: AnswerStateType
  userReducer: UserStateType
}

const rootReducer = combineReducers({
  guessReducer,
  rowReducer,
  answerReducer,
  userReducer,
})

export default rootReducer
