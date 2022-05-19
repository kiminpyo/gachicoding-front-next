import React,{useCallback, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import {Form, Input, Button, Avatar} from 'antd';
import useInput from '../hooks/useInput';
import { BOARD_EDIT_REQUEST } from '../reducers/post';
import { useDispatch } from 'react-redux';

const BoardEditor = ({data}) =>{
    console.log(data)
    console.log(data.boardIdx)
    console.log(data.boardContent)
   
    const dispatch = useDispatch();
    
    const [text, setText] = useState('')
  
     const onChangeHandler =(e) =>{
        console.log(e.target.value)
        setText(e.target.value)
    }
    const onSubmitForm = useCallback(() =>{
     
      
        dispatch({
            type: BOARD_EDIT_REQUEST,
            data: {
                boardIdx: data.boardIdx,
                boardTitle:"서영준입니다",
                boardContent: text
            }
        })
    },[text])
return(
    <div>
        <Form onFinish={onSubmitForm}>
        <textarea name="" id="" cols="30" rows="10" value={text} onChange={onChangeHandler}/>
            <Button type="primary" htmlType="submit">수정하기</Button>
   </Form>


    </div>
)
}

BoardEditor.propTypes ={
   
}
export default BoardEditor;
