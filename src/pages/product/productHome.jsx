import React, { Component } from "react";
import { Card, Select, Input, Button, Table, message } from "antd";
//自己模块引入
import { reqProducts, reqSearchProducts, reqUpdateStatus } from "../../api";
import LinkButton from "../../components/linkButton/linkButton";
import memoryUtils from '../../utils/memoryUtils';

const { Option } = Select;

export default class ProductHome extends Component {
  state = {
    products: [],
    total: 0,
    searchType: "productName",
    searchName: ""
  };

  addProduct = () => { };
  //发送请求获取商品列表
  getProducts = async pageNum => {
    this.current = pageNum; //保存当前请求的页码
    let result;
    if (this.search) {
      const { searchType, searchName } = this.state;
      result = await reqSearchProducts({
        pageNum,
        pageSize: 4,
        searchType,
        searchName
      });
    } else {
      result = await reqProducts(pageNum, 4);
    }
    if (result.status === 0) {
      const { list, total } = result.data;
      this.setState({
        products: list,
        total
      });
    }
  };

  //商品的上架以及下架处理
  reqUpdateStatus=async (categoryId,status)=>{
    const result=await reqUpdateStatus(categoryId,status)
    if(result.status===0){
      message.success("更新商品状态成功")
      this.getProducts(this.current)
    }else{
      message.error("更新商品状态失败")
    }
  }
  componentWillMount() {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name"
      },
      {
        title: "商品描述",
        dataIndex: "desc"
      },
      {
        title: "价格",
        dataIndex: "price",
        render: price => "￥" + price
      },
      {
        title: "状态",
        render: ({ _id, status }) => {
          let goodOperate = "下架";
          let saleCondition = "在售";
          if (status === 2) {
            goodOperate = "上架";
            saleCondition = "已下架";
          }
          return (
            <span>
              <Button
                type="primary"
                onClick={() =>
                  this.reqUpdateStatus(_id, status === 1 ? 2 : 1)
                }
              >
                {goodOperate}
              </Button>
              <br></br>
              <span>{saleCondition}</span>
            </span>
          );
        }
      },
      {
        title: "操作",
        render: product => {
          return (
            <span>
              <LinkButton
                onClick={() => {
                  memoryUtils.product = product;
                  this.props.history.push(`/product/detail/${product._id}`);
                }}
              >
                详情
              </LinkButton>
              <LinkButton
                onClick={() => {
                  this.props.history.push("/product/addupdate", product);
                }}
              >
                修改
              </LinkButton>
            </span>
          );
        }
      }
    ];
  }
  componentDidMount() {
    this.getProducts(1);
  }
  render() {
    const {
      products,
      total,
      searchType,
      searchName
    } = this.state;
    const title = (
      <>
        <Select
          style={{ width: 150 }}
          value={searchType}
          onChange={value =>
            this.setState({ searchType: value })
          }
        >
          <Option key="1" value="productName">
            按名称搜索
          </Option>
          <Option key="2" value="productDesc">
            按描述搜索
                         </Option>
        </Select>
        <Input
          placeholder="输入关键字进行搜索"
          style={{ width: 200, margin: "0 15px" }}
          value={searchName}
          onChange={event =>
            this.setState({ searchName: event.target.value })
          }
        />
        <Button
          type="primary"
          icon="search"
          onClick={() => {
            // 保存一个搜索标记
            this.search = true;
            this.getProducts(1);
          }}
        >
          搜索
         </Button>
      </>
    );
    const extra = (
      <>
        <Button
          type="primary"
          icon="plus"
          onClick={() => this.props.history.push("/product/addupdate")}>
          添加商品
        </Button>
      </>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          dataSource={products}
          columns={this.columns}
          bordered
          rowKey="_id"
          pagination={{
            pageSize: 4,
            total,
            onChange: this.getProducts,
            current: 3
          }}
        ></Table>
      </Card>
    );
  }
}
