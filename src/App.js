import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { ConfigProvider } from "antd";
import Login from "./components/login/index";
import Basiclayout from "./components/basic-layout";
import routes from "./config/route";
import zh_CN from "antd/es/locale/zh_CN";
import en_US from "antd/es/locale/en_US";
@connect(state => ({ language: state.language }), null)
class App extends Component {
  render() {
    const language = this.props.language;
    const isEn = language === "en";
    return (
      <ConfigProvider locale={isEn ? en_US : zh_CN}>
        <Router>
          <Switch>
            <Route path="/login" exact component={Login}></Route>
            <Basiclayout>
              {routes.map(route => {
                return <Route {...route} key={route.path} />;
              })}
            </Basiclayout>
          </Switch>
        </Router>
      </ConfigProvider>
    );
  }
}
export default App;
