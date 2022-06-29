import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
const HashTag =({data, onClick,value,style,title}) => {


    console.log(data)

    return (
        /* onClick을 프롭스로 받은 뒤 그 onCLick을 실행?*/
    <div  onClick={onClick} value={value} style={style} title={title}>
        #{data.tagKeyword}
    </div>
  )
}

export default HashTag