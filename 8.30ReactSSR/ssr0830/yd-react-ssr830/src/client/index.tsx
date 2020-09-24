import React from "react";
import ReactDOM from "react-dom";
import App from "../shared/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createClientStore } from "../shared/store";

ReactDOM.hydrate(
  <Provider store={createClientStore()}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
