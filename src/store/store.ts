import gameReducer from "./gameReducer";
import { configureStore, Action, combineReducers } from "@reduxjs/toolkit";
import thunk, { ThunkAction } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const persistConfig = {
  key: "game",
  storage
};

const rootReducer = combineReducers({
  game: gameReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  devTools: true,
  middleware: [thunk, logger, sagaMiddleware]
});

export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const persistor = persistStore(store);
