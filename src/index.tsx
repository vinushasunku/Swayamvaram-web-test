import React, { useEffect } from "react";
import store from "./redux/store";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";
import { createSecureService } from "./services/APIServices";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

let persistor = persistStore(store);
root.render(
  <React.StrictMode>
    <Provider store={store}>

      <PersistGate loading={null} persistor={persistor}>

        <BrowserRouter>
          <App />
        </BrowserRouter>

      </PersistGate>

    </Provider>
  </React.StrictMode>





);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
