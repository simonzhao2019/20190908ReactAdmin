import {combineReducers} from 'redux';
import {SET_HEADER_TITLE} from './action_type';



const initHeaderTitle = '首页'
function headerTitle(state = initHeaderTitle, action) {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return action.data
    default:
      return state
  }
}



/* 
管理登陆用户信息状态数据的reduer函数
*/
const initUser = {}
function user(state = initUser, action) {
  switch (action.type) {
    
    default:
      return state
  }
}
/* 
combineReducers(): 整合多个reducer返回一个总的reducer
  function (state, action) {}
总的state的结构:
  属性名: 返回这个数据的reducer的标识名称
  属性值: 对应的reducer执行返回的结果
  {
    headerTitle: '首页',
    user: {}
  }
*/
export default combineReducers({
  headerTitle,
  user
})