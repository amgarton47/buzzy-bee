import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./components/Routes";

document.onclick = () => document.getElementById("bee").focus();

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("app")
);
