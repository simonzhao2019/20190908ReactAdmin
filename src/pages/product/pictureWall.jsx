import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Upload,Icon,Modal, message } from "antd";
import {reqDeleteImg} from '../../api';
import {BASE_IMG_PATH} from '../../utils/constant';



function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PictureWall extends Component {
  static propTypes={
    imgs:PropTypes.array
  }
  constructor(props){
    super(props)
     let fileList = [];
     const { imgs } = this.props;
    if(imgs&&imgs.length>0){
      fileList = imgs.map((img, index) => ({
        uid: index,
        name: img,
        status: "done",
        url: BASE_IMG_PATH + img
      }));
    }
    this.state = {
      previewVisible: false,
      previewImage: "",
      fileList
    };
  }
  //获取图片名称的数组
  getImgs=()=>this.state.fileList.map(file=>file.name)

  handleCancel = () => this.setState({ previewVisible: false });
  //上传图片
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChange = async ({file,fileList}) => {//回调函数传过来一个对象，这里进行结构赋值，顺序可以变，对象的属性名不可以变
   /*  console.log(
      "handleChange()",
      file.status,
      file === fileList[fileList.length - 1]

      //注意这里的fileList中的file和我们提交的file已经不是同一个了，因此我们要将file
    ); */
      if(file.status==="done"){
       file = fileList[fileList.length - 1]
        const {name,url}=file.response.data
        file.name=name
        file.url=url
      }else if(file.status==="removed"){
        const result=await reqDeleteImg(file.name)
        if(result.status===0){
          message.success("删除图片成功")
        }
      }
      this.setState({
        fileList
      });
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload"
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
