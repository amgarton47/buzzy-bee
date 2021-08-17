import React from "react";
import Hexagon from "react-hexagon";

const Hex = (props) => {
  return (
    <div
      className="hexagon"
      style={{ transform: `translate(${props.offset.x},${props.offset.y})` }}
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

export default Hex;
