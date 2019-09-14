import React, { Component } from 'react'
import {Card,Button,Table} from 'antd';
import {formateDate} from "../../utils/dateUtils";

const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号"
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号"
  }
];
const columns = [
  {
    title: "name",
    dataIndex: "username"
  },
  {
    title: "邮箱",
    dataIndex: "email"
  },
  {
    title: "电话",
    dataIndex: "phone"
  },
  {
    title: "注册时间",
    dataIndex: "creat_time",
    render: formateDate
  },
  {
    title: "operation",
    dataIndex: "operation"
  }
];

export default class User extends Component {
  render() {
    const title=(
      <Button type="primary">创建用户</Button>
    )
    return (
      <>
        <Card title={title}>
          <Table
           
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={{
              onChange: this.cancel
            }}
          />
        </Card>
      </>
    );
  }
}
