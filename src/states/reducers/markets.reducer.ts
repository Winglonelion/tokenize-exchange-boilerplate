import { combineMarketsMap } from "@/models/dto/markets";
import { MarketPricingInfo } from "@/models/markets";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { marketsMap: Record<string, MarketPricingInfo> } = {
  marketsMap: {},
};

export const marketsSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    setMarketsMap: (
      state,
      { payload }: PayloadAction<{ markets: MarketPricingInfo[] }>,
    ) => {
      const maps = combineMarketsMap(payload.markets);
      state.marketsMap = maps;
    },
    clearMarketsMap: (state) => {
      state.marketsMap = {};
    },
  },
});

const marketsReducer = marketsSlice.reducer;

export default marketsReducer;
