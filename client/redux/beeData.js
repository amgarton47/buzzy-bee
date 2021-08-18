import axios from "axios";

const SET_BEE_DATA = "SET_BEE_DATA";
const SHUFFLE_LETTERS = "SHUFFLE_LETTERS";

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
    default:
      return state;
  }
};

export default beeDataReducer;
