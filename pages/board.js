import React, {useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {END} from 'redux-saga';
import wrapper from '../store/configureStore';
import axios from 'axios'
import Link from 'next/link';
import AppLayout from "../components/AppLayout";
import BoardList from "../components/BoardList";
import { BOARDS_PAGING_REQUEST, BOARDS_REQUEST, NOTICELIST_REQUEST } from '../reducers/post';
import { Button, Pagination,  Input, Select,} from 'antd';
import { LOAD_USER_REQUEST } from '../reducers/user';
import MyButton from '../components/MyButton';
import useInput from '../hooks/useInput';
import Router from 'next/router'

const Board = () =>{

    const dispatch = useDispatch();
    const {board}  = useSelector((state) => state.post)
    const {state} = useSelector((state) => state.post);
    const {pageable} = useSelector((state) => state.post);
    const [searchInput, onChangeSearchInput] = useInput('');



    const selectBefore = (
        <Select defaultValue="제목" className="select-before">
          <Option value="제목">제목</Option>
          <Option value="해시태그">해시태그</Option>
        </Select>
      );
 
   
 
    
    const onChange = useCallback((pageNumber) => {
            
        dispatch({
            type: BOARDS_REQUEST,
            data: pageNumber

            
        })

        

    },[board])

    
    const onSearch = useCallback(() =>{
        
        /*  동적라우팅 => 알아서 주소로 가서 서버사이드 렌더링 (getsersideprops실행)*/
        Router.push(`/board/${searchInput}`)
      },[searchInput])

    return (
        <AppLayout>
            {board.map((board) => <BoardList data={board}/>)} 
            <div style={{width: '100%',textAlign:'center'}}>
            <Pagination
            total={50}
            onChange ={onChange}
            />
            <div style={{ textAlign:'center' }}>
            <Input.Search 
                addonBefore={selectBefore}
                style ={{width: '300px'}}
                enterButton
                value={searchInput}
                onChange={onChangeSearchInput}
                onSearch={onSearch}/>
            <Link href={`/create/board`}>
                <MyButton text={'글쓰기'} type={'positive'}/>
            </Link>
            </div>
            </div>
          
            
            
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
        type: BOARDS_REQUEST
     });
     store.dispatch({
        type: LOAD_USER_REQUEST
     }); 
     store.dispatch({
        type: NOTICELIST_REQUEST
     });
 
    store.dispatch(END);
    await store.sagaTask.toPromise();

})

export default Board;