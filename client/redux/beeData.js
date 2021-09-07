import axios from "axios";

import {
  calculateTotalScore,
  calculateWordScore,
  shuffle,
  getRank,
} from "../utils";

// ACTION TYPES
const SET_BEE_DATA = "SET_BEE_DATA";
const SHUFFLE_LETTERS = "SHUFFLE_LETTERS";
const MAKE_GUESS = "MAKE_GUESS";
const INCREMENT_SCORE = "INCREMENT_SCORE";
const SET_GAME_DATA = "SET_GAME_DATA";
const ADD_FOUND_WORD = "ADD_FOUND_WORD";
const ADD_ENTRY_ATTEMPT = "ADD_ENTRY_ATTEMPT";
const IS_LOADING = "IS_LOADING";
const IS_NOT_LOADING = "IS_NOT_LOADING";

// ACTION CREATORS
const setGameData = (data) => ({
  type: SET_GAME_DATA,
  data,
});

const isLoading = () => ({
  type: IS_LOADING,
});

const isNotLoading = () => ({
  type: IS_NOT_LOADING,
});

const addEntryAttempt = () => ({
  type: ADD_ENTRY_ATTEMPT,
  data,
});

export const incrementScore = (score) => ({
  type: INCREMENT_SCORE,
  score,
});

export const addFoundWord = (word) => ({
  type: ADD_FOUND_WORD,
  word,
});

export const makeGuess = (guess) => ({ type: MAKE_GUESS, guess });

const setBeeData = (data) => ({ type: SET_BEE_DATA, data });
export const shuffleLetters = () => ({ type: SHUFFLE_LETTERS });

// THUNK CREATORS
export const fetchGameDataThunk = (date) => async (dispatch) => {
  axios
    .get(`/api/gameData/${date}`)
    .then(({ data }) => dispatch(setGameData(data)))
    .catch((err) => console.log(err));
};

export const addFoundWordThunk = (newWord, date) => async (dispatch) => {
  axios
    .put(`/api/gameData/${date}`, { newWord })
    .then(dispatch(addFoundWord(newWord)))
    .catch((err) => console.log(err));
};

export const fetchBeeDataThunk = (date) => async (dispatch) => {
  dispatch(isLoading());
  axios
    .get(`/api/beeData/${date}`)
    .then(({ data }) => {
      if (data.centerLetter) {
        dispatch(setBeeData(data));
      } else {
        window.location.assign("/today");
      }
    })
    .then(() => dispatch(fetchGameDataThunk(date)))
    .then(() => dispatch(isNotLoading()))
    .catch((err) => console.log(err));
};

const initialState = {
  centerLetter: "",
  outerLetters: [],
  answers: [],
  validLetters: [],
  displayDate: "",
  pangrams: [],
  guesses: [],
  correctGuesses: [],
  playerScore: 0,
  playerRank: { title: "Beginner", level: 0 },
  date: "",
  foundWords: [],
  duration: 0,
  pangramsFound: [],
  entriesAttempted: 0,
  loading: true,
};

// const initialState = {
//   // BEE DATA
//   centerLetter: "s",
//   outerLetters: ["p", "a", "n", "g", "r", "m"],
//   answers: ["pangrams", "pangs", "sang", "pans", "span"],
//   validLetters: ["p", "a", "n", "g", "r", "m", "s"],
//   displayDate: "August 26, 2021",
//   pangrams: ["pangrams"],
//   playerScore: 0,
//   playerRank: { title: "Beginner", level: 0 },
//   // GAME DATA
//   date: "",
//   foundWords: [],
//   duration: 0,
//   pangramsFound: [],
//   entriesAttempted: 0,
// };

const beeDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BEE_DATA: // set bee data on state (retrieved from api)
      const { centerLetter, outerLetters, validLetters } = action.data;
      return {
        ...state,
        ...action.data,
        centerLetter: centerLetter.trim(),
        outerLetters: shuffle(outerLetters.map((l) => l.trim())),
        validLetters: validLetters.map((l) => l.trim()),
      };
    case SHUFFLE_LETTERS:
      return { ...state, outerLetters: shuffle([...state.outerLetters]) };
    case SET_GAME_DATA:
      const { foundWords } = action.data;
      return {
        ...state,
        ...action.data,
        playerScore: calculateTotalScore(foundWords, state.pangrams),
        playerRank: getRank(
          calculateTotalScore(foundWords, state.pangrams),
          state.answers,
          state.pangrams
        ),
      };
    case ADD_FOUND_WORD:
      return {
        ...state,
        foundWords: [...state.foundWords, action.word],
        playerScore:
          state.playerScore + calculateWordScore(action.word, state.pangrams),
        playerRank: getRank(
          state.playerScore + calculateWordScore(action.word, state.pangrams),
          state.answers,
          state.pangrams
        ),
      };
    case ADD_ENTRY_ATTEMPT:
      return { ...state, entriesAttempted: state.entriesAttempted + 1 };
    case IS_LOADING:
      return { ...state, loading: true };
    case IS_NOT_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default beeDataReducer;
