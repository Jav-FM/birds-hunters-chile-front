import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginState: false,
  userData: {},
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initialState,
  reducers: {
    login(state, { payload }) {
      state.loginState = true;
      state.userData = payload;
    },
    manipularTelon(state, { payload }) {
      state.telon = payload;
    },
    logout(state) {
      state.loginState = false;
      state.userData = {}
    },
  },
});

export const loginActions = loginSlice.actions;
export { loginSlice };
