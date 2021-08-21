import React, { useEffect, memo } from "react";
import { connect } from "react-redux";
import { fetchBeeDataThunk, makeGuess, shuffleLetters } from "../redux/beeData";

import FoundWords from "./FoundWords";
import ControlButtons from "./ControlButtons";
import Comb from "./Comb";

import hotkeys from "hotkeys-js";

import { setEntryField, chopEntryField } from "../redux/entryField";

const allowedCharacters = "abcdefghijklmnopqrstuvwxyz";

const Bee = (props) => {
  useEffect(() => {
    props.getBeeData();
    document.getElementById("bee").focus();
  }, []);

  window.isShuffling = false;

  const handleKeyDown = (evt) => {
    // prevent keyboard shortcuts from entering letters
    hotkeys("command + *", () => {
      props.setEntryField("");
    });

    // handlekey down actions
    switch (evt.key) {
      case "Enter":
        props.makeGuess(props.entryValue);
        props.setEntryField("");
        break;
      case "Backspace":
        props.chopEntryField();
        break;
      case " ":
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
        evt.preventDefault();
        break;
      default:
        const lowerCaseKey = evt.key.toLowerCase();
        if (allowedCharacters.includes(lowerCaseKey)) {
          props.setEntryField(props.entryValue + lowerCaseKey);
        }
        break;
    }
  };

  return (
    <div
      id="bee"
      style={{ outline: "none" }}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <br></br>
      <div>
        Spelling Bee <span>{props.displayDate}</span>
      </div>
      <br></br>

      <div className="controls-box">
        <div className="control-panel">
          <div id="inputBox">
            <span id="inputForm">
              {props.entryValue.split("").map((letter, idx) => (
                <span
                  key={idx}
                  className={[
                    letter == props.centerLetter && "center-letter",
                    props.validLetters.includes(letter) &&
                      letter != props.centerLetter &&
                      "valid",
                    !props.validLetters.includes(letter) && "invalid",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {letter}
                </span>
              ))}
              {/* <span className="blink"></span> */}
            </span>
          </div>
          <Comb />
          <ControlButtons />
        </div>
      </div>

      <FoundWords />
      <div>
        <div>Score: {props.playerScore}</div>
        <div>Rank: {props.playerRank}</div>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  centerLetter: state.beeData.centerLetter,
  outerLetters: state.beeData.outerLetters,
  validLetters: state.beeData.validLetters,
  pangrams: state.beeData.pangrams,
  displayDate: state.beeData.displayDate,
  answers: state.beeData.answers,
  playerScore: state.beeData.playerScore,
  playerRank: state.beeData.playerRank,
  entryValue: state.entryField.entryField,
});

const mapDispatch = (dispatch) => ({
  getBeeData: () => dispatch(fetchBeeDataThunk()),
  setEntryField: (text) => dispatch(setEntryField(text)),
  chopEntryField: () => dispatch(chopEntryField()),
  makeGuess: (guess) => dispatch(makeGuess(guess)),
  shuffleLetters: () => dispatch(shuffleLetters()),
});

export default connect(mapState, mapDispatch)(memo(Bee));
