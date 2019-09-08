import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'


//登录的接口
export const loginReq=(username,password)=>ajax({
  url:"/login",
  method: "post",
  data: {
    username,
    password
  },
})
//天气的接口
export const weatherReq=(city)=>{
 return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(
      url, {}, (err, data) => {
        if (!err && data.status === "success") {
          const {dayPictureUrl,weather} = data.results[0].weather_data[0]
          resolve({dayPictureUrl,weather
          })
        }else{
          message.error("获取天气信息失败")
        }
      }
    )
 })
 
}
//获取分类列表的函数
export const reqCategorys=()=>ajax({
   url: "manage/category/list",
     method: "GET"
})
//添加分类

export const reqAddCategory = (categoryName) => ajax({
  url: "manage/category/add",
  method: "POST",
  data: {
    categoryName
  }
})
//更新分类
export const reqUpdateCategory = ({
  categoryId,
  categoryName
}) => ajax.post(
  '/manage/category/update', {
    categoryId,
    categoryName
  }
)
//添加商品
/* export const addUpdateCategory = ({
  categoryId,
  categoryName
}) => ajax.post(
  '/manage/product/add', {
    categoryId,
    categoryName
  }
) */
