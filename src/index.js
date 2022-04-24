import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./router/App";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist'

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

let persistor = persistStore(store);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
