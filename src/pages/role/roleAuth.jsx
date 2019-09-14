import React, { Component } from 'react'
import {PropTypes} from 'prop-types';
import {Tree,Input,Form} from 'antd';

const {TreeNode}=Tree
const {Item}=Form

export default class RoleAuth extends Component {
  static propTypes={
    role:PropTypes.object
  }
  render() {
    const { role } = this.props;
    const formItemLayout={
      labelCol:{span:4},
      wrapperCol:{span:15}
    }
    return (
      <>
        <Item label="角色名称" {...formItemLayout}>
          <Input value={role.name} disabled></Input>
        </Item>
        <Tree
          checkable
          defaultExpandedKeys={["0-0-0", "0-0-1"]}
          defaultSelectedKeys={["0-0-0", "0-0-1"]}
          defaultCheckedKeys={["0-0-0", "0-0-1"]}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
        >
          <TreeNode title="parent 1" key="0-0">
            <TreeNode title="parent 1-0" key="0-0-0" disabled>
              <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
              <TreeNode title="leaf" key="0-0-0-1" />
            </TreeNode>
            <TreeNode title="parent 1-1" key="0-0-1">
              <TreeNode
                title={<span style={{ color: "#1890ff" }}>sss</span>}
                key="0-0-1-0"
              />
            </TreeNode>
          </TreeNode>
        </Tree>
      </>
    );
  }
}
