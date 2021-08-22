import React, { memo } from "react";
import { connect } from "react-redux";

const EntryField = (props) => {
  return (
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
  );
};

const mapState = (state) => ({
  centerLetter: state.beeData.centerLetter,
  validLetters: state.beeData.validLetters,
  entryValue: state.entryField.entryField,
});

export default connect(mapState, null)(memo(EntryField));
