import React,{useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import { QNAS_REQUEST } from '../reducers/post';
import QnaList from '../components/QnaList';

const Qna = () => {
  
    const dispatch = useDispatch();
    const {qna} = useSelector((state) => state.post);

    console.log(qna)

    useEffect(() =>{

        dispatch({
            type: QNAS_REQUEST
        })
    },[])
    return (
        <AppLayout>
               {qna && qna.map((v) => <QnaList key={v.userIdx} data={v.qnaList}/>)}
        </AppLayout>
  )
}


export default Qna