import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";

import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import { rootReducer } from "./store/store";

const globalStore = legacy_createStore(rootReducer);

createRoot(document.getElementById("root")).render(
  <Provider store={globalStore}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
