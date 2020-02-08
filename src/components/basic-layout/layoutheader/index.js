import React, { Component } from "react";
import screenfull from "screenfull";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { removeredux, changeLanguage } from "../../../redux/actions";
import { Layout, Button, Icon, Modal } from "antd";
import dayjs from "dayjs";
import "./index.less";
import { removeItem } from "../../../utils/storage";

const { Header } = Layout;
const { confirm } = Modal;
@connect(
  start => ({
    userName: start.user.user && start.user.user.username,
    language: start.language
  }),
  {
    removeredux,
    changeLanguage
  }
)
@withRouter
class index extends Component {
  state = {
    chang: false,
    date: Date.now()
  };
  componentDidMount = () => {
    if (screenfull.isEnabled) {
      screenfull.on("change", this.callback);
    }

    this.timeId = setInterval(() => {
      this.setState({
        date: Date.now()
      });
    }, 1000);
  };

  callback = () => {
    this.setState({
      chang: screenfull.isFullscreen
    });
  };
  screenFull = () => {
    screenfull.toggle();
  };
  componentWillMount() {
    screenfull.off("change", this.callback);
    clearInterval(this.timeId);
  }
  showConfirm = () => {
    confirm({
      title: "Do you Want to delete these items?",
      content: "Some descriptions",
      onOk: () => {
        removeItem("user");
        this.props.removeredux();
        this.props.history.replace("/login");
        const user = false && undefined;
        console.log(user);
      }
    });
  };
  changeLanguage = () => {
    const language = this.props.language === "en" ? "zh-CN" : "en";
    this.props.changeLanguage(language);
  };
  render() {
    const { chang, date } = this.state;
    const { userName, language } = this.props;

    console.log(this.props);
    return (
      <Header
        style={{ background: "#fff", padding: 0 }}
        className="layoutheader"
      >
        <div className="layoutheader-top">
          <Button onClick={this.screenFull}>
            <Icon type={chang ? "fullscreen-exit" : "fullscreen"} />
          </Button>
          <Button
            className="layoutheader-languge"
            onClick={this.changeLanguage}
          >
            {language === "en" ? "中文" : "English"}
          </Button>
          <span>欢迎 {userName}</span>
          <Button type="link" onClick={this.showConfirm}>
            退出
          </Button>
        </div>
        <div className="layoutheader-bottom">
          <span className="layoutheader-nav">商品管理</span>
          <span className="layoutheader-item">
            {dayjs(date).format("YYYY/MM/DD HH:mm:ss")}
          </span>
        </div>
      </Header>
    );
  }
}
export default index;
