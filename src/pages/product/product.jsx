import React, { Component } from 'react'
import {Route,Redirect,Switch} from 'react-router-dom';
//自己模块
import ProductHome from './productHome'
import ProductDetail from "./productDetail";
import ProductAddUpdate from "./productAddUpdate";
import "./common.less";

export default class Product extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/product" component={ProductHome} exact></Route>
          <Route path="/product/addupdate" component={ProductAddUpdate}></Route>
          <Route path="/product/detail/:id" component={ProductDetail}></Route>
          <Redirect to="/product"></Redirect>
        </Switch>
      </>
    );
  }
}
