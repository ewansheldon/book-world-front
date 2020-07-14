import React from "react";
import ReactDOM from "react-dom";
import Landing from "./components/Landing/Landing.js";
import Nico from "./components/Nico/Nico.js";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

ReactDOM.render(
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/nico" component={Nico} />
        </Switch>
      </Router>
    </>,
    document.getElementById('root')
);