import React, { Component } from 'react'
import { Redirect ,Switch,Route} from 'react-router-dom'
import { Layout, Menu } from "antd";
//自己模块||组件
import memoryUtils from "../../utils/memoryUtils"
import LeftMenu from '../../components/leftMenu/index'
import HeaderMenu from '../../components/headerMenu'
import Home from '../home/home'
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";

import  './admin.less'

//从模块中取出某个具体组件
/* <LeftMenu></LeftMenu>一共进行了两次渲染，第一次是在/下面的渲染，第二次是在/home下的渲染，
由于第一次渲染已经生成了LeftMenu组件，因此第二次会复用。defaultKey不会改变 */
const {  Footer, Content,Sider } = Layout

export default class Admin extends Component {
  render() {
    const userData = memoryUtils.user;
    if (!userData._id) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider className="LeftSide">
          <LeftMenu></LeftMenu> 
        </Sider>
        <Layout>
          <HeaderMenu>Header</HeaderMenu>
          <Content style={{ backgroundColor: "white", margin: "20px 20px 0" }}>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/role" component={Role}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/charts/bar" component={Bar}></Route>
              <Route path="/charts/line" component={Line}></Route>
              <Route path="/charts/pie" component={Pie}></Route>
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "rgba(0, 0, 0, 0.5)" }}>
            推荐使用Chrome浏览器，获得更好体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
