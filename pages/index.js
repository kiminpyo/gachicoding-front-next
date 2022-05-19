import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {END} from 'redux-saga';
import wrapper from '../store/configureStore';
import axios from 'axios'

import AppLayout from '../components/AppLayout';
import LoginForm from '../components/LoginForm';
import { LOAD_USER_REQUEST, LOG_IN_REQUEST } from '../reducers/user';

const Home = () =>{
    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.user)

    
 
    if(userInfo){
       
        return (
            <AppLayout>
                <div>반갑습니다 {userInfo}님</div>
        </AppLayout>
            )
        
    }else{
     
   
        return (
            <AppLayout>
                <LoginForm/>
            </AppLayout>
          
            )
    }
   
}
export const getServerSideProps = wrapper.getServerSideProps((store)=> async({req}) => {
    
    const cookie = req ? req.headers.Cookie : '';
  
    axios.defaults.headers.Cookie = '';
    /* 쿠키가 있고, 서버에 요청을 할 때만 넣는다. (다른사람의 내 쿠키 공유 문제 제거. 굉장히 중요하다) */
    if (req && cookie) {
       axios.defaults.headers.Cookie = cookie;
      }
       
      store.dispatch({
        type: LOAD_USER_REQUEST,
        
     });
  
    store.dispatch(END);
    await store.sagaTask.toPromise();
  })


export default Home;