import React, {useEffect, useCallback, useState, useMemo} from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import { ADD_ANSWER_REQUEST, ANSWER_DETAIL_REQUEST, QNA_DETAIL_REQUEST } from '../../reducers/post';
import userSage from '../../sagas/user';
import {Button, Form} from 'antd'
import useInput from '../../hooks/useInput';
import QuestionContent from '../../components/QuestionContent';
import AnswerContent from '../../components/AnswerContent';
import { Space,BackTop  } from 'antd'
import {END} from 'redux-saga';
import wrapper from '../../store/configureStore';
import axios from 'axios'
import { LOAD_USER_REQUEST } from '../../reducers/user';
import CommentForm from '../../components/CommentForm';

 const QnaDetail = () =>{
    const dispatch = useDispatch();
    const router = useRouter();
    const {id} = router.query;
    const {qnaDetail} =useSelector((state) =>state.post)
    const answerList =useSelector((state) => state.post.qnaDetail?.answerList)
    const {user}  =useSelector((state) =>state.user)
  
    const [answer , setAnswer] = useState(!answer);
    const [commentAnswer, setCommentAnswer] = useState('');
    
    const onChangeCommentAnswer = (e) =>{
        setCommentAnswer(e.currentTarget.value)
 
    }
    


    useEffect(() =>{

        dispatch({
            type: QNA_DETAIL_REQUEST,
            data: id
        })
       
    
    },[])
    
    const onClickAnswer =() =>{
    
        setAnswer(!answer)
        
    
    }
        /* 답변 */
    const onSubmit = () =>{
        /* 글자가 없을 때 */
        if(commentAnswer.trim() === ""){
            return alert('내용을 입력하세요')
        }
        /* 질문자가 답변할 때 */
        if(user.userEmail === qnaDetail.userEmail){
            return alert('질문자는 답변할 수 없습니다.')
        }
            /* 답변하기 버튼을 누를 때 */
        const confirmAnswer = confirm('등록하시겠습니까?')
            /* 답변 전송 */
        if(confirmAnswer){
            console.log(commentAnswer)
            dispatch({
                type: ADD_ANSWER_REQUEST,
                data: {
                    ansContent:commentAnswer, 
                    queIdx: id,
                    userEmail: user.userEmail
            
                }
        
            })
            /* 답변 창을 닫기 + 답변내용 지우기 */
            console.log('hi')
            setAnswer(!answer)
            setCommentAnswer('')
            /* 게시글 다시 request */
            dispatch({
                type: QNA_DETAIL_REQUEST,
                data: id
            })
     
       
        }else{
            return;
        }

    }
        return (
            <AppLayout 
            >
                {/* question부터 답변달기 글까지 width값 */}
                <div style={{width:'80%', marginLeft:'10%'}}>
                <QuestionContent key={qnaDetail.queIdx} data={qnaDetail} />
          
                <div style={{fontSize:'13px'}}>댓글달기</div>
              {/*   <CommentForm/>   */}

                <div>
                
                <Button value={answer} onClick={onClickAnswer}>답변하기</Button>
                </div>
                {!answer && 
                <Form
                onFinish={onSubmit}>   
                    <input  
                    type="text"
                    value={commentAnswer} 
                    onChange={onChangeCommentAnswer}
                    placeholder='답변을 입력하세요'/>
                    <Button type="primary" htmlType="submit" value={answer}>답글달기</Button>
                </Form>
                }
        
        
            <br />
            <div>
                {answerList && answerList.length >=1 
                ? answerList.length +"개의 답변이 달렸습니다" 
                :"답변이 없습니다"}
             </div>
            {answerList && answerList.map((v) => <AnswerContent key={v.ansIdx} data={v} queSolve={qnaDetail.queSolve} />)} 
            </div>
            </AppLayout>
        )
    

}
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


 
 export default QnaDetail;