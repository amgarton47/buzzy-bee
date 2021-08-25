import { combineReducers } from "redux";
import beeDataReducer from "./beeData";
import entryFieldReducer from "./entryField";
import guessedWordsReducer from "./guessedWords";
import gameDataReducer from "./gameData";

const appReducer = combineReducers({
  beeData: beeDataReducer,
  entryField: entryFieldReducer,
  gameData: gameDataReducer,
  // guessedWords: guessedWordsReducer,
});

export default appReducer;
