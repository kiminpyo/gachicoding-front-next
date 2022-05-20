import React from 'react'
import Link from 'next/link';
const QnaList = ({data}) => {

    console.log(data)
    console.log(data)
  
  return (
    <div style={{display: 'flex', justifyContent:'space-around', margin:'30px'}}>
  <div>v.myIdx</div>
     <div><Link href={`/qnaDetail/${data.userIdx}`}><a >{data.questionTitle && data.questionTitle.length > 30 ? data.questionTitle.slice(0,30) : data.questionTitle}</a></Link></div>
     <div>{data.questionView && data.questionView}</div>
       
    </div>
  )
}

export default QnaList