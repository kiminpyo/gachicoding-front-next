import React from 'react'
import { Space,BackTop, Avatar  } from 'antd'
import { StepForwardFilled ,BulbFilled ,ExclamationCircleTwoTone, HeartTwoTone, QuestionOutlined} from '@ant-design/icons'
const QuestionContent =({data})=> {
    console.log(data)
    console.log(data.queRegdate)


    
        return (
            <>
                {/* 질문게시글 header */}
                <div style={{display:'flex', border:'1px solid black'}}>
                    {/* q아이콘 */}
                    <div style={{marginTop:'35px',width:'20%',textAlign:'center', fontSize:'40px',fontWeight:'bold'}}><QuestionOutlined style={{fontSize:"50px"}}/>.</div>
                    <div style={{width:'70%'}}>
                        <div style={{textAlign:'end'}}>{data && data.queSolve ===true ? <div>해결</div> : <div>미해결</div>}</div>
                        <div style={{fontSize:'30px'}}>{data && data.queContent}</div>
                        <div style={{fontSize:'15px',display:'flex', justifyContent:'space-between', fontWeight:'bold'}}>
                            <div>{data && data.userEmail}</div>
                            <div>{data && data.queRegdate}</div>
                        </div>
                    </div>
                </div>
                {/* 질문게시글 body */}
                <div style={{marginTop:'20px', border:'1px solid black'}}>
                    <div>질문: 
                        <div>
                            {data && data.queContent}
                        </div>
                    </div>  
                    <div>에러: 
                        <div>
                            {data && data.queError}
                        </div>
                    </div>
                </div>  
            </>
          ) 
   
  
}

export default QuestionContent;