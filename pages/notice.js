import React, {useEffect,useState, useCallback} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {END} from 'redux-saga';
import wrapper from '../store/configureStore';
import axios from 'axios'
import Link from 'next/link';
import { Button, Pagination,  Input, Select,} from 'antd';
import NoticeList from '../components/NoticeList';
import AppLayout from '../components/AppLayout';
import { NOTICELIST_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';
import MyButton from '../components/MyButton';
import Router from 'next/router'
import useInput from '../hooks/useInput';

const Notice = () => {

  const [searchInput, onChangeSearchInput] = useInput('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const {notice}  = useSelector((state) => state.post)

  console.log(notice)
  
  const selectBefore = (
    <Select defaultValue="제목" className="select-before">
      <Option value="제목">제목</Option>
      <Option value="해시태그">해시태그</Option>
    </Select>
  );
    const onChange = useCallback((pageNumber) => {
              
      dispatch({
          type: NOTICELIST_REQUEST,
          data: pageNumber

          
      })

      

  },[notice]) 
    const onSearch = useCallback(() =>{
            
      /*  동적라우팅 => 알아서 주소로 가서 서버사이드 렌더링 (getsersideprops실행)*/
      Router.push(`/notice/${searchInput}`)
    },[searchInput])


    return (
      <AppLayout>
     {notice && notice.map((data) => <NoticeList key={data.notIdx} data={data}/>)}
     
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
            <Link href={`/create/notice`}>
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
      type: NOTICELIST_REQUEST
   });
 
 store.dispatch({
  type:LOAD_USER_REQUEST
}); 
  store.dispatch(END);
  await store.sagaTask.toPromise();
})
export default Notice;