import React, { Component } from "react"
import {withRouter} from 'react-router-dom'
import { Modal} from "antd";
//自己定义的模块
import './header.less'
import LinkButton from '../../components/linkButton/linkButton'
import memoryUtils from '../../utils/memoryUtils'
import menuList from "../../config/menuConfig"
import { formateDate } from "../../utils/dateUtils"
import { weatherReq } from "../../api/index";
import storage from "../../utils/storage";

const {confirm}=Modal

 class HeadMenu extends Component {
   state = {
     currentTime: formateDate(Date.now()),
     dayPictureUrl: "",
     weather: ""
   };

   loginOut=()=>{
       confirm({
         title: "退出",
         content: "你确定要退出登录吗？",
         onOk:()=> {
           storage.deleteUser()
           memoryUtils.user={}
           this.props.history.replace("/login")
         },
         onCancel:()=> {
           console.log("Cancel");
         }
       });
     
   }
   //天气状态的修改
   getWeather = async () => {
     console.log(weatherReq);
     const { dayPictureUrl, weather } = await weatherReq("上海");
     console.log(dayPictureUrl, weather);
     this.setState({
       dayPictureUrl,
       weather
     });
   };
   updateTime = () => {
     this.intervalId = setInterval(() => {
       this.setState({
         currentTime: formateDate(Date.now())
       });
     }, 1000);
   };
   getTitle = () => {
     const path = this.props.location.pathname;
     let title;
     menuList.forEach(item => {
       if (item.key === path) {
         title = item.title;
       } else if (item.children) {
         const cItem = item.children.find(cItem => cItem.key === path);
         if (cItem) {
           title = cItem.title;
         }
       }
     });
     return title;
   };
   componentDidMount() {
     this.updateTime();
     this.getWeather();
   }
   componentWillUnmount() {
     clearInterval(this.intervalId);
   }
   render() {
     const { username } = memoryUtils.user;
     const { currentTime, dayPictureUrl, weather } = this.state;
     const title = this.getTitle();
     return (
       <div className="header">
         <div className="header-top">
           欢迎, {username} &nbsp;
           <LinkButton onClick={this.loginOut}>退出</LinkButton>
         </div>
         <div className="header-bottom">
           <div className="header-bottom-left">{title}</div>
           <div className="header-bottom-right">
             <span>{currentTime}</span>
             <img src={dayPictureUrl} alt="天气" />
             <span>{weather}</span>
           </div>
         </div>
       </div>
     );
   }
 }
export default withRouter(HeadMenu)

