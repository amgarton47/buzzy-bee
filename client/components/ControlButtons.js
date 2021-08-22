import React from "react";
import { connect } from "react-redux";

import { chopEntryField, setEntryField } from "../redux/entryField";
import { makeGuess, shuffleLetters } from "../redux/beeData";

let deleteInterval;

const ControlButtons = (props) => {
  return (
    <div className="hive-buttons-panel">
      <button
        id="delete-button"
        className="hive-button"
        onMouseDown={() => {
          props.chopEntryField();

          // setTimeout(() => {
          //   deleteInterval = setInterval(() => {
          //     props.chopEntryField();
          //     console.log("s");
          //   }, 100);
          // }, 300);
        }}
        // onMouseUp={() => {
        //   clearInterval(deleteInterval);
        // }}
      >
        Delete
      </button>

      <button
        className="hive-button shuffle-button"
        id="shuffle-button"
        onMouseDown={() => {
          if (!window.isShuffling) {
            window.isShuffling = true;
            Array.from(
              document.getElementsByClassName("outer-cell-letter")
            ).forEach((letterNode) => {
              letterNode.classList.toggle("fade-out");
              setTimeout(() => {
                props.shuffleLetters();
                letterNode.classList.toggle("fade-out");
                letterNode.classList.toggle("fade-in");
                setTimeout(() => {
                  letterNode.classList.toggle("fade-in");
                }, 250);
                window.isShuffling = false;
              }, 350);
            });
          }
        }}
      />

      <button
        className="hive-button"
        id="enter-button"
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
