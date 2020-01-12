import React,{Component} from 'react'
import { Form, Icon, Input, Button  } from 'antd';
import log from './logo.png'
import './index.less'
  class Login extends Component{
     
    render (){
         const { getFieldDecorator } = this.props.form;
     return <div  className="log">
         <header className ="log-header">
            <img src={log}  alt="log"/>
            <p>React项目：后台管理系统</p>
         </header>
         <div className ="log-body">
             <h2>用户登入</h2>
             <Form onSubmit={this.handleSubmit}  className="log-body-from login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入账号"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="请输入密码"
                        />,
                    )}
                </Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Form>
         </div>
    </div>
    }
} 
const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm
