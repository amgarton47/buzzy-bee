import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import { createLogger } from "redux-logger"; // https://github.com/evgenyrodionov/redux-logger
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk"; // https://github.com/gaearon/redux-thunk
import appReducer from "./redux";

let middleware = [
  // `withExtraArgument` gives us access to axios in our async action creators!
  // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
  thunkMiddleware.withExtraArgument({ axios }),
];

export default createStore(
  appReducer,

  composeWithDevTools(applyMiddleware(...middleware))
);
