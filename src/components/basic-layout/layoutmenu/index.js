import React, { Component } from "react";
import meus from "../../../config/meun";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";
const { SubMenu } = Menu;
@withRouter
class Layoutmeun extends Component {
  createMenus = meus => {
    return meus.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {item.children.map(itemchildren => {
              return (
                <Menu.Item key={itemchildren.path}>
                  <Link to={itemchildren.path}>
                    <Icon type={itemchildren.icon} />
                    <span>{itemchildren.title}</span>
                  </Link>
                </Menu.Item>
              );
            })}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.path}>
            <Link to={item.path}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      }
    });
  };
  findOpenKeys = (pathname, menus) => {
    const menu = menus.find(menu => {
      if (menu.children) {
        return menu.children.find(cMenu => cMenu.path === pathname);
      }
    });

    if (menu) {
      return menu.path;
    }
  };

  render() {
    const { pathname } = this.props.location;
    console.log(pathname);

    const openKey = this.findOpenKeys(pathname, meus);
    return (
      <Menu
        theme="dark"
        defaultSelectedKeys={[`${pathname}`]}
        mode="inline"
        defaultOpenKeys={[`${openKey}`]}
      >
        {this.createMenus(meus)}
      </Menu>
    );
  }
}
export default Layoutmeun;
