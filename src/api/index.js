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
   url: "/manage/category/list",// 这里如果不加斜杠， 会自动把路由的上一层， 也就是product加入到地址中， 也就是说访问的地址就变成了 / product / manage / category / list                         
     method: "GET"
})
//添加分类

export const reqAddCategory = (categoryName) => ajax({
  url: "/manage/category/add",
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
//获取商品分页列表
export const reqProducts=(pageNum,pageSize)=>
  ajax.get(
   "/manage/product/list",
   {
     params: {
       pageNum,
       pageSize
     }
   }
  )
//搜索商品
export const reqSearchProducts = ({pageNum,pageSize,searchType,searchName}) => ajax.get(
  "/manage/product/search",
  {
    params:{
      pageNum,
      pageSize,
      [searchType]:searchName
    }
  }
)
//商品的上架或者是下架处理
export const reqUpdateStatus = (productId, status) => ajax.post(
  '/manage/product/updateStatus', {
    productId,
    status
  }
)
//根据商品ID获取商品详情
export const reqProduct = (productId) => ajax({
  url: "/manage/product/info",
  params:{
    productId
  }
})
//根据分类ID获取分类
export const reqCategory = (categoryId) => ajax({
  url: "/manage/category/info",
  params:{
     categoryId
  }
})
export const reqDeleteImg = (name) => ajax({
  url: '/manage/img/delete',
  method: 'POST',
  data: {
    name
  }
})

//添加/更新商品的请求函数
export const addOrUpdateProduct=(product)=>ajax({
    url: "/manage/product/" + (product._id ? 'update' : 'add'),
    method:"POST",
   data: product
}

)



/* export const reqCategory = (categoryId) => ajax({
  url: '/manage/category/info',
  params: {
    categoryId
  }
}) */

