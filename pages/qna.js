import React,{useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import { QNAS_REQUEST } from '../reducers/post';
import QnaList from '../components/QnaList';
import BoardEditor from '../components/BoardEditor';
import Link from 'next/link';
import {Button} from 'antd'
import  { useRouter } from 'next/router';

const Qna = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {qna} = useSelector((state) => state.post);
 
    console.log(qna)

    useEffect(() =>{

        dispatch({
            type: QNAS_REQUEST
        })
    },[qna])
  
    return (
        <AppLayout>
        {qna && qna.map((v) => <div onClick={()=>{ router.push(`/qnaDetail/${v.qnaIdx}`)}}>{v.userIdx}</div>)}
              <Button>
                  <Link href={`/create/qna`}>
                      <a >글쓰기</a>
                  </Link>
              </Button>
        </AppLayout>
  )
}


export default Qna