import React, { Component } from "react";
import { Form, Icon, Input, Button, message } from "antd";
import log from "../../assce/logo.png";
import "./index.less";
import { connect } from "react-redux";
import { saveUserAsync } from "../../redux/actions";
import withchecklogin from "../with-check-login";
@withchecklogin
@connect(null, { saveUserAsync })
@Form.create()
class Login extends Component {
  handleConfirmPassword = (rule, value, callback) => {
    const str = rule.field === "username" ? "用户名" : "密码";
    if (!value) {
      callback(`请输入${str}`);
    } else if (!/^\w+$/.test(value)) {
      callback(`请输入正确的格式英文、字母、下划线`);
    } else if (value.length < 5) {
      callback(`${str}长度不能小于5`);
    } else if (value.length > 15) {
      callback(`${str}长度不能大于15`);
    }

    callback();
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields }
    } = this.props;
    validateFields((errors, values) => {
      const { username, password } = values;

      if (errors === null) {
        this.props
          .saveUserAsync(username, password)
          .then(() => {
            this.props.history.replace("/home");
          })
          .catch(msg => {
            message.error(msg);
            this.props.form.resetFields(["password"]);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="log">
        <header className="log-header">
          <img src={log} alt="log" />
          <p>React项目：后台管理系统</p>
        </header>
        <div className="log-body">
          <h2>用户登入</h2>
          <Form
            onSubmit={this.handleSubmit}
            className="log-body-from login-form"
          >
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    validator: this.handleConfirmPassword
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="请输入账号"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator: this.handleConfirmPassword
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="请输入密码"
                />
              )}
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
