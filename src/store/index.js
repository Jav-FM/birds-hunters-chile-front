import { configureStore } from "@reduxjs/toolkit";

import { loginSlice } from "./login";
import { birdsSlice } from "./birds";
import { loadingSlice } from "./loading";
import { userPhotosSlice } from "./userPhotos";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    birds: birdsSlice.reducer,
    loading: loadingSlice.reducer,
    userPhotos: userPhotosSlice.reducer,
  },
});

export default store;
