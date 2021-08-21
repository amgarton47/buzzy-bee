import React, { memo } from "react";
import { connect } from "react-redux";
import Hexagon from "react-hexagon";
import { setEntryField } from "../redux/entryField";

const CombCell = (props) => {
  const { setEntryField, entryValue, letter, centerLetter } = props;
  return (
    <a
      className="hexagon"
      onClick={() => {
        setEntryField(entryValue + letter);
      }}
    >
      <p
        className={`${
          centerLetter != letter && "outer-cell-letter"
        } cell-letter`}
      >
        {letter}
      </p>
      <Hexagon
        flatTop={true}
        className={centerLetter == letter ? "center-cell" : "outer-cell"}
      ></Hexagon>
    </a>
  );
};

const mapState = (state) => ({
  entryValue: state.entryField.entryField,
  centerLetter: state.beeData.centerLetter,
});

const mapDispatch = (dispatch) => ({
  setEntryField: (character) => dispatch(setEntryField(character)),
});

export default connect(mapState, mapDispatch)(memo(CombCell));
