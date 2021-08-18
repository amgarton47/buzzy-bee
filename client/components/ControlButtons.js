import React from "react";
import { connect } from "react-redux";

import { chopEntryField, setEntryField } from "../redux/entryField";
import { makeGuess, shuffleLetters } from "../redux/beeData";

const ControlButtons = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <button
        onClick={(evt) => {
          //   evt.preventDefault();
          props.chopEntryField();
          document.getElementById("formInput").focus();
        }}
      >
        Delete
      </button>
      <button
        onClick={(evt) => {
          //   evt.preventDefault();
          props.shuffleLetters();
          document.getElementById("formInput").focus();
        }}
      >
        shuffle
      </button>
      <button
        onClick={(evt) => {
          //   evt.preventDefault();
          props.makeGuess(props.entryValue);
          props.setEntryField("");
          document.getElementById("formInput").focus();
        }}
      >
        Enter
      </button>
    </div>
  );
};

const mapState = (state) => ({
  entryValue: state.entryField.entryField,
});

const mapDispatch = (dispatch) => ({
  chopEntryField: () => dispatch(chopEntryField()),
  setEntryField: (text) => dispatch(setEntryField(text)),
  makeGuess: (guess) => dispatch(makeGuess(guess)),
  shuffleLetters: () => dispatch(shuffleLetters()),
});

export default connect(mapState, mapDispatch)(React.memo(ControlButtons));
