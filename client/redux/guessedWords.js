const ADD_CORRECT_GUESS = "ADD_CORRECT_GUESS";

export const addCorrectGuess = (guess) => ({ type: ADD_CORRECT_GUESS, guess });

const initialState = {
  guesses: [],
};

const guessedWordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CORRECT_GUESS:
      return { ...state, guesses: [...state.guesses, action.guess] };
    default:
      return state;
  }
};

export default guessedWordsReducer;
