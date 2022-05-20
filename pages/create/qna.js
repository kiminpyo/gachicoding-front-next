import React,{useState, useCallback} from 'react'
import {Form , Button} from 'antd';
import useInput from '../../hooks/useInput';
import { useDispatch } from 'react-redux';
import { QNA_CREATE_REQUEST } from '../../reducers/post';
import AppLayout from '../../components/AppLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CreateQna = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [title, onChangeTitle] =useInput('');
  const [content, onChangeContent] = useInput('');
  
 
  const onSubmitForm = useCallback(() => {
    dispatch({
      type: QNA_CREATE_REQUEST,
      data: {
        title,
        content,
      }
    })
    router.push('/qna')
  
  },[title,content])
  

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
             <input type="text" />
             
        <Button type="primary" htmlType="submit">글쓰기</Button>

        </Form>
        </AppLayout>
  )
}

export default CreateQna