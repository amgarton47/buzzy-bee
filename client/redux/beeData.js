import axios from "axios";

const SET_BEE_DATA = "SET_BEE_DATA";

const setBeeData = (data) => ({ type: SET_BEE_DATA, data });

export const fetchBeeDataThunk = () => async (dispatch) => {
  axios
    .get("/api/beeData/today")
    .then(({ data }) => dispatch(setBeeData(data)))
    .catch((err) => console.log(err));
};

const initialState = {
  centerLetter: "",
  outerLetters: [],
  answers: [],
  validLetters: [],
  displayDate: "",
  pangrams: [],
};

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
    default:
      return state;
  }
};

export default beeDataReducer;
