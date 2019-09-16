import React from 'react'
import ReactDOM from 'react-dom'
import {Provider}from 'react-redux';
import store from './redux/store';

import Counter from './componentes/count'

ReactDOM.render( 
  <Provider store={store}>
    <Counter></Counter>
  </Provider>,
  document.getElementById('root'))


