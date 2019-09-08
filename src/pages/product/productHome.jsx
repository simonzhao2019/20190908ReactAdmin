import React, { Component } from 'react'
import { Card, Select, Input, Button, Table, message } from "antd";
import LinkButton from '../../components/linkButton/linkButton';

const { Option } = Select



export default class ProductHome extends Component {
  state = {
    products: [
      {
        status: 1,
        imgs: ["image-1559402396338.jpg"],
        _id: "5ca9e05db49ef916541160cd",
        name: "联想ThinkPad 翼4809",
        desc:
          "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
        price: 65999,
        categoryId: "5ca9db9fb49ef916541160cc",
        detail:
          '<p><span style="color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;">99999</span></p>\n',
        __v: 0
      },
      {
        status: 2,
        imgs: ["image-1554638240202.jpg"],
        _id: "5ca9e5bbb49ef916541160d0",
        name: "美的(Midea) 213升-BCD-213TM",
        desc:
          "爆款直降!大容量三口之家优选! *节能养鲜,自动低温补偿,36分贝静音呵护",
        price: 1388,
        categoryId: "5ca9d9cfb49ef916541160c4",
        detail:
          '<p style="text-align:start;"><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, "microsoft yahei;">美的(Midea) 213升 节能静音家用三门小冰箱 阳光米 BCD-213TM(E)</span></p>\n<p><span style="color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;font-family: tahoma, arial, "Microsoft YaHei", "Hiragino Sans GB", u5b8bu4f53, sans-serif;">【4.8美的大牌秒杀日】爆款直降!大容量三口之家优选! *节能养鲜,自动低温补偿,36分贝静音呵护! *每天不到一度电,省钱又省心!</span>&nbsp;</p>\n',
        __v: 0
      },
      {
        status: 1,
        imgs: [
          "image-1554638676149.jpg",
          "image-1554638683746.jpg"
        ],
        _id: "5ca9e773b49ef916541160d2",
        name: "联想ThinkPad X1 Carbon",
        desc:
          "英特尔酷睿i5 14英寸轻薄笔记本电脑（i5-8250U 8G 256GSSD FHD）黑色",
        price: 9999,
        categoryId: "5ca9db78b49ef916541160ca",
        detail:
          '<p style="text-align:start;"><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, "microsoft yahei;">联想ThinkPad X1 Carbon 2018（09CD）英特尔酷睿i5 14英寸轻薄笔记本电脑（i5-8250U 8G 256GSSD FHD）黑色</span></p>\n<p><span style="color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;font-family: tahoma, arial, "Microsoft YaHei", "Hiragino Sans GB", u5b8bu4f53, sans-serif;">年度重量级新品，X390、T490全新登场 更加轻薄机身设计，全面的配置升级，让工作更便捷，让生活更轻松</span><a href="https://pro.jd.com/mall/active/2M4o7NTzHH6jEJXS7VbpbTAANQB9/index.html" target="_blank"><span style="color: rgb(94,105,173);background-color: rgb(255,255,255);font-size: 12px;font-family: tahoma, arial, "Microsoft YaHei", "Hiragino Sans GB", u5b8bu4f53, sans-serif;">4月9日京东震撼首发，火爆预约</span></a>&nbsp;</p>\n',
        __v: 0
      }
    ]
  };

  addProduct = () => { };
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
        dataIndex:"status",
        render: status=> {
          return (
            <span>
              <Button type="primary">下架</Button>
              <br></br>
              <span>在售</span>
            </span>
          );
        }
      },
      {
        title: "操作",
        render: product => {
          return (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          );
        }
      }
      
    ];
  }
  render() {
    const { products } = this.state;
    const title = (
      <>
        <Select style={{ width: 150 }} value="productName">
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
        />
        <Button
          type="primary"
          icon="search"
          onClick={this.addProduct}
        >
          Search
         </Button>
      </>
    );
    const extra = (
      <>
        <Button type="primary" icon="plus">
          添加商品
          </Button>
      </>
    );
    return (
      <Card title={title} extra={extra}>
        <Table dataSource={products} columns={this.columns} bordered rowKey="_id"></Table>
      </Card>
    );
  }
}
