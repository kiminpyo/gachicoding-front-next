import React from 'react'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Card, Col, Row ,Meta, Avatar} from 'antd';
const QnaList = ({data,onClick}) => {
  const { Meta } = Card;
  const {user} = useSelector((state) => state.user)
  const router = useRouter();
    console.log(data)
    console.log(data)
  

    const onClickDetail = () => {
    console.log(user)
      if(user === ""){
        alert('로그인 후 접속해주세요')
        return router.push('/')
      }
    else{
  
      router.push(`/qnaDetail/${data.queIdx}`)
    }
  }
  return (
   
   <Col xs={24}  sm={12} md={8} xl={6}  style={{height:'320px'}} onClick={onClickDetail} >         
          <Card 
          hoverable
          bordered={false} 
          style={{fontSize:'18px'}}
         >
            <div style={{height:'25px', textAlign:'end'}}>
              {data.queSolve 
              ? <div style={{color:'green'}}>해결</div>
              : <div style={{color:'red'}}>미해결</div>}
            </div>
            <div style={{height:'200px'}}>
              <div style={{height:'30px'}}>해시태그</div>
              <div style={{height:'30px',maxHeight:'30px', fontWeight:'bold',overflow:'hidden'}}>
                <div style={{color:'grey',display:'inline-block'}}>
                  {data.queIdx}Q.
                </div>
                 {data.queTitle.length >= 10 ? data.queTitle.slice(0,10) + "...": data.queTitle }
                </div>
              <div style={{height:'110px', maxHeight:'110px',overflow:'hidden'}}> {data.queContent.length >=30 
                ? data.queContent.slice(0,40) + "..."
                : data.queContent}
              </div>
              <div style={{height:'30px',overflow:'hidden'}} >
                {data.queRegdate.slice(0,3).join('.') + " " + data.queRegdate.slice(3,5).join('시') + "분"}
              </div>
            </div>
            <hr />
              
            <Card.Meta
            style={{overflow:'hidden'}}
              avatar={<Avatar src={data.userPicture || "aa"} />}
              title={data.userEmail}
            />
       
          </Card>
      </Col>
    
   
  )
}

export default QnaList;