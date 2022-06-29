import React from 'react'

const MainQna = ({data}) => {
   console.log(data)
  return (
  
      <div style={{display:'flex',margin: '20px', borderBottom:'1px solid black'}}>
      <div style={{width:'15%',color:'red'}}>{data.queSolve ? "true" :"false"}</div>
      <div style={{width:'70%'}}>{data.queTitle }</div>
      <div style={{width:'15%'}}>1</div>
      </div>
  )
}

export default MainQna