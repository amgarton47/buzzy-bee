import { combineReducers } from "redux";
import beeDataReducer from "./beeData";
import entryFieldReducer from "./entryField";
import guessedWordsReducer from "./guessedWords";

const appReducer = combineReducers({
  beeData: beeDataReducer,
  entryField: entryFieldReducer,
  // guessedWords: guessedWordsReducer,
});

export default appReducer;
