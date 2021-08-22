import React, { memo } from "react";
import { connect } from "react-redux";

const FoundWords = (props) => {
  const { foundWords } = props;
  return (
    <div className="wordlist-box">
      <span>
        You have found {foundWords.length} word
        {foundWords.length == 1 ? "" : "s"}
      </span>
      <ul>
        {foundWords.map((guess, idx) => (
          <li key={idx}>
            <span className="found-word">{guess}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapState = (state) => ({
  foundWords: state.beeData.correctGuesses,
});

export default connect(mapState, null)(memo(FoundWords));
