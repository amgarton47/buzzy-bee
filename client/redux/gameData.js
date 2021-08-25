import axios from "axios";

const SET_GAME_DATA = "SET_GAME_DATA";
const ADD_FOUND_WORD = "ADD_FOUND_WORD";

const setGameData = (data) => ({
  type: SET_GAME_DATA,
  data,
});

export const fetchGameDataThunk = (date) => async (dispatch) => {
  axios
    .get(`/api/gameData/${date}`)
    .then(({ data }) => dispatch(setGameData(data)))
    .catch((err) => console.log(err));
};

export const addFoundWordThunk = (newWord, date) => async (dispatch) => {
  dispatch(addFoundWord(newWord));
  axios
    .put(`/api/gameData/${date}`, { newWord })
    // .then(() => dispatch(addFoundWord(newWord)))
    .catch((err) => console.log(err));
};

export const addFoundWord = (word) => ({
  type: ADD_FOUND_WORD,
  word,
});

const initialState = {
  date: "",
  foundWords: [],
  duration: 0,
  pangramsFound: [],
  entriesAttempted: 0,
};

const gameDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_DATA:
      const { date, foundWords, duration, pangramsFound, entriesAttempted } =
        action.data;
      return { date, foundWords, duration, pangramsFound, entriesAttempted };
    case ADD_FOUND_WORD:
      return { ...state, foundWords: [...state.foundWords, action.word] };
    default:
      return state;
  }
};

export default gameDataReducer;
