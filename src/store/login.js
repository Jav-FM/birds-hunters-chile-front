import { createSlice } from "@reduxjs/toolkit";

//estado inicial
const initialState = {
  loginState: false,
  userData: {},
};

//Slice que será exportada al archivo index, con sus reducers
const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initialState,
  reducers: {
    login(state, { payload }) {
      state.loginState = true;
      state.userData = payload;
    },
    logout(state) {
      state.loginState = false;
      state.userData = {};
    },
  },
});

export const loginActions = loginSlice.actions;
export { loginSlice };
