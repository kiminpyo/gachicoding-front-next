import React, {memo, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {END} from 'redux-saga';
import wrapper from '../store/configureStore';
import axios from 'axios'

import AppLayout from '../components/AppLayout';
import LoginForm from '../components/LoginForm';
import { LOAD_USER_REQUEST, LOG_IN_REQUEST } from '../reducers/user';
import { BOARDS_REQUEST, NOTICELIST_REQUEST, QNAS_REQUEST } from '../reducers/post';
import { Row,Col } from 'antd';

import MainQna from '../components/MainQna';
import MainBoard from '../components/MainBoard';
import MainNotice from '../components/MainNotice';
const Home = () =>{
    const {board} = useSelector((state) => state.post)
    const {notice} = useSelector((state) => state.post)
    const {qna} = useSelector((state) => state.post)
     return(
        <AppLayout>
            <Row>
                <Col xs={24}  sm={24} md={24} xl={24} span={24}>
                <div style={{width:'100%', height: '300px'}}>
                <div style={{width:'95%',border:'1px solid black',height:'20%',display:'flex',justifyContent: 'space-between'}}>
                    <div style={{marginLeft:'20px'}}>가치고민</div>
                    <div style={{marginRight:'20px'}}>+더보기</div>
                </div>
                
                <div style={{width:"95%",border: '1px solid black', height: '80%',}}>
                {qna && qna.map((v,i) => <MainQna data={v}/>)}
                <div style={{textAlign:'center'}}>더보기</div>
                </div>
    </div>
              
                </Col>
                <Col xs={24}  sm={24} md={12} xl={12} span={12}>
                <MainNotice data={notice?.notice}/>
                </Col>
                <Col xs={24}  sm={24} md={12} xl={12} span={12}>
                <MainBoard data={board?.board}/>
                </Col>
            </Row>
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
        type: LOAD_USER_REQUEST
     }); 
     store.dispatch({
        type: NOTICELIST_REQUEST
    });
    store.dispatch({
        type: QNAS_REQUEST,
        
      })
      store.dispatch({
        type: BOARDS_REQUEST
     });
 
    store.dispatch(END);
    await store.sagaTask.toPromise();

})


export default Home;