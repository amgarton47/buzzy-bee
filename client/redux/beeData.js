import axios from "axios";

import { calculateTotalScore, calculateWordScore } from "../utils";

const SET_BEE_DATA = "SET_BEE_DATA";
const SHUFFLE_LETTERS = "SHUFFLE_LETTERS";
// const INCREMENT_SCORE = "INCREMENT_SCORE";

const setBeeData = (data) => ({ type: SET_BEE_DATA, data });
export const shuffleLetters = () => ({ type: SHUFFLE_LETTERS });

export const fetchBeeDataThunk = () => async (dispatch) => {
  axios
    .get("/api/beeData/today")
    .then(({ data }) => dispatch(setBeeData(data)))
    .catch((err) => console.log(err));
};

const MAKE_GUESS = "MAKE_GUESS";

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
  playerRank: "Beginner",
};

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const getRank = (score, answers, pangrams) => {
  const maxScore = calculateTotalScore(answers, pangrams);
  const pct = Math.round((score / maxScore) * 100);
  if (pct < 2) {
    return "Beginner";
  } else if (pct < 5) {
    return "Good Start";
  } else if (pct < 8) {
    return "Moving Up";
  } else if (pct < 15) {
    return "Good";
  } else if (pct < 25) {
    return "Solid";
  } else if (pct < 40) {
    return "Nice";
  } else if (pct < 50) {
    return "Great";
  } else if (pct < 60) {
    return "Amazing";
  } else if (pct < 100) {
    return "Genius";
  } else if (pct == 100) {
    return "Queen Bee";
  }
};

// export const incrementScore = (score) => ({
//   type: INCREMENT_SCORE,
//   score,
// });

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
        centerLetter,
        outerLetters,
        validLetters,
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
    // case INCREMENT_SCORE:
    //   return { ...state, playerScore: state.playerScore + action.score };
    default:
      return state;
  }
};

export default beeDataReducer;
