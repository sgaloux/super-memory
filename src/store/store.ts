import gameReducer from "./gameReducer";
import { configureStore, Action, combineReducers } from "@reduxjs/toolkit";
import thunk, { ThunkAction } from "redux-thunk";
import logger from "redux-logger";
const rootReducer = combineReducers({
  game: gameReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [thunk, logger]
});

export type AppDispatch = typeof store.dispatch;

export default store;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
