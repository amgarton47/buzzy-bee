import React from "react";
import { connect } from "react-redux";

import { chopEntryField, setEntryField } from "../redux/entryField";
import { makeGuess, shuffleLetters } from "../redux/beeData";
import { addFoundWord } from "../redux/gameData";

const ControlButtons = (props) => {
  const handleEnterPress = () => {
    document.getElementById("enter-button").classList.add("hive-button-active");
    setTimeout(() =>
      document
        .getElementById("enter-button")
        .classList.remove("hive-button-active")
    );
    const lower = props.entryValue.toLowerCase();
    if (!props.entryValue == "") {
      if (props.answers.includes(lower) && !props.guesses.includes(lower)) {
        props.makeGuess(props.entryValue);
        props.addFoundWord(props.entryValue, null);
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

        if (props.guesses.includes(lower)) {
          msgBox.innerHTML = "Already Found";
        } else if (props.entryValue.length < 4) {
          msgBox.innerHTML = "Too short";
        } else if (!lower.includes(props.centerLetter)) {
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
        } else if (!props.answers.includes(lower)) {
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

const mapState = (state) => {
  return {
    entryValue: state.entryField.entryField,
    answers: state.beeData.answers,
    guesses: state.beeData.guesses,
    centerLetter: state.beeData.centerLetter,
    validLetters: state.beeData.validLetters,
  };
};

const mapDispatch = (dispatch) => ({
  chopEntryField: () => dispatch(chopEntryField()),
  setEntryField: (text) => dispatch(setEntryField(text)),
  makeGuess: (guess) => dispatch(makeGuess(guess)),
  shuffleLetters: () => dispatch(shuffleLetters()),
  addFoundWord: (word) => dispatch(addFoundWord(word)),
});

export default connect(mapState, mapDispatch)(React.memo(ControlButtons));
