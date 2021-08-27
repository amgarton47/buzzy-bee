import axios from "axios";

import { calculateTotalScore, calculateWordScore, shuffle } from "../utils";

const SET_BEE_DATA = "SET_BEE_DATA";
const SHUFFLE_LETTERS = "SHUFFLE_LETTERS";
const MAKE_GUESS = "MAKE_GUESS";
const INCREMENT_SCORE = "INCREMENT_SCORE";

const setBeeData = (data) => ({ type: SET_BEE_DATA, data });
export const shuffleLetters = () => ({ type: SHUFFLE_LETTERS });

export const fetchBeeDataThunk = (date) => async (dispatch) => {
  axios
    .get(`/api/beeData/${date}`)
    .then(({ data }) => {
      if (data.centerLetter) {
        dispatch(setBeeData(data));
      } else {
        window.location.assign("/today");
      }
    })
    .catch((err) => console.log(err));
};

export const makeGuess = (guess) => ({ type: MAKE_GUESS, guess });

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
};

const getRank = (score, answers, pangrams) => {
  const maxScore = calculateTotalScore(answers, pangrams);
  const pct = Math.round((score / maxScore) * 100);
  if (pct < 2) {
    return { title: "Beginner", level: 0 };
  } else if (pct < 5) {
    return { title: "Good Start", level: 1 };
  } else if (pct < 8) {
    return { title: "Moving Up", level: 2 };
  } else if (pct < 15) {
    return { title: "Good", level: 3 };
  } else if (pct < 25) {
    return { title: "Solid", level: 4 };
  } else if (pct < 40) {
    return { title: "Nice", level: 5 };
  } else if (pct < 50) {
    return { title: "Great", level: 6 };
  } else if (pct < 60) {
    return { title: "Amazing", level: 7 };
  } else if (pct < 100) {
    return { title: "Genius", level: 8 };
  } else if (pct == 100) {
    return { title: "Queen Bee!", level: 8 };
  }
};

export const incrementScore = (score) => ({
  type: INCREMENT_SCORE,
  score,
});

const beeDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BEE_DATA:
      const {
        centerLetter,
        outerLetters,
        answers,
        validLetters,
        displayDate,
        pangrams,
      } = action.data;
      return {
        ...state,
        centerLetter: centerLetter.trim(),
        outerLetters: shuffle(outerLetters.map((l) => l.trim())),
        validLetters: validLetters.map((l) => l.trim()),
        pangrams,
        answers,
        displayDate,
      };
    case MAKE_GUESS:
      const caseSensitiveEntry = action.guess.toLowerCase();

      if (state.guesses.includes(caseSensitiveEntry)) {
        return state;
      } else {
        if (state.answers.includes(caseSensitiveEntry)) {
          return {
            ...state,
            correctGuesses: [...state.correctGuesses, caseSensitiveEntry],
            guesses: [...state.guesses, caseSensitiveEntry],
            playerScore:
              state.playerScore +
              calculateWordScore(caseSensitiveEntry, state.pangrams),
            playerRank: getRank(
              state.playerScore +
                calculateWordScore(caseSensitiveEntry, state.pangrams),
              state.answers,
              state.pangrams
            ),
          };
        } else {
          return {
            ...state,
            guesses: [...state.guesses, caseSensitiveEntry],
          };
        }
      }
    case SHUFFLE_LETTERS:
      return { ...state, outerLetters: shuffle([...state.outerLetters]) };
    case INCREMENT_SCORE:
      return { ...state, playerScore: state.playerScore + action.score };
    default:
      return state;
  }
};

export default beeDataReducer;
