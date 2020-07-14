import React from "react";
import ReactDOM from "react-dom";
import Landing from "./components/Landing/Landing.js";
import Nico from "./components/Nico/Nico.js";
import NotFound from "./components/NotFound/NotFound.js";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

ReactDOM.render(
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/nico" component={Nico} />
          <Route exact path="/*" component={NotFound} />
        </Switch>
      </Router>
    </>,
    document.getElementById('root')
);