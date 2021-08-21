import React, { useEffect, memo } from "react";
import { connect } from "react-redux";
import { fetchBeeDataThunk, makeGuess, shuffleLetters } from "../redux/beeData";

import Hex from "./Hex";
import EntryForm from "./EntryForm";
import FoundWords from "./FoundWords";
import ControlButtons from "./ControlButtons";

import hotkeys from "hotkeys-js";

import { setEntryField, chopEntryField } from "../redux/entryField";

const allowedCharacters = "abcdefghijklmnopqrstuvwxyz";

const offsetValues = [
  { x: "0%", y: "0%" },
  { x: "0%", y: "200%" },
  { x: "80%", y: "50%" },
  { x: "80%", y: "150%" },
  { x: "-80%", y: "50%" },
  { x: "-80%", y: "150%" },
];

const Bee = (props) => {
  useEffect(() => {
    props.getBeeData();
    document.getElementById("bee").focus();
  }, []);

  let isShuffling = false;
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

      <span placeholder="Type or click" id="inputForm">
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
            style={{ display: "inline" }}
          >
            {letter}
          </span>
        ))}
      </span>

      {/* <EntryForm /> */}
      <FoundWords />
      <div
        style={
          {
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "space-around",
          }
        }
      >
        <div>Score: {props.playerScore}</div>
        <div>Rank: {props.playerRank}</div>
        <div id="hive">
          <Hex
            letter={props.centerLetter}
            offset={{ x: "0%", y: "100%" }}
            isCenterTile={true}
          ></Hex>
          {props.outerLetters.map((letter, idx) => (
            <Hex letter={letter} offset={offsetValues[idx]} key={idx}></Hex>
          ))}
        </div>

        <ControlButtons />
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
