import { configureStore } from "@reduxjs/toolkit"

import guessReducer from "./reducers"

export const store = configureStore({ reducer: guessReducer })
