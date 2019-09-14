import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Form,Input} from 'antd';


class RoleAdd extends Component {
  static propsType={
    setForm:PropTypes.func.isRequire
  }
  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const {getFieldDecorator}=this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form>
        <Form.Item label="角色名称" {...formItemLayout}>
          {getFieldDecorator("roleName",{
            initialValue: "",
            rules: [{ required: true, message: "必须输入角色名称" }]
          })(<Input type="text" placeholder="请输入角色名称"></Input>)}
        </Form.Item>
      </Form>
    );
  }
}
export default RoleAdd = Form.create()(RoleAdd);
