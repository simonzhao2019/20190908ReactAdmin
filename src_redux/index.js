import React from 'react'
import ReactDOM from 'react-dom'
import store from './redux/store';

import App from './App'
//初始化渲染
ReactDOM.render( < App store = {
      store
    }
    />, document.getElementById('root'))
//store的数据发生改变的时候调用，重新渲染
store.subscribe(()=>{
  ReactDOM.render( <App store = {store}/> , document.getElementById('root'))
})

