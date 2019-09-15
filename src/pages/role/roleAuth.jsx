import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Tree, Input, Form } from "antd";

import menuList from "../../config/menuConfig";

const { TreeNode } = Tree;
const { Item } = Form;

export default class RoleAuth extends Component {
  static propTypes = {
    role: PropTypes.object
  };
  constructor(props) {
    super(props);
    console.log("AuthForm constructor()");

    let checkedKeys = [];
    const role = this.props.role;
    if (role) {
      checkedKeys = role.menus;
    }
    this.state = {
      checkedKeys
    };
  }
  //将数据传过去
  getMenus = () => this.state.checkedKeys;
  onCheck = checkedKeys => {
    this.setState({
      checkedKeys
    });
  };
  //对treeNode进行渲染的函数
  getTreeNode = menuList => {
    return menuList.map(item => {
      return (
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNode(item.children) : null}
        </TreeNode>
      );
    });
  };
  componentWillReceiveProps(nextProps) {
    const menus = nextProps.role.menus;
    this.setState({
      checkedKeys: menus
    });
  }
  render() {
    const { role } = this.props;
    const { checkedKeys } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 }
    };
    return (
      <>
        <Item label="角色名称" {...formItemLayout}>
          <Input value={role.name} disabled></Input>
        </Item>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="0-0">
            {this.getTreeNode(menuList)}
          </TreeNode>
        </Tree>
      </>
    );
  }
}
