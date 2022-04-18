import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userPhotos: [],
};

const userPhotosSlice = createSlice({
  name: "userPhotosSlice",
  initialState: initialState,
  reducers: {
    setUserPhotos(state, { payload }) {
      state.userPhotos = payload;
    },
  },
});

export const userPhotosActions = userPhotosSlice.actions;
export { userPhotosSlice };
