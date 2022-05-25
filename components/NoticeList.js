import React from 'react'
import PropTypes from 'prop-types';
import Link from 'next/link';
const NoticeList =({data}) =>{
console.log(data)
return(
    <div>

        <div key={data.notIdx} style={{display:'flex', justifyContent: 'space-around'}}>
     
     <Link
     href={`/noticeDetail/${data.notIdx}`}>
      <div 
     style ={{width:'60%'}}>
         #노트
         <div>{data.notTitle}</div>
      </div>
     </Link>
    
     <div style= {{marginRight:'100'}}>
      {data.notViews}
     </div>
  </div>
    </div>
)
}

NoticeList.propTypes ={
    data: PropTypes.object.isRequired
}
export default NoticeList;
