import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store.types";

export const selectUser = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth.user,
);

export const selectJwtToken = createSelector(
  (state: RootState) => state.auth.user,
  (user) => user?.token,
);

export const selectIsAuth = createSelector(
  (state: RootState) => state.auth.user,
  (user) => user !== undefined,
);
