import React from 'react'
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import HashTag from './HashTag';
const NoticeList =({data}) =>{

    
    const style= {background:'beige', display:'inline-block', marginLeft:'10px', borderRadius:'10px', fontSize:'13px'}
console.log(data)
    const {user} = useSelector((state) => state.user)
    const router = useRouter();
    
    const onClick = () =>{
        if(!user){
            alert('로그인 후 접속해주세요')
            return null;
        }else{
           return router.push(`/noticeDetail/${data.boardIdx}`)
        }
     
    }    
    const onClickTag = (e) => {
      console.log(e.currentTarget.title)
      router.push(`/notice/${e.currentTarget.title}`)
    }
return(

    <div>

        <div key={data.notIdx} style={{display:'flex', justifyContent: 'space-around'}}>
     
      <div 
     style ={{width:'60%'}}>  
     <div>
         <div>{data.tags.map((v) => <HashTag title={v.tagKeyword}onClick={onClickTag}data={v} style={style}/>)}</div>
     <div onClick={onClick}>{data.boardTitle}</div>
      </div>
     </div>
       

     <div style= {{marginRight:'100'}}>
      {data.boardView}
     </div>
  </div>
    </div>
)
}

NoticeList.propTypes ={
    data: PropTypes.object.isRequired
}
export default NoticeList;
