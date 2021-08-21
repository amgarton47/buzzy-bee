import React from "react";
import { connect } from "react-redux";

import CombCell from "./CombCell";

const Comb = (props) => {
  const { centerLetter, outerLetters } = props;

  return (
    <div id="comb">
      <CombCell letter={centerLetter} />
      {outerLetters.map((letter, idx) => (
        <CombCell key={idx} letter={letter} />
      ))}
    </div>
  );
};

const mapState = (state) => ({
  centerLetter: state.beeData.centerLetter,
  outerLetters: state.beeData.outerLetters,
});

export default connect(mapState, null)(Comb);
