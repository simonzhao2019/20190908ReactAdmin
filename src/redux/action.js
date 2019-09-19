import { SET_HEADER_TITLE, RECEIVE_USER, SHOW_MSG,LOGOUT} from '../redux/action_type';
import { loginReq } from '../api'
import storageUtils from '../utils/storage';
export const setHeaderTitle =
 (headerTitle) => ({ type: SET_HEADER_TITLE, data: headerTitle })
 //退出登录的action
export const logout = () => {
  // 删除local中的user
  storageUtils.deleteUser()

  return ({ type: LOGOUT })
}


const receiveUser = (user) => ({ type: RECEIVE_USER, user })
const showMsg = (msg) => ({ type: SHOW_MSG, msg })
//登录的异步action
 export function login(username,password){
  return async dispatch=>{
    const result = await loginReq(username, password)
    if(result.status===0){
      const user = result.data
      // 将user保存local
      storageUtils.saveUser(user)
      dispatch(receiveUser(user))
    }else{
      dispatch(showMsg(result.msg))
    }
  }
  

 } 