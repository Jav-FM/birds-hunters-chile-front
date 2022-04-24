import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
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
});

export default store;

