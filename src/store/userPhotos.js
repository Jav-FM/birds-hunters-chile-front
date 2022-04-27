import { createSlice } from "@reduxjs/toolkit";

//Estado inicial
const initialState = {
  userPhotos: [],
};

//Slice que será exportada al archivo index, con sus reducers
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
