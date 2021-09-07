import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Bee from "./Bee";
import YesterdaysBee from "./YesterdaysBee";

import PuzzleList from "./PuzzleList";

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          {/* <div>Welcome!</div> */}
          {/* <Link to="/">Today's Bee</Link>
          <Link to="/yesterday">Yesterday's Bee</Link> */}
          <Link to="/allPuzzles">All puzzles</Link>
        </nav>

        <Switch>
          <Route exact path="/" component={Bee}></Route>
          <Route exact path="/allPuzzles" component={PuzzleList}></Route>
          <Route exact path="/:date" component={Bee}></Route>
          {/* <Route exact path="/yesterday" component={YesterdaysBee}></Route> */}
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
