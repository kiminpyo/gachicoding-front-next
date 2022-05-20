import React, {useEffect, useCallback, useState} from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import { ADD_ANSWER_REQUEST, QNA_DETAIL_REQUEST } from '../../reducers/post';
import userSage from '../../sagas/user';
import {Button, Form} from 'antd'
import useInput from '../../hooks/useInput';
 const QnaDetail = () =>{
    const dispatch = useDispatch();
    const router = useRouter();
    const {id} = router.query;
    const {qna} = useSelector((state) => state.post)
   console.log(qna)
    console.log(id)
    const [answer , setAnswer] = useState(!answer);
    const [commentAnswer, onChangeCommentAnswer] = useInput('')
    const [commentTitle, onChangeCommentTitle] = useInput('')
    if(qna){
      const findContent =  qna.filter((v) => v.qnaIdx === id);
    const detail = findContent.map((v) => v.qnaDetail);
    console.log(detail)
       const title = detail.map((v) => v.title);
       const content = detail.map((v) => v.content)
        console.log(title)
    const answerList= findContent.map((v) =>v.answer )
    console.log(answerList[0])
    const onClickAnswer =() =>{
        setAnswer(!answer)
    
    }
    
    const onSubmit =() =>{
        console.log({commentAnswer,commentTitle, id })
        dispatch({
            type: ADD_ANSWER_REQUEST,
            data: {
                content :commentAnswer, 
                title: commentTitle,
                id
            }
     
        })
        setAnswer(!answer)
    }
        return (
            <AppLayout>
                {findContent.map((v) => <div key={v.qnaIdx}>{v.qnaIdx}</div>)}
                {detail.map((v) => <div>
                    <div>{v.title}</div>
                    <div>{v.content}</div>
                </div> )}

            <div>
                
                <Button value={answer} onClick={onClickAnswer}>답변하기</Button>
                {!answer && 
                <Form
                onFinish={onSubmit}>
                    <label htmlFor="">제목:</label>
                    <input type="text" value ={commentTitle} onChange={onChangeCommentTitle}/>
                    <textarea  
                    cols="50" 
                    rows="10"
                    value={commentAnswer} 
                    onChange={onChangeCommentAnswer}
                    placeholder='답변을 입력하세요'></textarea>
                    <Button type="primary" htmlType="submit">답글달기</Button>
                </Form>}
                    
            </div>
            {answerList === null ? null: <div>{answerList[0].length}개의 답변이 달렸습니다.</div>}
            <br />
        {answerList === null ?  null:  answerList[0].map((v) =>
        <div>
            <div>답변:</div>
            <div>id: {v.userIdx}</div>
            <div>제목:{v.title}</div>
            <div>{v.content}</div>
        </div>)} 

            </AppLayout>
        )
    }

}


 
 export default QnaDetail;