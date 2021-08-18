import React, { memo } from "react";
import { connect } from "react-redux";

import { setEntryField } from "../redux/entryField";
import { makeGuess, shuffleLetters } from "../redux/beeData";

const EntryForm = (props) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const { makeGuess, entryValue, setEntryField } = props;

    makeGuess(entryValue);
    setEntryField("");
  };

  const handleChange = (evt) => {
    if (evt.target.value.charAt(evt.target.value.length - 1) == " ") {
      props.shuffleLetters();
    }
    props.setEntryField(evt.target.value);
  };

  return (
    <div id="form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputField"></label>
        <input
          name="inputField"
          type="text"
          onChange={handleChange}
          placeholder="Type or click"
          value={props.entryValue}
          autoComplete="off"
          id="formInput"
        />
      </form>
    </div>
  );
};

const mapState = (state) => ({
  answers: state.beeData.answers,
  entryValue: state.entryField.entryField,
});

const mapDispatch = (dispatch) => ({
  setEntryField: (text) => dispatch(setEntryField(text)),
  makeGuess: (guess) => dispatch(makeGuess(guess)),
  shuffleLetters: () => dispatch(shuffleLetters()),
});

export default connect(mapState, mapDispatch)(memo(EntryForm));
