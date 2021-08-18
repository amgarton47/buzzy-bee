import React, { memo } from "react";
import { connect } from "react-redux";

const FoundWords = (props) => {
  const { foundWords } = props;
  return (
    <div>
      {/* <br></br>
      <br></br>
      <br></br>
      <br></br> */}
      <span>
        You have found {foundWords.length} word
        {foundWords.length == 1 ? "" : "s"}
      </span>
      <ul>
        {foundWords.map((guess, idx) => (
          <li key={idx}>{guess}</li>
        ))}
      </ul>
    </div>
  );
};

const mapState = (state) => ({
  foundWords: state.beeData.correctGuesses,
});

export default connect(mapState, null)(memo(FoundWords));
