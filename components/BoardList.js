import React,{useCallback} from 'react'
import { useDispatch  } from 'react-redux';
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types';
import Board from '../pages/board';
import Link from 'next/link';
const BoardList = ({data}) =>{
  

   

return(
    <div key={data.boardIdx} style={{display:'flex', justifyContent: 'space-around'}}>
     
       <Link
       href={`/boardDetail/${data.boardIdx}`}>
        <div 
       style ={{width:'60%'}}>
           #노트
           <div>{data.boardTitle}</div>
        </div>
       </Link>
      
       <div style= {{marginRight:'100'}}>
        {data.boardViews}
       </div>
    </div>
  )
}
BoardList.propTypes ={
    data: PropTypes.object.isRequired
}

export default BoardList;