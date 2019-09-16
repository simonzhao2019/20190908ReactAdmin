/* 
展示组件：将容器组件中的数据通过属性传递过来，交个这个展示组件，根据展示组件渲染界面
*/
import React, { Component } from "react";
import {connect} from 'react-redux';

import { increment, decrement,incrementAsync } from "../redux/actions";
import PropTypes from "prop-types";


class Counter extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    incrementAsync:PropTypes.func.isRequired
  };

  increment = () => {
    const number = this.refs.numberSelect.value * 1;
    this.props.increment(number);
  };

  decrement = () => {
    const number = this.refs.numberSelect.value * 1;
    this.props.decrement(number);
  };
  incrementIfOdd = () => {
    const number = this.refs.numberSelect.value * 1;

    if (this.props.count % 2 === 1) {
      this.props.increment(number);
    }
  };

  incrementAsync = () => {
    const number = this.refs.numberSelect.value * 1;
    this.props.incrementAsync(number)
  };

  render() {
    const count = this.props.count;

    return (
      <div>
        <p>click {count} times</p>
        <select ref="numberSelect">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>{" "}
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>increment if odd</button>
        &nbsp;
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    );
  }
}
//将Counter包装返回
const mapStateToProps=(state)=>{
  return {
    count:state
  }
}
const mapDispatchToProps=(dispatch)=>({
  increment:(number)=>dispatch(increment(number)),
  decrement:(number)=>dispatch(decrement(number))
})
export default connect(
  mapStateToProps,
  { increment, decrement, incrementAsync }
)(Counter);
