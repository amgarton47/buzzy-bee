const SET_ENTRY_FIELD = "SET_ENTRY_FIELD";

export const setEntryField = (text) => ({ type: SET_ENTRY_FIELD, text });

const initialState = {
  entryField: "",
};

const entryFieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ENTRY_FIELD:
      return { ...state, entryField: action.text };
    default:
      return state;
  }
};

export default entryFieldReducer;
