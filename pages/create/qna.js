import React,{useState, useCallback} from 'react'
import {Form , Button} from 'antd';
import useInput from '../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { QNA_CREATE_REQUEST } from '../../reducers/post';
import AppLayout from '../../components/AppLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import {END} from 'redux-saga';
import wrapper from '../../store/configureStore';
import { LOAD_USER_REQUEST } from '../../reducers/user';
const CreateQna = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const [title, onChangeTitle] =useInput('');
  const [content, onChangeContent] = useInput('');
  const [error, onChangeError] = useInput('');
  
  const {user} = useSelector((state) => state.user);
 
  const onSubmitForm = useCallback(() => {
    dispatch({
      type: QNA_CREATE_REQUEST,
      data: {
        queCategory: "string",
      queContent: content,
      queError: error,
      queTitle: title,
      userEmail:  user.userEmail
      }
    })
  
  
  },[title,content,error])
  

  return (
   <AppLayout>
        <Form
         onFinish={onSubmitForm}
        >
        <label htmlFor="">타이틀</label>
             <input type="text" value={title} onChange={onChangeTitle} />

             <label htmlFor="">내용</label>
             <textarea type="text" value={content} onChange={onChangeContent} />

             <label htmlFor="">에러코드</label>
             <textarea type="text" value={error} onChange={onChangeError} />
             
        <Button type="primary" htmlType="submit">글쓰기</Button>

        </Form>
        </AppLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store)=> async({req}) => {

  const cookie = req ? req.headers.cookie : '';
  
  axios.defaults.headers.Cookie = '';
  /* 쿠키가 있고, 서버에 요청을 할 때만 넣는다. (다른사람의 내 쿠키 공유 문제 제거. 굉장히 중요하다) */
  if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

 store.dispatch({
  type:LOAD_USER_REQUEST
}); 
  store.dispatch(END);
  await store.sagaTask.toPromise();
})
export default CreateQna