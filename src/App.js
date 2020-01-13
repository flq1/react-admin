import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login/index";
import Home from "./components/home";
export default class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Login}></Route>
        <Route path="/home" exact component={Home}></Route>
      </Router>
    );
  }
}
