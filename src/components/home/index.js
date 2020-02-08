import React, { Component } from "react";
import withchecklogin from "../with-check-login";
import Goolge from "../../components/basic-layout/layoutheader/google/index";

@withchecklogin
class Home extends Component {
  render() {
    return (
      <div>
        <Goolge />
      </div>
    );
  }
}
export default Home;
