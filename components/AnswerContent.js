import { Avatar, Button } from 'antd'

import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CHOOSE_ANSWER_REQUEST } from '../reducers/post'
import CommentForm from './CommentForm'
import MyButton from './MyButton'
const AnswerContent =({data, queSolve}) => {
    const {user}  = useSelector((state) =>state.user)
    const dispatch = useDispatch();
    const[choose, setChoose] = useState(false)
  const[chooseAns, setChooseAns] = useState(false);
  console.log(queSolve)
    /* console.log(data)
    console.log(data.ansRegdate.join('.'))
    console.log(data.ansRegdate.slice(0,3).join('.'))
    const newarr = [];
    const regDate = data.ansRegdate.reduce(function(acc,cur,i){
        acc[i] = cur;
        return acc;
    },{})
    console.log(regDate)
    
    for(let item of Object.values(regDate)){
        newarr.push(item)
        console.log(newarr)
    }
    console.log(Object.entries(regDate))
    const obj = {...data.ansRegdate};
    console.log(obj)
    console.log(Object.assign({}, data.ansRegdate))
    console.log(Object.values(obj).join('')) */
 
    const onClickAlreayChoose =() =>{
        if(data.ansSelect){
            return alert('이미 채택된 게시글입니다')
        }else{
            console.log('hi')
        }
       
    }
    
  return (
    <div style={{ width:'100%', marginLeft:"20px", marginBottom:'80px'}}>
        <div style={{width:'80%', marginLeft:'10%'}}>
            {/* header */}
            <div style={{display:'flex', marginTop:'20px'}}>
                <div>
                    <Avatar src={data && data.userPicture}/>
                </div>
                <div style={{fontSize:'13px', fontWeight:'bold'}}>
                    {data && data.userNick}님의 답변 <br/> {data && data.userEmail} 
                </div>
              { data.ansSelect && <div style={{marginLeft: '100px',border:'1px solid black', color:"red"}}>
                    채택된 답변
                </div>}
            </div>
            <div style={{textAlign:'right'}} className="chooseAns">  
                
                {  queSolve === false
                ? <Button className="choose" onClick={onClickAlreayChoose}>채택</Button>
                : null
                }
                
                { user && user.userEmail === data.userEmail ?<Button>삭제하기</Button> : null}
            </div>
         
              <hr/>
            {/* 컨텐츠 쪽 */}
            <div  style={{fontSize:'13px', fontWeight:'bold'}}>
                <div style={{minHeight:'200px'}}>
                    {data.ansContent && data.ansContent}
                </div>
              
                {data && data.ansRegdate.slice(0,3).join('.')}
                <br/>
                <br />
                <CommentForm/>
            </div>
     
        </div>
        
    </div>
  )
}

export default AnswerContent