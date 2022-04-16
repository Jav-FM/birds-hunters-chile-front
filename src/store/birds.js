import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  birds: [],
};

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
