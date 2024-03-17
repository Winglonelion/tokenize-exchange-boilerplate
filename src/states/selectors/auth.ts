import { RootState } from "../store.types";
import { createSelector } from "@reduxjs/toolkit";

export const selectUser = createSelector(
  (state: RootState) => state.auth.user,
  (user) => user,
);

export const selectJwtToken = createSelector(
  (state: RootState) => state.auth.user?.token,
  (token) => token,
);

export const selectIsAuth = createSelector(
  (state: RootState) => state.auth.user !== undefined,
  (isAuth) => isAuth,
);
