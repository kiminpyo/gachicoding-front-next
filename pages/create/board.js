import React,{useCallback, useRef, useState} from 'react'

import AppLayout from "../../components/AppLayout";
import useInput from "../../hooks/useInput";
import {Form, Input, Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BOARD_CREATE_REQUEST, IMAGE_UPLOAD_REQUEST, IMAGE_UPLOAD_SUCCESS, uploadImage } from '../../reducers/post';
import { ConsoleSqlOutlined } from '@ant-design/icons';
const CreateBoard = () =>{

    const imgInput = useRef();
    const [text, onChangeHandler] = useInput('')
    const dispatch = useDispatch();
    const {img} = useSelector((state) => state.post);
 
    const onSubmitForm = useCallback(() => {

        if(!text || !text.trim()){
            return alert('게시글을 작성하세요')
        }
        const formData = new FormData();
        console.log(img)
        const imgtext =  document.getElementById('img')
     
        const data = imgtext.innerHTML + text;
            dispatch({
                    type: BOARD_CREATE_REQUEST,
                    data: {          
                        boardContent: data,
                        boardTitle: "string",
                        boardViews: 0
                    }
            })
            
        
    },[text])

     
    

        const onClickImageUpload = useCallback(() =>{
            imgInput.current.click();
        },[imgInput.current])

        const onChangeImages =useCallback((e) =>{
            console.log('images', e.target.files)
            const imageFormData = new FormData();
            [].forEach.call(e.target.files, (file)=>{
                imageFormData.append('file', file)        
            });
                dispatch({
                type: IMAGE_UPLOAD_REQUEST,
                data: imageFormData
                })    
            },[])

           
      
           
        

    return (
        <AppLayout>
            
            <Form
            encType="multipart/form-data" 
            onFinish={onSubmitForm}>
              <div style={{width:"100%", display:'flex', flexDirection: 'column'}}>
              <label htmlFor="">제목</label>
            <input type="text" />
            <br/>
            <label htmlFor="">해시태그</label>
            <input type="url" name="" id="" />

            <label htmlFor="">내용</label>
            <textarea name="" id="" cols="30" rows="10" value={text} onChange={onChangeHandler}>
                
            </textarea>
                  </div> 
                 
        <div  id="img">
        { img ?  <img  src={img}/>: null}
        </div>
        <Button type="primary" htmlType="submit">글쓰기</Button>
        </Form>
        <form action="post"
        enctype="multipart/form-data" >
        <input
            type= "file"
            name="file" 
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

export default CreateBoard;