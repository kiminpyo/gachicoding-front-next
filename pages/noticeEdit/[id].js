import React, {useEffect, useRef, useCallback, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {END} from 'redux-saga';
import wrapper from '../../store/configureStore';
import axios from 'axios'
import { useRouter } from 'next/router';
import {Form, Button} from 'antd'
import ImagePreview from '../../components/ImagePreview';
import AppLayout from '../../components/AppLayout';
import { BOARDS_DETAIL_REQUEST, BOARD_EDIT_REQUEST, IMAGE_UPLOAD_REQUEST, NOTICE_DETAIL_REQUEST } from '../../reducers/post';
import BoardEditor from '../../components/BoardEditor';
import Link from 'next/link';
import useInput from '../../hooks/useInput';
import { LOAD_USER_REQUEST } from '../../reducers/user';
const noticeEdit = () => {
   
    const boardContent =useSelector((state)=> state.post.notice?.boardContent)

        /* 리듀서에 initialstate에 있는 단어는 렌더전에도 존재. 처음 렌더때 리듀서로 불러온 action.data는 렌더 후에 발생.
         => 바로 notice.boardContent를 찍으면 undefined가 발생*/
    
    useEffect(() =>{
       if(boardContent){setText(boardContent) }
           
    },[boardContent])
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    
  
    
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;
    const imgInput = useRef();
   
    useEffect(()=>{
        dispatch({
            type: NOTICE_DETAIL_REQUEST,
            data: id
        })
        
    },[id])
 
    const onSubmitForm = useCallback(() => {
        if(!text || !text.trim()){
            return alert('게시글을 작성하세요')
        }
            dispatch({           
                    type: BOARD_EDIT_REQUEST,
                    data: {          
                        boardIdx: id,
                        boardTitle: title,
                        boardContent: text,
                       
                    }
               
            })
            console.log({id,title,text})
        
    },[text,title])
        
        const onChangetitleHandler = useCallback((e) =>{
            setTitle(e.target.value)
        },[title])
        const onChangeCotentHandler= useCallback((e)=>{
            setText(e.target.value)
        },[text])
        return (
        <AppLayout>
           {/*  <BoardEditor data={board}/> */}
  
            
            <Form
            encType="multipart/form-data" 
            onFinish={onSubmitForm}>
              <div style={{width:"100%", display:'flex', flexDirection: 'column'}}>
              <label htmlFor="">제목:</label>
            <input type="text" value={title} onChange={onChangetitleHandler}/>
            <br/>
            <label htmlFor="">해시태그</label>
            <input type="url" name="" id="" />

            <label htmlFor="">내용:</label>
            <textarea name="" id="" cols="30" rows="10" value={text} onChange={onChangeCotentHandler}>  
            </textarea>
            <div style={{textAlign:'center', paddingTop:'30px'}}><h2>미리보기</h2></div>
            <div style={{display:'flex', padding:'30px', width:'100%'}}> 
         
            </div>
            </div> 
                  
        <Button type="primary" htmlType="submit">수정하기</Button>
        </Form>
       
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

  store.dispatch(END);
  await store.sagaTask.toPromise();
})
export default noticeEdit;