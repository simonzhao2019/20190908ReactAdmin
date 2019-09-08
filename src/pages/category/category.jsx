import React, { Component } from "react";
import { Card, Button, Icon, Table, message, Modal } from "antd";
import LinkButton from "../../components/linkButton/linkButton";
import { reqCategorys } from "../../api/index";
import CategoryForm from './category-form';
import { reqAddCategory } from '../../api/index'
import { reqUpdateCategory } from "../../api/index";


import "./category.less";


export default class Category extends Component {
  state = {
    categorys: [],
    loading: false,
    showStatus: 0 //0表示都不显示
  };
  //显示添加界面
  showAdd = () => {
    this.setState({
      showStatus: 1
    });
  };

  //点击添加界面的OK
  addCategory = () => {
    this.form.validateFields(async (error, value) => {
      if (!error) {
        this.form.resetFields();
        const result = await reqAddCategory(value.categoryName);
        if (result.status === 0) {
          this.setState({
            showStatus: 0
          });
          message.success("添加分类成功");
          this.getCategorys();
        } else {
          message.error("添加分类信息失败");
          this.getCategorys();
        }
      }
    });
  };
  //修改分类
  updateCategory = () => {
    // 对form进行验证
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 重置输入框中的数据(变为initialValue)
        this.form.resetFields();
        // 验证通过后发请求更新分类
        values.categoryId = this.category._id;
        const result = await reqUpdateCategory(values);
        if (result.status === 0) {
          this.setState({
            showStatus: 0
          });
          message.success("修改分类成功");
          // 获取最新分类列表显示
          this.getCategorys();
        } else {
          message.error(result.msg || "修改分类失败");
        }
      }
    });
  };
  //显示修改分类的界面
  showUpdate = category => {
    this.category = category;
    this.setState({
      showStatus: 2
    });
  };
  //取消添加界面
  handleCancel = () => {
    this.setState({
      showStatus: 0
    });
  };
  //发送请求获取分类
  getCategorys = async () => {
    this.setState({
      loading: true
    });
    const result = await reqCategorys();
    this.setState({
      loading: false
    });
    if (result.status === 0) {
      const categorys = result.data;
      this.setState({
        categorys
      });
    } else {
      message.error("获取商品信息失败");
    }
  };
  componentDidMount() {
    this.getCategorys();
  }
  componentWillMount() {
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name"
      },
      {
        title: "操作",
        width: 300,
        render: category => (
          <LinkButton onClick={() => this.showUpdate(category)}>
            修改分类
          </LinkButton>
        )
      }
    ];
  }
  render() {
    const category = this.category || {};
    const { categorys, loading, showStatus } = this.state;
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type="plus"></Icon>
        添加
                     </Button>
    );
    return (
      <>
        <Card
          extra={extra}
          className="card-content"
          bordered={false}
        >
          <Table
            loading={loading}
            columns={this.columns}
            dataSource={categorys}
            size="middle"
            bordered
            rowKey="_id"
            pagination={{ pageSize: 4, showQuickJumper: true }}
          />
          <Modal
            title="添加分类"
            visible={showStatus === 1}
            onOk={this.addCategory}
            onCancel={this.handleCancel}
          >
            <CategoryForm
              setForm={form => {
                this.form = form;
              }}
            ></CategoryForm>
          </Modal>
          <Modal
            title="修改分类"
            visible={showStatus === 2}
            onOk={this.updateCategory}
            onCancel={this.handleCancel}
          >
            <CategoryForm
              categoryName={category.name}
              setForm={form => {
                this.form = form;
              }}
            ></CategoryForm>
          </Modal>
        </Card>
      </>
    );
  }
}
