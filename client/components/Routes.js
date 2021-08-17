import React from "react";
// import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

import TodaysBee from "./TodaysBee";
import YesterdaysBee from "./YesterdaysBee";

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          {/* <div>Welcome!</div> */}
          <Link to="/">Today's Bee</Link>
          <br></br>
          <Link to="/yesterday">Yesterday's Bee</Link>
        </nav>

        <Switch>
          <Route exact path="/" component={TodaysBee}></Route>
          <Route exact path="/yesterday" component={YesterdaysBee}></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
