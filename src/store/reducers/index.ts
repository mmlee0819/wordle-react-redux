import { combineReducers } from "redux"
import guessReducer, { GuessStateType } from "./guessReducer"
import rowReducer, { RowStateType } from "./rowReducer"

export interface RootStateType {
  guessReducer: GuessStateType
  rowReducer: RowStateType
}

const rootReducer = combineReducers({ guessReducer, rowReducer })

export default rootReducer
