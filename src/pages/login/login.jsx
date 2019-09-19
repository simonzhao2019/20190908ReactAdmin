import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import { Form, Icon, Input, Button, message } from "antd";
//自己内部模块的引入
import {loginReq} from '../../api';
import memoryUtils from "../../utils/memoryUtils";
import storage from "../../utils/storage";
import {login} from '../../redux/action';
//样式的引入
import "./login.less";
import logo from "../../assets/images/logo.png";

class Login extends Component {
  //对密码进行校验的validator函数
  validatePWD = (rule, value, callback) => {
     value = value.trim()
    if (!value) {
      callback("请输入密码");
    } else if (value.length <= 4) {
      callback("密码长度不能小于四位");
    } else if (value.length > 12) {
      callback("密码长度最多12位");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("用户名只能包含英文、数字或者是下划线");
    } else {
      callback(); // 验证通过
    }
    }
    //提交的表单验证
  handleSubmit = e => {
    e.preventDefault();
    const form = this.props.form
    form.validateFields(async (error, { username, password }) => {
      if (!error) {
        console.log(username,password)
        // 验证通过
        this.props.login(username, password );
      } else {
        console.log("前台表单验证失败");
      }
    });
  };
  render() {
    const userData = this.props.user
    if (userData._id) {
      return <Redirect to="/"></Redirect>;
    }
    //表单的实时验证
    const form = this.props.form;
    const getFieldDecorate = form.getFieldDecorator;
    return (
      <div className="login">
        <div className="header">
          <img src={logo} alt="logo" />
          <h1>React项目：后台管理系统</h1>
        </div>

        <Form onSubmit={this.handleSubmit} className="login-form login-window">
          {userData.msg ? <div style={{ color: "red" }}>{userData.msg}</div> : null}
          <h2>用户登录</h2>
          <Form.Item>
            {getFieldDecorate("username", {
              initialValue: "",
              rules: [
                { require: true, whitespace: true, message: "请输入用户名" },
                { whitespace: true, message: "用户名不能包含空格" },
                { min: 4, message: "用户名长度不得小于4位" },
                { max: 16, message: "用户名长度不得超过16位" },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "用户名只能包含英文、数字或者是下划线"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorate("password", {
              initialValue: "",
              rules: [{ validator: this.validatePWD }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const Wrappedlogin = Form.create()(Login)
export default connect(
  state=>({
    user:state.user
  }),
  {login}
)(Wrappedlogin);
