import React from "react";
import ReactDOM from "react-dom";
import Landing from "./components/Landing/Landing.js";
import NotFound from "./components/NotFound/NotFound.js";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {CookiesProvider} from "react-cookie";
import NicoAuthGate from "./components/NicoAuthGate/NicoAuthGate.js";

ReactDOM.render(
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <CookiesProvider>
            <Route exact path="/nico" component={NicoAuthGate} />
          </CookiesProvider>
          <Route exact path="/*" component={NotFound} />
        </Switch>
      </Router>
    </>,
    document.getElementById('root')
);