import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
//自己模块
import { formateDate } from "../../utils/dateUtils";
import LinkButton from "../../components/linkButton/linkButton";
import { reqRoles, reqAddRole, reqUpdateRole } from "../../api/index";
import memoryUtils from "../../utils/memoryUtils";
import RoleAdd from "./roleAdd";
import RoleAuth from './roleAuth';

export default class Roles extends Component {
  state = {
    roles: [], //后台获取的角色存放在这里
    showOrHiddenAdd: false,
    showOrHiddenAuth: false
  };
  authRef=React.createRef()
  initColumn = () => {
    this.columns = [
      {
        title: "角色名称",
        dataIndex: "name"
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render: formateDate
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
        render: auth_time => formateDate(auth_time)
      },
      {
        title: "授权人",
        dataIndex: "auth_name"
      },
      {
        title: "操作",
        render: role => (
          <LinkButton onClick={() => this.showAuth(role)}>设置权限</LinkButton>
        )
      }
    ];
  };
//更新角色权限
updateRole=async ()=>{
   this.setState({
     showOrHiddenAuth: false
   });
   const role=this.role
   console.log(role)
  role.menus = this.authRef.current.getMenus();
   role.auth_time=Date.now()
   role.auth_name = memoryUtils.user.username
    const result = await reqUpdateRole(role)
    if (result.status===0) {
      message.success(`给${role.name}授权成功`)
      this.getRoles()
    }

}
  //显示角色授权界面
  showAuth = role => {
    this.role = role;
    this.setState({
      showOrHiddenAuth: true
    });
  };
  //发请求获取所有角色列表
  getRoles = async () => {
    const result = await reqRoles();
    if (result.status === 0) {
      const roles = result.data;
      this.setState({
        roles
      });
    }
  };
  //添加角色
  addRole = () => {
    const { validateFields } = this.form;
    validateFields(async (err, values) => {
      if (!err) {
        this.form.resetFields();
        this.setState({
          showOrHiddenAdd: false
        });
        const result = await reqAddRole(values.roleName);
        if (result.status === "0") {
          message.success("添加角色成功");
          const role = result.data;
          const { roles } = this.state;
          this.setState({
            roles: [...roles, role]
          });
        }
      }
    });
  };

  componentDidMount() {
    this.getRoles();
  }
  componentWillMount() {
    this.initColumn()
  }
  render() {
    const { roles,showOrHiddenAdd, showOrHiddenAuth } = this.state;
    const role = this.role || {};
    const title = (
      <Button
        type="primary"
        onClick={() => this.setState({ showOrHiddenAdd: true })}
      >
        创建角色
      </Button>
    );
    return (
      <>
        <Card title={title}>
          <Table
            bordered
            dataSource={roles}
            columns={this.columns}
            rowKey="_id"
            pagination={{
              pageSize: 4
            }}
          />
          <Modal
            title="添加角色"
            visible={showOrHiddenAdd}
            onOk={this.addRole}
            onCancel={() => {
              this.setState({ showOrHiddenAdd: false });
              this.form.resetFields();
            }}
          >
            <RoleAdd setForm={form => (this.form = form)}></RoleAdd>
          </Modal>
          <Modal
            title="设置角色权限"
            visible={showOrHiddenAuth}
            onOk={this.updateRole}
            onCancel={() => {
            this.setState({ showOrHiddenAuth: false });
            }}
          >
            <RoleAuth ref={this.authRef} role={role}></RoleAuth>
          </Modal>
        </Card>
      </>
    );
  }
}
