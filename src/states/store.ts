import authReducer from "./auth.reducer";
import { configureStore } from "@reduxjs/toolkit";
// ...

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
