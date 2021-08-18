import React, { memo } from "react";
import Hexagon from "react-hexagon";
import { connect } from "react-redux";
import { setEntryField } from "../redux/entryField";

const Hex = (props) => {
  return (
    <div
      className="hexagon"
      style={{ transform: `translate(${props.offset.x},${props.offset.y})` }}
      onClick={() => {
        props.setEntryField(`${props.entryValue}${props.letter}`);
        document.getElementById("formInput").focus();
      }}
    >
      <h1 className="hex-letter">{props.letter}</h1>
      <Hexagon
        flatTop={true}
        style={{
          stroke: props.isCenterTile ? "#f7da21" : "#e6e6e6",
          fill: props.isCenterTile ? "#f7da21" : "#e6e6e6",
        }}
      ></Hexagon>
    </div>
  );
};

const mapState = (state) => ({
  entryValue: state.entryField.entryField,
});

const mapDispatch = (dispatch) => ({
  setEntryField: (text) => dispatch(setEntryField(text)),
});

export default connect(mapState, mapDispatch)(memo(Hex));
