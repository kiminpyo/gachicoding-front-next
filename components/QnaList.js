import React from 'react'
import Link from 'next/link';
const QnaList = ({data}) => {

    console.log(data)
  

  return (
    <div style={{display: 'flex', justifyContent:'space-around', margin:'30px'}}>
    <div>{data.userIdx.length > 5 ? data.userIdx.slice(0,5) : data.userIdx}</div>
     <div><Link href={`/qnaDetail/${data.userIdx}`}><a >{data.questionTitle.length > 30 ? data.questionTitle.slice(0,30) : data.questionTitle}</a></Link></div>
     <div>{data.questionView}</div>
       
    </div>
  )
}

export default QnaList