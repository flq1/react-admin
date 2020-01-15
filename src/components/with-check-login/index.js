import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
export default function withchecklogin(WrappedComponent) {
  @connect(state => ({ user: state.user }), null)
  class checkLogin extends Component {
    static displayName = `checkLogin(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      "component"})`;

    render() {
      console.log(this.props);
      const {
        user: { token },
        location: { pathname }
      } = this.props;

      if (token) {
        console.log(token, 111);
        if (pathname === "/login") {
          return <Redirect to="/" />;
        }
      } else {
        console.log(token, 111);
        if (pathname === "/") {
          return <Redirect to="/login" />;
        }
      }

      // return <Redirect to="/home" />;
      return <WrappedComponent {...this.props} />;
    }
  }
  return checkLogin;
}
