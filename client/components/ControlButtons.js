import React from "react";
import { connect } from "react-redux";

import { chopEntryField, setEntryField } from "../redux/entryField";
import { makeGuess, shuffleLetters } from "../redux/beeData";

const ControlButtons = (props) => {
  const handleEnterPress = () => {
    document.getElementById("enter-button").classList.add("hive-button-active");
    if (!props.entryValue == "") {
      if (props.answers.includes(props.entryValue.toLowerCase())) {
        props.makeGuess(props.entryValue);
        props.setEntryField("");
      } else {
        document
          .getElementById("inputForm")
          .classList.toggle("animation-target");
        setTimeout(() => {
          props.setEntryField("");
          document
            .getElementById("inputForm")
            .classList.toggle("animation-target");
        }, 800);

        const msgBox = document.getElementsByClassName(
          "message-box-content"
        )[0];

        if (props.entryValue.length < 4) {
          msgBox.innerHTML = "Too short";
        } else if (
          !props.entryValue.toLowerCase().includes(props.centerLetter)
        ) {
          msgBox.innerHTML = "Missing center letter";
        } else if (
          !props.entryValue
            .toLowerCase()
            .split("")
            .reduce(
              (acc, curr) => props.validLetters.includes(curr) && acc,
              true
            )
        ) {
          msgBox.innerHTML = "Bad letters";
        } else if (!props.answers.includes(props.entryValue.toLowerCase())) {
          msgBox.innerHTML = "Not in word list";
        }

        msgBox.style.opacity = "100%";

        setTimeout(() => (msgBox.style.opacity = "0%"), 750);
      }
    }
  };
  return (
    <div className="hive-buttons-panel">
      <button
        id="delete-button"
        className="hive-button"
        onMouseDown={() => {
          props.chopEntryField();
        }}
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
        onMouseDown={handleEnterPress}
      >
        Enter
      </button>
    </div>
  );
};

const mapState = (state) => ({
  entryValue: state.entryField.entryField,
  answers: state.beeData.answers,
});

const mapDispatch = (dispatch) => ({
  chopEntryField: () => dispatch(chopEntryField()),
  setEntryField: (text) => dispatch(setEntryField(text)),
  makeGuess: (guess) => dispatch(makeGuess(guess)),
  shuffleLetters: () => dispatch(shuffleLetters()),
});

export default connect(mapState, mapDispatch)(React.memo(ControlButtons));
