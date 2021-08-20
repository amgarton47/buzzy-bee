import React, { useEffect, memo } from "react";
import { connect } from "react-redux";
import { fetchBeeDataThunk } from "../redux/beeData";

import Hex from "./Hex";
import EntryForm from "./EntryForm";
import FoundWords from "./FoundWords";
import ControlButtons from "./ControlButtons";

const offsetValues = [
  { x: "0%", y: "0%" },
  { x: "0%", y: "200%" },
  { x: "80%", y: "50%" },
  { x: "80%", y: "150%" },
  { x: "-80%", y: "50%" },
  { x: "-80%", y: "150%" },
];

const Bee = (props) => {
  useEffect(() => {
    props.getBeeData();
    document.getElementById("formInput").focus();
  }, []);

  return (
    <div>
      <br></br>
      <div>
        Spelling Bee <span>{props.displayDate}</span>
      </div>
      <br></br>

      <EntryForm />
      <FoundWords />
      <div
        style={
          {
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "space-around",
          }
        }
      >
        <div>Score: {props.playerScore}</div>
        <div>Rank: {props.playerRank}</div>
        <div id="hive">
          <Hex
            letter={props.centerLetter}
            offset={{ x: "0%", y: "100%" }}
            isCenterTile={true}
          ></Hex>
          {props.outerLetters.map((letter, idx) => (
            <Hex letter={letter} offset={offsetValues[idx]} key={idx}></Hex>
          ))}
        </div>

        <ControlButtons />
      </div>
    </div>
  );
};

const mapState = (state) => ({
  centerLetter: state.beeData.centerLetter,
  outerLetters: state.beeData.outerLetters,
  // validLetters: state.beeData.validLetters,
  pangrams: state.beeData.pangrams,
  displayDate: state.beeData.displayDate,
  answers: state.beeData.answers,
  playerScore: state.beeData.playerScore,
  playerRank: state.beeData.playerRank,
});

const mapDispatch = (dispatch) => ({
  getBeeData: () => dispatch(fetchBeeDataThunk()),
});

export default connect(mapState, mapDispatch)(memo(Bee));
