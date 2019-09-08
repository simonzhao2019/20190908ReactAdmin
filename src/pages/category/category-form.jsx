import React, { Component } from 'react'
import {Form,Input} from 'antd';
import PropTypes from 'prop-types';
const Item=Form.Item

class CategoryForm extends Component {
  static propTypes={
    category:PropTypes.string,
    setForm:PropTypes.func.isRequired
  }
  componentWillMount() {
    //借用父组件传过来的setForm,把form属性传过去
    this.props.setForm(this.props.form)
  }
  render() {
    const {getFieldDecorator}=this.props.form
    const {categoryName}=this.props
    return (
      <Form>
        <Item>
          {getFieldDecorator("categoryName", {
            initialValue: categoryName,
            rules: [
              { required: true, whitespace: true, message: "必须输入分类名称" }
            ]
          })(<Input placeholder="请输入分类名称" />)}
        </Item>
      </Form>
    );
  }
}
export default Form.create()(CategoryForm);
