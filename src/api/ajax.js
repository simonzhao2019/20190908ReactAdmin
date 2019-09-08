import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'

//axios.defaults.baseURL = 'http://localhost:5000'
//使用interceptors.request拦截请求并且将数据格式转换为urlencoded
axios.interceptors.request.use(
  (config)=>{
    //config.baseURL = 'http://localhost:5000'
    let data=config.data
    if(data&&data instanceof Object){
      config.data = qs.stringify(data)
    }
    return config
  })
//使用interceptors.response拦截相应，并且直接返回响应体里面的data
axios.interceptors.response.use(
    response=>{
      return response.data
    },
    error=>{
      message.error('请求出错: ' + error.message)  
      return new Promise(() => {})
    }
)















export default axios