import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loginSlice } from "./login";
import { birdsSlice } from "./birds";
import { loadingSlice } from "./loading";
import { userPhotosSlice } from "./userPhotos";

const reducers = combineReducers({
  login: loginSlice.reducer,
  birds: birdsSlice.reducer,
  loading: loadingSlice.reducer,
  userPhotos: userPhotosSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
