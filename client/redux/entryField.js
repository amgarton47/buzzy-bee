const SET_ENTRY_FIELD = "SET_ENTRY_FIELD";
const CHOP_ENTRY_FIELD = "CHOP_ENTRY_FIELD";

const allowedCharacters = "abcdefghijklmnopqrstuvwxyz";

export const setEntryField = (text) => ({ type: SET_ENTRY_FIELD, text });
export const chopEntryField = () => ({ type: CHOP_ENTRY_FIELD });

const initialState = {
  entryField: "",
};

const entryFieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ENTRY_FIELD:
      if (
        allowedCharacters.indexOf(
          action.text.charAt(action.text.length - 1).toLowerCase()
        ) != -1
      ) {
        return { ...state, entryField: action.text };
      } else {
        return state;
      }
    case CHOP_ENTRY_FIELD:
      return { ...state, entryField: state.entryField.slice(0, -1) };
    default:
      return state;
  }
};

export default entryFieldReducer;
