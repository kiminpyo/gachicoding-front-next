import React,{useEffect, useCallback, memo, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import { QNAS_REQUEST } from '../reducers/post';
import QnaList from '../components/QnaList'
import Link from 'next/link';
import {Button , Input, Pagination, Select } from 'antd'
import  { useRouter } from 'next/router';
import useInput from '../hooks/useInput';
import {END} from 'redux-saga';
import wrapper from '../store/configureStore';
import axios from 'axios'
import { LOAD_USER_REQUEST } from '../reducers/user';
import MyButton from '../components/MyButton';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite'
import QnaAppLayout from '../components/QnaAppLayout'
import { ConsoleSqlOutlined } from '@ant-design/icons';
const { Option } = Select;


const selectBefore = (
    <Select defaultValue="제목" className="select-before">
      {/* <Option value="제목">제목</Option>
      <Option value="해시태그">해시태그</Option> */}
    </Select>
  );
  const fetcher = (url) => axios.get(url, {withCredentials:true})
  .then((res) => res.data)
const Qna = () => {

    const {user} = useSelector((state) => state.user)
    const router = useRouter();
    const dispatch = useDispatch();
    const {qna} = useSelector((state) => state.post);
    const [searchInput, onChangeSearchInput] = useInput('');
   const [pageNum, setPageNum] = useState(1);
    const {qnaList} = useSelector((state)=>state.post) 


   
/*     const {data ,error } = useSWR(`http://localhost:8080/api/question/list?page=${pageNumber}&size=12`, fetcher); */
/*     console.log(data) */
    const handleScroll = useCallback(() =>{
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      console.log(scrollHeight, scrollTop,clientHeight)
      console.log(scrollTop + clientHeight+1, scrollHeight)
      if(scrollTop + clientHeight + 1>= scrollHeight === true){
        dispatch({
          type : QNAS_REQUEST,
          data: pageNum
        })
         return setPageNum(pageNum + 1)
      }
   
    },[pageNum])    
  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  });
      const handleChange = (value) => {
        console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
      };

    const onSearch = useCallback(() =>{   
        /*  동적라우팅 => 알아서 주소로 가서 서버사이드 렌더링 (getsersideprops실행)*/
        router.push(`/qna/${searchInput}`)
      },[searchInput])
    
      /* const onClickLoadMore = () =>{
   
        console.log(pageNum)
        dispatch({
          type: QNAS_REQUEST ,
          data: pageNum
        })
        return setPageNum(pageNum+1)
      }
   */
    return (
        <QnaAppLayout>
             <div style={{width: '100%',textAlign:'center'}}>
             
              <div style={{textAlign:'end'}}>
              <Input.Search 
              addonBefore={selectBefore}
              style ={{width: '300px'}}
              enterButton
              value={searchInput}
              onChange={onChangeSearchInput}
              onSearch={onSearch}/>
            <Link href={`/create/qna`}>
              <MyButton text={'글쓰기'} type={'positive'}/>
          </Link>
              </div>
              
            </div>
        { qna && qna.map((v) => <QnaList data={v}/>) }

         
            
        </QnaAppLayout>
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
        type: QNAS_REQUEST,
        
      })
     store.dispatch({
        type: LOAD_USER_REQUEST
     }); 
 
    store.dispatch(END);
    await store.sagaTask.toPromise();

})

export default Qna;