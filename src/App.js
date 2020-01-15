import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login/index";
import Basiclayout from "./components/basic-layout";
import Home from "./components/home";
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={Login}></Route>
          <Basiclayout>
            <Route path="/" exact component={Home}></Route>
          </Basiclayout>
        </Switch>
      </Router>
    );
  }
}
