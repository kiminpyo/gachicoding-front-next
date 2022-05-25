import React,{useCallback, useRef, useState} from 'react'

import AppLayout from "../../components/AppLayout";
import useInput from "../../hooks/useInput";
import {Form, Input, Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BOARD_CREATE_REQUEST, IMAGE_UPLOAD_REQUEST, IMAGE_UPLOAD_SUCCESS, uploadImage } from '../../reducers/post';
import ImagePreview from '../../components/ImagePreview';
const CreateBoard = () =>{

    const imgInput = useRef();
    const [title, onChangetitleHandler] = useInput('')
    const [text, onChangeCotentHandler] = useInput('')
    const dispatch = useDispatch();
    const {img} = useSelector((state) => state.post);
    console.log(img);
    const onSubmitForm = useCallback(() => {

        if(!text || !text.trim()){
            return alert('게시글을 작성하세요')
        }

            dispatch({
                    type: BOARD_CREATE_REQUEST,
                    data: {          
                        
                        boardTitle: title,
                        boardContent: text,
                        files: img,
                    }
            })
            
        
    },[text])

     
    

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
                
                console.log(imageFormData)
            },[])

           
      
         
        

    return (
        <AppLayout>
            
            <Form
            encType="multipart/form-data" 
            onFinish={onSubmitForm}>
              <div style={{width:"100%", display:'flex', flexDirection: 'column'}}>
              <label htmlFor="">제목:</label>
            <input type="text" value ={title}  onChange={onChangetitleHandler}/>
            <br/>
            <label htmlFor="">해시태그</label>
            <input type="url" name="" id="" />

            <label htmlFor="">내용:</label>
            <textarea name="content" id="" cols="30" rows="10" value={text} onChange={onChangeCotentHandler}>  
            </textarea>
            <div style={{textAlign:'center', paddingTop:'30px'}}><h2>미리보기</h2></div>
            <div style={{display:'flex', padding:'30px', width:'100%'}}> 
            { img ?  img.map((v,i) => <ImagePreview key={i} data={v}/>): null}
            </div>
            </div> 
                  
        <Button type="primary" htmlType="submit">글쓰기</Button>
        </Form>
        <form action="post"
        encType="multipart/form-data" >
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

export default CreateBoard;