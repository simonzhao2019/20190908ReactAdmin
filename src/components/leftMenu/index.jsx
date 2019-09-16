import React, { Component } from "react";
import { Link ,withRouter} from "react-router-dom";
import { Menu, Icon } from "antd";
import {connect} from 'react-redux';

import memoryUtils from '../../utils/memoryUtils';
import menuList from "../../config/menuConfig";
import "./index.less";
import logo from "../../assets/images/logo.png";
import { setHeaderTitle } from "../../redux/action";

const { SubMenu } = Menu;

 class LeftMenu extends Component {
  //  getMenuNodes2 = menuList => {
  //    // 请求的路由路径
  //    const path = this.props.location.pathname;
  //    return menuList.reduce((pre, item) => {
  //      // 向pre中添加<Item>
  //      if (!item.children) {
  //        pre.push(
  //          <Item key={item.key}>
  //            <Link to={item.key}>
  //              <Icon type={item.icon} />
  //              <span>{item.title}</span>
  //            </Link>
  //          </Item>
  //        );
  //      } else {
  //        // 向pre中添加<SubMenu>

  //        // 请求的路由路径对应children中某个
  //        if (item.children.some(item => item.key === path)) {
  //          // 将item的key保存为openKey
  //          this.openKey = item.key;
  //        }

  //        pre.push(
  //          <SubMenu
  //            key={item.key}
  //            title={
  //              <span>
  //                <Icon type={item.icon} />
  //                <span>{item.title}</span>
  //              </span>
  //            }
  //          >
  //            {this.getMenuNodes2(item.children)}
  //          </SubMenu>
  //        );
  //      }

  //      return pre;
  //    }, []);
  //  };
   //遍历数据，动态生成菜单
   hasAuth=(item)=>{
const user = memoryUtils.user;
const menus = user.role.menus;
if (user.username==='admin' || item.isPublic || menus.indexOf(item.key)!==-1) {
      return true
    } else if (item.children) {
      return item.children.some(cItem => menus.indexOf(cItem.key)!==-1)
    }
    return false
  
   }
    
   getMenu = menuList => {
    const path = this.props.location.pathname;
     return menuList.map(item=>{
       if(this.hasAuth(item)){
       if(!item.children){
          if (path.indexOf(item.key) === 0) {
            this.props.setHeaderTitle(item.title);
          }
         return (
           
           <Menu.Item key={item.key}>
         {/* 改变action里面data的值，从而改变数据 */}
             <Link to={item.key} onClick={()=>this.props.setHeaderTitle(item.title)}>
               <Icon type={item.icon} />
               <span>{item.title}</span>
             </Link>
           </Menu.Item>
         );
       }else{
         if(item.children.some(item=>item.key===path)){
           this.openKey = item.key;
         }
         return (
           <SubMenu
             key={item.key}
             title={
               <span>
                 <Icon type={item.icon} />
                 <span>{item.title}</span>
               </span>
             }
           >
             {this.getMenu(item.children)}
           </SubMenu>
         );
       }
      }

     })
   }
  
   render() {
     const selectedKey = this.props.location.pathname;
      const menuNodes = this.getMenu(menuList);
     const openKey = this.openKey;
    
     return (
       <div className="left-nav">
         <Link to="/home" className="left-nav-header">
           <img src={logo} alt="logo" />
           <h1>硅谷后台</h1>
         </Link>
         <Menu
           mode="inline"
           theme="light" /* 多次指定值, 只有第一次有效果 */
           /* defaultSelectedKeys={[selectedKey]} */ selectedKeys={[
             selectedKey
           ]} /* 多次指定值, 每次指定都生效 */
           defaultOpenKeys={[openKey]}
         >
           {menuNodes}
         </Menu>
       </div>
     );
   }
 }
export default withRouter(connect(
  state=>({}),
  {setHeaderTitle}
)(LeftMenu));
