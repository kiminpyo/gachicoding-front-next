import React,{useMemo, memo, useRef, useState, useCallback, useEffect} from 'react'

import axios from 'axios';
import {Form, Button, Input} from 'antd'
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { BOARD_CREATE_REQUEST, imageUpload, IMAGE_PREVIEW_REQUEST, IMAGE_UPLOAD_REQUEST, NOTICELIST_REQUEST, NOTICE_CREATE_REQUEST } from '../../reducers/post';
import useInput from '../../hooks/useInput';
import AppLayout from '../../components/AppLayout';

import {END} from 'redux-saga';
import wrapper from '../../store/configureStore';
import { LOAD_USER_REQUEST } from '../../reducers/user';


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

const ReactQuillContainer = ({ description, setDescription,title,setTitle, tag,}) =>{
  const quillRef = useRef();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user)
  const [hashtag, setHashtag] =useState([]);
  const submitTag =(e) =>{
  
    const value = document.getElementsByName('tag');
    console.log(value[0].value)
    const $outer = document.querySelector('.tagouter')
    const $tagList = document.createElement('div');
    $tagList.style= "display: flex"
    $tagList.className = 'tagListClass'
  
    if(value[0].value.trim() !== '' || value[0].value.length < 6 ){
        console.log('key입력됨')
      $tagList.innerHTML = '#' + value[0].value
      $outer?.appendChild($tagList)
      setHashtag((hash) => [...hash, value[0].value])
      
      console.log(hashtag)
      if(hashtag.length > 3){
        console.log('3보다 많다')
        return;
      }
      return value[0].value = ''
      }
      return value[0].value = ''
  }

  
  
  /* input.onCange시 렌더가 다시되면서 dsecription이 지워져 value값 잡고있기 */
 if(quillRef.current){
  description = quillRef.current.state.value
   console.log('hi')
 }else{
   
   console.log('bi')
 }
 const tagListClass = ""
  const onSubmit = () =>{
    console.log(quillRef.current.state.value)
    const value =document.getElementsByName('title')
    console.log(value[0].value)
    if(  user.userEmail || quillRef.current.state.value){
      const data = {
        
        userEmail: user.userEmail,
        boardTitle: value[0].value,
        boardContent: quillRef.current.state.value,
        tags: hashtag
      }
       dispatch({ 
        type: NOTICE_CREATE_REQUEST,
        data: data 
      }) 
    }
  
  
  }

  const imageHandler = (e) => {
  console.log(quillRef.current.state)
  console.log(quillRef.current.getEditor())
  console.log(quillRef.current.isDelta)
  console.log(quillRef.current.props.value)
  console.log(quillRef.current.state)
  console.log(typeof quillRef.current.state.value)
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    document.body.appendChild(input);
    input.click(e);
 
    input.onchange = async(e) => {
      console.log(e)
      console.log(e.preventDefault)
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

      console.log(quillRef.current.state)
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
      <Input style={{width:'300px'}} type="text" name="title" id="" value={title} onChange={setTitle}/>
      <br />
      <Form 
    
      onFinish={submitTag}>
      <label htmlFor="">해시태그:</label>
      <Input style={{width:'100px' }} type="text" name="tag" id="" value={tag} />
      <Button htmlType='submit'>등록</Button>
      </Form>
      <div className='tagouter' style={{display:'flex'}}></div>
    

         <ReactQuill
      forwardedRef={quillRef}
      placeholder="본문을 입력하세요..."
      modules={modules}
      formats={formats}
      value={description || ""}
      onChange={setDescription}
    />
    <Button htmlType='submit'>전송</Button>
    </Form>
    </AppLayout>

 
  );
}
export const getServerSideProps = wrapper.getServerSideProps((store)=> async({req}) => {

  const cookie = req ? req.headers.cookie : '';
  
  axios.defaults.headers.Cookie = '';
  /* 쿠키가 있고, 서버에 요청을 할 때만 넣는다. (다른사람의 내 쿠키 공유 문제 제거. 굉장히 중요하다) */
  if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
  store.dispatch({
      type: NOTICELIST_REQUEST
   });
 
 store.dispatch({
  type:LOAD_USER_REQUEST
}); 
  store.dispatch(END);
  await store.sagaTask.toPromise();
})
export default ReactQuillContainer;