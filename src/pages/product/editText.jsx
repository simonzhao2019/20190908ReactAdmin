import React from "react";
import PropTypes from 'prop-types';
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
//import "../../../node_modules/braft-editor/dist/index.css";
import "braft-editor/dist/index.css";

export default class EditorText extends React.Component {
  static propTypes={
    detail:PropTypes.string
  }
  constructor (props){
    super(props)
    const detail=this.props.detail
    if(detail){
      this.state = {
        editorState: BraftEditor.createEditorState(detail)
      };
    }else{
      this.state = {
        editorState: BraftEditor.createEditorState()
      };
    }
  }

//处理文本保存
  submitContent =  () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
   return this.state.editorState.toHTML();
   
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };
  //处理文本框里面的图片
  myUploadFn = (param) => {

  const serverURL = "/manage/img/upload";
  const xhr = new XMLHttpRequest()
  const fd = new FormData()

  const successFn = (response) => {
    console.log(response)
    // 假设服务端直接返回文件上传后的地址
    // 上传成功后调用param.success并传入上传后的文件地址
  
    param.success({
      url: JSON.parse(xhr.response).data.url
    });
  }
 
  const errorFn = (response) => {
    // 上传发生错误时调用param.error
    param.error({
      msg: 'unable to upload.'
    })
  }
  xhr.addEventListener("load", successFn, false)
  xhr.addEventListener("error", errorFn, false)
  xhr.addEventListener("abort", errorFn, false)

  fd.append('image', param.file)//注意这里的文件类型，决定了请求参数
  xhr.open('POST', serverURL)
  xhr.send(fd)

}

  render() {
    const { editorState } = this.state;
    return (
      <div className="my-component">
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          onSave={this.submitContent}
          media={{ uploadFn: this.myUploadFn }}
          style={{ border: "1px solid gray" }}
        />
      </div>
    );
  }
}
