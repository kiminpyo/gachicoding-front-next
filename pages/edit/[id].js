import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {END} from 'redux-saga';
import wrapper from '../../store/configureStore';
import axios from 'axios'
import { useRouter } from 'next/router';


import AppLayout from '../../components/AppLayout';
import { BOARDS_DETAIL_REQUEST, BOARDS_REQUEST, NOTICELIST_REQUEST } from '../../reducers/post';
import BoardEditor from '../../components/BoardEditor';
import Link from 'next/link';
const edit = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;
    const {board}  = useSelector((state) => state.post);
    

   
    useEffect(()=>{
        dispatch({
            type: BOARDS_DETAIL_REQUEST,
            data: id
        })
        
    },[id])


 
    if(board){
        return (
        <AppLayout>
            <BoardEditor data={board}/>
        </AppLayout>
        )
    }else{
        return <AppLayout>
            대기중..
        </AppLayout>
    }
   
 

  
}
/* context안에 store가 들어있다. */
export const getServerSideProps = wrapper.getServerSideProps((store)=> async({req}) => {
  
  const cookie = req ? req.headers.cookie : '';
  
  axios.defaults.headers.Cookie = '';
  /* 쿠키가 있고, 서버에 요청을 할 때만 넣는다. (다른사람의 내 쿠키 공유 문제 제거. 굉장히 중요하다) */
  if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
  

  store.dispatch(END);
  await store.sagaTask.toPromise();
})
export default edit;