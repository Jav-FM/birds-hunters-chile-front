import { createSlice } from "@reduxjs/toolkit";

//Estado inicial
const initialState = {
  loading: true,
};

//Slice que será exportada al archivo index, con sus reducers
const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState: initialState,
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
  },
});

export const loadingActions = loadingSlice.actions;
export { loadingSlice };
