import React, {useEffect,useState, useCallback} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {END} from 'redux-saga';
import wrapper from '../store/configureStore';
import axios from 'axios'
import Link from 'next/link';
import {Button, Form} from 'antd'
import NoticeList from '../components/NoticeList';
import AppLayout from '../components/AppLayout';
import { BOARDS_REQUEST, NOTICELIST_REQUEST } from '../reducers/post';




const Notice = () => {


  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const {notice}  = useSelector((state) => state.post)

  console.log(notice)



    return (
      <AppLayout>
       {/*  {notice.map((data) => <NoticeList key={data.notIdx} data={data}/>)} */}
     
  
       <Button><Link href={'/create/notice'}>글쓰기</Link></Button>
      </AppLayout>
  
    )
  
}
/* context안에 store가 들어있다. */
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
    type: BOARDS_REQUEST
 });

  store.dispatch(END);
  await store.sagaTask.toPromise();
})
export default Notice;