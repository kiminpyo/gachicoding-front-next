import React,{useMemo, memo, useRef, useState, useCallback, useEffect} from 'react'

import axios from 'axios';
import {Form, Button} from 'antd'
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { BOARD_CREATE_REQUEST, imageUpload, IMAGE_PREVIEW_REQUEST, IMAGE_UPLOAD_REQUEST, NOTICE_CREATE_REQUEST } from '../../reducers/post';
import useInput from '../../hooks/useInput';
import AppLayout from '../../components/AppLayout';


const ReactQuill = dynamic(async () => {
  const { default: RQ } = await import('react-quill');
  return function comp({ forwardedRef, ...props }) {
    return <RQ ref={forwardedRef} {...props} />;
  };
}, { ssr: false });

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const ReactQuillContainer =({ description, setDescription,title,setTitle}) =>{
  const quillRef = useRef();
  const dispatch = useDispatch();
  
  const {img} = useSelector((state) => state.post)
  console.log(img)

  
  const onSubmit = () =>{
    console.log(quillRef.current.state.value)
  
    const value =document.getElementsByName('title')
   console.log(value[0].value)
 /*    dispatch({ 
      type: NOTICE_CREATE_REQUEST,
      data: {
        userId: userId,
        title: title,
        content: quillRef.current.state.value,
      }
    }) */
  
  }

  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute("name", "files");
    document.body.appendChild(input);
    input.click();
  
    input.onchange = async (e) => {
      const imageFormData = new FormData();

      [].forEach.call(e.target.files,(files) =>{
        imageFormData.append('files',files)
      });
      const result = await axios.post(`http://localhost:8080/api/file/upload`, imageFormData)
      console.log(result)
      dispatch({
        type: IMAGE_PREVIEW_REQUEST,
        data: result.data[0]
      })
      // 현재 커서 위치에 이미지를 삽입하고 커서 위치를 +1 하기
      const range = quillRef.current.getEditorSelection();
      quillRef.current.getEditor().insertEmbed(range.index, 'image', result.data[0])
      quillRef.current.getEditor().setSelection(range.index + 1);
      document.body.querySelector(':scope > input').remove()
    };
  }

  // useMemo를 사용한 이유는 modules가 렌더링마다 변하면 에디터에서 입력이 끊기는 버그가 발생
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
      handlers: { image: imageHandler }
    }
  }), []);
  
  return (
    <AppLayout>
          <Form
    onFinish={onSubmit}>
      <label htmlFor="">제목:</label>
      <input type="text" name="title" id="" value={title} onChange={setTitle}/>
         <ReactQuill
      forwardedRef={quillRef}
      placeholder="본문을 입력하세요..."
      modules={modules}
      formats={formats}
      value={description}
      onChange={setDescription}
    />
    <Button htmlType='submit'>전송</Button>
    </Form>
    </AppLayout>

 
  );
}

export default ReactQuillContainer;