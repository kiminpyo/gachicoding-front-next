import React, {useEffect, useRef, useCallback, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {END} from 'redux-saga';
import wrapper from '../../store/configureStore';
import axios from 'axios'
import { useRouter } from 'next/router';
import {Form, Button} from 'antd'
import ImagePreview from '../../components/ImagePreview';
import AppLayout from '../../components/AppLayout';
import { BOARDS_DETAIL_REQUEST, BOARD_EDIT_REQUEST, IMAGE_UPLOAD_REQUEST } from '../../reducers/post';
import BoardEditor from '../../components/BoardEditor';
import Link from 'next/link';
import useInput from '../../hooks/useInput';
const edit = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;
    const imgInput = useRef();
   
    const {img} = useSelector((state) => state.post);
    const {board}  = useSelector((state) => state.post);
   
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
  
        useEffect(() =>{
            if(board){
                setTitle(board.boardTitle)
                setText(board.boardContent)
            }
    },[board])
         
   
    
  
    console.log(board)
    console.log(board.boardTitle)
    
  
    useEffect(()=>{
        dispatch({
            type: BOARDS_DETAIL_REQUEST,
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
    const onClickImageUpload = useCallback(() =>{
        imgInput.current.click();
    },[imgInput.current])

    const onChangeImages =useCallback((e) =>{
        console.log('images', e.target.files)
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (files)=>{
            imageFormData.append('files', files)        
        });
            dispatch({
            type: IMAGE_UPLOAD_REQUEST,
            data: imageFormData
            })    
        },[])
        
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
            { img ?  img.map((v,i) => <ImagePreview key={i} data={v}/>): null}
            </div>
            </div> 
                  
        <Button type="primary" htmlType="submit">수정하기</Button>
        </Form>
        <form action="post"
        enctype="multipart/form-data" >
        <input
            type= "file"
            name="files" 
            multiple 
            hidden 
            accept="image/*"
            ref={imgInput}
            onChange={onChangeImages} />
            <Button onClick={onClickImageUpload}>이미지 업로드</Button>
           
        </form>
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
  

  store.dispatch(END);
  await store.sagaTask.toPromise();
})
export default edit;