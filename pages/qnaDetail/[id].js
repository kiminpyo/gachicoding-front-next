import React, {useEffect, useCallback} from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import { QNA_DETAIL_REQUEST } from '../../reducers/post';
import userSage from '../../sagas/user';

 const QnaDetail = () =>{
    const dispatch = useDispatch();
    const router = useRouter();
    const {id} = router.query;
    const {qna} = useSelector((state) => state.post)

  
        console.log({id})
    useEffect(() =>{
        dispatch({
            type: QNA_DETAIL_REQUEST,
   
        })
        
   
    },[])
    if(qna){
        
    console.log(qna.map((v) => v.qnaList))
    const qnaList = qna.map((v) => v.qnaList);
    const qnaDetail = qna.map((v) => v.qnaDetail);
    console.log(qnaDetail)
 
    const findContent = qnaList.filter((v) => v.userIdx === id )
    console.log(findContent)
        return (
            <AppLayout>
                {findContent.questionTitle}
                {findContent.questionView}
            </AppLayout>
        )
    }

    return(
          <AppLayout>
              
          </AppLayout>
    )
 }
 export default QnaDetail;