import React, { memo } from "react";
import Hexagon from "react-hexagon";
import { connect } from "react-redux";
import { setEntryField } from "../redux/entryField";

const Hex = (props) => {
  return (
    <a
      className="hexagon"
      style={{ transform: `translate(${props.offset.x},${props.offset.y})` }}
      onClick={() => {
        props.setEntryField(props.entryValue + props.letter);
      }}
      // onMouseOver={() => {
      //   document
      //     .getElementsByTagName("polygon")[0]
      //     .classList.toggle("mouseOver");
      //   console.log("yo");
      // }}
    >
      <h1 className="hex-letter">{props.letter}</h1>
      <Hexagon
        flatTop={true}
        style={{
          stroke: props.isCenterTile ? "#f7da21" : "#e6e6e6",
          fill: props.isCenterTile ? "#f7da21" : "#e6e6e6",
        }}
      ></Hexagon>
    </a>
  );
};

const mapState = (state) => ({
  entryValue: state.entryField.entryField,
});

const mapDispatch = (dispatch) => ({
  setEntryField: (character) => dispatch(setEntryField(character)),
});

export default connect(mapState, mapDispatch)(memo(Hex));
