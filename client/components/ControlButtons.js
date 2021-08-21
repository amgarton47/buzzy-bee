import React from "react";
import { connect } from "react-redux";

import { chopEntryField, setEntryField } from "../redux/entryField";
import { makeGuess, shuffleLetters } from "../redux/beeData";

// let isShuffling = false;

const ControlButtons = (props) => {
  return (
    <div className="hive-buttons-panel">
      <button
        className="hive-button"
        onMouseDown={() => {
          props.chopEntryField();
        }}
      >
        Delete
      </button>
      <button
        className="hive-button shuffle-button"
        onMouseDown={() => {
          if (!window.isShuffling) {
            window.isShuffling = true;
            Array.from(
              document.getElementsByClassName("outter-hex-letter")
            ).forEach((letterNode) => {
              letterNode.classList.toggle("fade-out");
              setTimeout(() => {
                props.shuffleLetters();
                letterNode.classList.toggle("fade-out");
                letterNode.classList.toggle("fade-in");
                setTimeout(() => {
                  // letterNode.classList.toggle("fade-in");
                  letterNode.classList.toggle("fade-in");
                  window.isShuffling = false;
                }, 250);
              }, 350);
            });
          }
        }}
      ></button>
      <button
        className="hive-button"
        onMouseDown={() => {
          props.makeGuess(props.entryValue);
          props.setEntryField("");
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
