import { createSlice } from "@reduxjs/toolkit";

//Estado inicial
const initialState = {
  birds: [],
};

//Slice que será exportada al archivo index, con sus reducers
const birdsSlice = createSlice({
  name: "birdsSlice",
  initialState: initialState,
  reducers: {
    setBirds(state, { payload }) {
      state.birds = payload;
    },
  },
});

export const birdsActions = birdsSlice.actions;
export { birdsSlice };
