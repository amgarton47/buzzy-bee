import { combineReducers } from "redux";
import beeDataReducer from "./beeData";
import entryFieldReducer from "./entryField";
// import gameDataReducer from "./gameData";

const appReducer = combineReducers({
  beeData: beeDataReducer,
  entryField: entryFieldReducer,
  // gameData: gameDataReducer,
});

export default appReducer;
