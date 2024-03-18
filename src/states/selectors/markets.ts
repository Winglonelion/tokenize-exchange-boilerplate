import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store.types";

export const selectMarketItem = createSelector(
  [(state: RootState) => state.markets.marketsMap, (_, pair: string) => pair],
  (marketsMap, pair) => {
    return Object.hasOwn(marketsMap, pair) ? marketsMap[pair] : undefined;
  },
);
