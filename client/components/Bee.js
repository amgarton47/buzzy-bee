import React, { useEffect, memo } from "react";
import { connect } from "react-redux";
import { fetchBeeDataThunk, makeGuess, shuffleLetters } from "../redux/beeData";
import { fetchGameDataThunk, addFoundWordThunk } from "../redux/gameData";
import { setEntryField, chopEntryField } from "../redux/entryField";

import FoundWords from "./FoundWords";
import ControlButtons from "./ControlButtons";
import Comb from "./Comb";
import EntryField from "./EntryField";

import hotkeys from "hotkeys-js";

const allowedCharacters = "abcdefghijklmnopqrstuvwxyz";

const Bee = (props) => {
  useEffect(() => {
    props.getBeeData(props.match.params.date);
    props.getGameData(props.match.params.date);
    document.getElementById("bee").focus();
  }, []);

  window.isShuffling = false;

  const handleKeyUp = (evt) => {
    switch (evt.key) {
      case "Enter":
        document
          .getElementById("enter-button")
          .classList.remove("hive-button-active");
        break;
      case "Backspace":
        document
          .getElementById("delete-button")
          .classList.remove("hive-button-active");
      case " ":
        document
          .getElementById("shuffle-button")
          .classList.remove("hive-button-active");
    }
  };

  const handleKeyDown = (evt) => {
    // prevent keyboard shortcuts from entering letters
    hotkeys("command+r", () => {
      props.setEntryField("");
    });

    hotkeys("command+s", () => {
      props.setEntryField("");
    });

    hotkeys("command+a", () => {
      props.setEntryField("");
    });

    // handlekey down actions
    switch (evt.key) {
      case "Enter":
        document
          .getElementById("enter-button")
          .classList.add("hive-button-active");
        if (!props.entryValue == "") {
          const lower = props.entryValue.toLowerCase();
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
            } else if (
              !props.answers.includes(props.entryValue.toLowerCase())
            ) {
              msgBox.innerHTML = "Not in word list";
            }

            msgBox.style.opacity = "100%";

            setTimeout(() => (msgBox.style.opacity = "0%"), 750);
          }
        }
        break;
      case "Backspace":
        document
          .getElementById("delete-button")
          .classList.add("hive-button-active");
        props.chopEntryField();
        break;
      case " ":
        if (!window.isShuffling) {
          document
            .getElementById("shuffle-button")
            .classList.add("hive-button-active");

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
        if (props.entryValue.length >= 13) {
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

          msgBox.innerHTML = "Too long";
          msgBox.style.opacity = "100%";

          setTimeout(() => {
            msgBox.style.opacity = "0%";
            props.setEntryField("");
          }, 750);
        } else {
          const lowerCaseKey = evt.key.toLowerCase();
          if (allowedCharacters.includes(lowerCaseKey)) {
            props.setEntryField(props.entryValue + lowerCaseKey);
          }
        }

        break;
    }
  };

  return (
    <div
      id="bee"
      style={{ outline: "none" }}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      tabIndex="0"
    >
      <br></br>
      <div>
        Spelling Bee - <span>{props.displayDate}</span>
      </div>
      <br></br>

      <div className="controls-box">
        <div className="control-panel">
          <div className="message-box">
            <span className="message-box-content"></span>
          </div>
          <EntryField />
          <Comb />
          <ControlButtons />
        </div>

        <div id="status-box">
          <div id="progress-box">
            {/* <div>Score: {props.playerScore}</div> */}
            <h4
              style={{
                paddingRight: "10px",
              }}
            >
              {props.playerRank.title}
            </h4>

            <div id="progress-bar">
              <div id="progress-line">
                <div id="progress-dots">
                  {Array(9)
                    .fill("")
                    .map((_, idx) => (
                      <div
                        key={idx}
                        className={`progress-dot ${
                          props.playerRank.level > idx - 1
                            ? "completed-dot"
                            : ""
                        }`}
                      ></div>
                    ))}
                </div>
              </div>
              <div
                id="progress-line-marker"
                style={{ left: `${12.5 * props.playerRank.level + 1}%` }}
              >
                <span id="progress-line-value" style={{ fontWeight: "100" }}>
                  {props.playerScore}
                </span>
              </div>
            </div>
          </div>
          <br></br>
          <FoundWords />
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  centerLetter: state.beeData.centerLetter,
  outerLetters: state.beeData.outerLetters,
  validLetters: state.beeData.validLetters,
  displayDate: state.beeData.displayDate,
  answers: state.beeData.answers,
  playerScore: state.beeData.playerScore,
  playerRank: state.beeData.playerRank,
  entryValue: state.entryField.entryField,
  guesses: state.beeData.guesses,
});

const mapDispatch = (dispatch) => ({
  getBeeData: (date) => dispatch(fetchBeeDataThunk(date)),
  getGameData: (date) => dispatch(fetchGameDataThunk(date)),
  setEntryField: (text) => dispatch(setEntryField(text)),
  chopEntryField: () => dispatch(chopEntryField()),
  makeGuess: (guess) => dispatch(makeGuess(guess)),
  shuffleLetters: () => dispatch(shuffleLetters()),
  addFoundWord: (word, date) => dispatch(addFoundWordThunk(word, date)),
});

export default connect(mapState, mapDispatch)(memo(Bee));
