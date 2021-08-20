import React, { memo } from "react";
import { connect } from "react-redux";

import { setEntryField, chopEntryField } from "../redux/entryField";
import { makeGuess, shuffleLetters } from "../redux/beeData";

const allowedCharacters = "abcdefghijklmnopqrstuvwxyz";

const EntryForm = (props) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const { makeGuess, entryValue, setEntryField } = props;

    makeGuess(entryValue);
    setEntryField("");
  };

  const handleChange = (evt, evt1) => {
    // var sel = window.getSelection();
    // sel.collapseToEnd();

    // const range = new Range(); //Create a range (a range is a like the selection but invisible)
    // range.selectNodeContents(document.getElementById("formInput")); //Select the entire contents of the element with the range
    // range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
    // const selection = window.getSelection(); //get the selection object (allows you to change selection)
    // selection.removeAllRanges(); //remove any selections already made
    // selection.addRange(range); //m
    // console.log(evt.key);

    switch (evt.key) {
      case "Enter":
        evt.preventDefault();
        makeGuess(props.entryValue);
      case "Backspace":
        props.chopEntryField();
      default:
        const lowerCaseKey = evt.key.toLowerCase();
        if (allowedCharacters.includes(lowerCaseKey)) {
          props.setEntryField(props.entryValue + lowerCaseKey);
        }
      // console.log(evt.key);
    }
    // if (evt.target.value.charAt(evt.target.value.length - 1) == " ") {
    //   props.shuffleLetters();
    // }
    // props.setEntryField(evt.target.value);
  };

  return (
    <div id="form">
      {/* <form id="entryForm" onSubmit={handleSubmit}>
        <label htmlFor="inputField"></label>
        <input
          name="inputField"
          type="text"
          onChange={handleChange}
          placeholder="Type or click"
          value={props.entryValue}
          // value={props.entryValue
          //   .split("")
          //   .map(
          //     (letter) =>
          //       "&lt;span className={&quot;yellow&quot;}&gt;{letter}&lt;/span&gt;"
          //   )}
          autoComplete="off"
          id="formInput"
        />
      </form> */}
      <span
        id="formInput"
        // contentEditable
        onKeyDown={handleChange}
        style={{ outline: "none" }}
        // onClick={handleClick}
      ></span>
      <div id="coloredWord">
        {console.log(props.entryValue)}
        {props.entryValue.split("").map((letter, idx) => (
          <span
            key={idx}
            className={[
              letter == props.centerLetter && "yellow",
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
      </div>
    </div>
  );
};

const mapState = (state) => ({
  answers: state.beeData.answers,
  entryValue: state.entryField.entryField,
  centerLetter: state.beeData.centerLetter,
  validLetters: state.beeData.validLetters,
});

const mapDispatch = (dispatch) => ({
  setEntryField: (text) => dispatch(setEntryField(text)),
  makeGuess: (guess) => dispatch(makeGuess(guess)),
  shuffleLetters: () => dispatch(shuffleLetters()),
  chopEntryField: () => dispatch(chopEntryField()),
});

export default connect(mapState, mapDispatch)(memo(EntryForm));
