import {combineReducers} from 'redux';
import storage from '../utils/storage';
import { SET_HEADER_TITLE, RECEIVE_USER, SHOW_MSG,LOGOUT } from '../redux/action_type';




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
const initUser = storage.getUser()
function user(state = initUser, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return  action.user
    case SHOW_MSG:
      return { ...state, msg: action.msg }
    case LOGOUT:
      return { msg: '请重新登陆' }
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
