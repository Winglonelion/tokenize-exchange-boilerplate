import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import { mmkvStore } from "./persist.store";
import authReducer from "./reducers/auth.reducer";
import marketsReducer from "./reducers/markets.reducer";

const persistConfig = {
  key: "root",
  storage: mmkvStore,
  version: 1,
  whitelist: ["auth"],
  blacklist: ["markets"],
};

export const rootReducer = combineReducers({
  auth: authReducer,
  markets: marketsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
