import { User } from "@/models/user";

import { createSlice } from "@reduxjs/toolkit";

const initialState: { user?: User } = {
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = undefined;
    },
  },
});

const authReducer = authSlice.reducer;

export default authReducer;
