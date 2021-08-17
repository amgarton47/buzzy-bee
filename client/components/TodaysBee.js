import React from "react";
import { connect } from "react-redux";
import { fetchBeeDataThunk } from "../redux/beeData";
import { setEntryField } from "../redux/entryField";
import { addCorrectGuess } from "../redux/guessedWords";

import Hex from "./Hex";

const offsetValues = [
  { x: "0%", y: "0%" },
  { x: "0%", y: "200%" },
  { x: "80%", y: "50%" },
  { x: "80%", y: "150%" },
  { x: "-80%", y: "50%" },
  { x: "-80%", y: "150%" },
];

class TodaysBee extends React.Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getBeeData();
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { answers, addCorrectGuess, entryValue, setEntryField } = this.props;
    const caseSensitiveEntry = entryValue.toLowerCase();

    if (answers.indexOf(caseSensitiveEntry) > -1) {
      addCorrectGuess(caseSensitiveEntry);
    }
    setEntryField("");
  }

  handleChange(evt) {
    this.props.setEntryField(evt.target.value);
  }

  render() {
    return (
      <div>
        <br></br>
        <div>Today's Bee!</div>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="inputField"></label>
          <input
            name="inputField"
            type="text"
            onChange={this.handleChange}
            placeholder="Type or click"
            value={this.props.entryValue}
          ></input>
        </form>
        <div>
          {/* <h3>Center letter: {this.props.centerLetter}</h3>
          <h3>Outter letter: {this.props.outerLetters.join(" ")}</h3> */}
          <span>
            You have found {this.props.correctGuesses.length} word
            {this.props.correctGuesses.length == 1 ? "" : "s"}
          </span>
          <ul>
            {this.props.correctGuesses.map((guess) => (
              <li>{guess}</li>
            ))}
          </ul>
        </div>
        <div id="hive">
          <Hex
            letter={this.props.centerLetter}
            offset={{ x: "0%", y: "100%" }}
            isCenterTile={true}
          ></Hex>
          {this.props.outerLetters.map((letter, idx) => (
            <Hex letter={letter} offset={offsetValues[idx]} key={idx}></Hex>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  centerLetter: state.beeData.centerLetter,
  outerLetters: state.beeData.outerLetters,
  answers: state.beeData.answers,
  validLetters: state.beeData.validLetters,
  pangrams: state.beeData.pangrams,
  dispplayDate: state.beeData.dispplayDate,
  entryValue: state.entryField.entryField,
  correctGuesses: state.guessedWords.guesses,
});
const mapDispatch = (dispatch) => ({
  getBeeData: () => dispatch(fetchBeeDataThunk()),
  setEntryField: (text) => dispatch(setEntryField(text)),
  addCorrectGuess: (guess) => dispatch(addCorrectGuess(guess)),
});

export default connect(mapState, mapDispatch)(TodaysBee);
