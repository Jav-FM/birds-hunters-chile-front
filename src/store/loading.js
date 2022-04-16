import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
};

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
