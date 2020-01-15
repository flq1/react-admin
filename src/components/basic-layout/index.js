import React from "react";
import { Layout, Breadcrumb } from "antd";
import Layoutmeun from "./layoutmenu";
import logo from "../../assce/logo.png";
import "./less.less";
const { Header, Content, Footer, Sider } = Layout;

class Basiclayout extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { children } = this.props;
    const { collapsed } = this.state;
    console.log(this.props);
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" className="basic-layout-header">
            <img src={logo} alt="log" />
            <span style={{ display: collapsed ? "none" : "block" }}>
              硅谷后台
            </span>
          </div>
          <Layoutmeun />
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Basiclayout;
