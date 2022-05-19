import React, {useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {END} from 'redux-saga';
import wrapper from '../../store/configureStore';
import axios from 'axios'
import { useRouter } from 'next/router';


import AppLayout from '../../components/AppLayout';
import { BOARDS_DETAIL_REQUEST, BOARDS_REQUEST, BOARD_DELETE_REQUEST, BOARD_EDIT_REQUEST, NOTICELIST_REQUEST } from '../../reducers/post';
import BoardEditor from '../../components/BoardEditor';
import Link from 'next/link';
import MyButton from '../../components/MyButton';
const detail = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    /* 게시판 번호불러오기 */
    const { id } = router.query;
    const {board}  = useSelector((state) => state.post);


    useEffect(()=>{
        dispatch({
            type: BOARDS_DETAIL_REQUEST,
            data: id
        })
        
    },[id])

     const onDeleteBoard = useCallback(()=>{
        
        const result = confirm('삭제하시겠습니까?')
        if(result){
            dispatch({
                type: BOARD_DELETE_REQUEST,
                data: id
            })
        
        }else{
            return;
        }
            

    },[]) 

 

    if(board){

        return <AppLayout>
            <div>{board.boardTitle}</div>  
            <div dangerouslySetInnerHTML={{ __html: board.boardContent }}></div>   
            
              <Link href={`/edit/${id}`} >
                  <MyButton text={'수정'} type={'positive'} data={board}/>
              </Link>
              <MyButton onClick={onDeleteBoard} text={'삭제'} type={'negative'}></MyButton>
       
                 
        </AppLayout>
    }else{
        
        return <div>hi</div>
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
export default detail;