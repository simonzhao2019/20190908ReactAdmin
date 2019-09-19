import React, { Component } from "react";

import { HashRouter, Route, Switch } from "react-router-dom";

//自己组件的引入
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";
export default class App extends Component {
  render() {
    return (
      < HashRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </ HashRouter>
    );
  }
}
