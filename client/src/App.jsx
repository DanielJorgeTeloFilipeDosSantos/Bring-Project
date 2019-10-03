import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/NavigationBar";

import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeView from "./views/Home";
import ErrorView from "./views/Error";
import CatchAllView from "./views/CatchAll";
import DonorRegister from "./views/donors/DonorRegister";
import Signin from "./views/donors/SigninDonor";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <NavigationBar />
          <Switch>
            <Route path="/" exact component={HomeView} />
            <Route path="/donor-register" exact component={DonorRegister} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/error/:code" component={ErrorView} />
            <Route path="/" component={CatchAllView} />
          </Switch>
        </Router>
      </div>
    );
  }
}
