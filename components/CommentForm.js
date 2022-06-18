import React,{useCallback,useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useSelector, useDispatch} from 'react-redux'
import {Form, Input,Button} from 'antd'
import useInput from '../hooks/useInput'


const CommentForm = ({data}) => {
    const dispatch = useDispatch();
    const [commentText, onChangeComment, setCommentText] = useInput('')

    
    const onSubmitComment =() =>{
        console.log(commentText)
        if(commentText.length === 0){
            alert('댓글 다세요')
            return ;
        }else{
           dispatch({
               type: ADD_
           })
        }
        
    }

  return (
      <div>
     <Form onFinish={onSubmitComment}>
        <Form.Item>
            <Input.TextArea value={commentText} onChange={onChangeComment} rows={3}/>
            <Button  
                style={{position: 'absolute', right: 0, bottom: -40, zIndex: 1}}
                type="primary"
                htmlType="submit"
                >삐약</Button>
        </Form.Item>
    </Form> 
      </div>
     
  )
}

CommentForm.prototype = {
    post: PropTypes.string.isRequired,
}

export default CommentForm;