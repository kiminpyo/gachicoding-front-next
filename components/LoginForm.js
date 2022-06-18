import React,{useState, useCallback, useMemo, useEffect, memo} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import useInput from '../hooks/useInput';
import styled from 'styled-components'
import {Form, Input, Button} from 'antd';
import {  LOG_IN_REQUEST } from '../reducers/user';
const LoginForm = React.memo(() =>{

    const dispatch =useDispatch();
    const [email,onChangeEmail] =useInput('')  
    const [password, onChangePassword]= useInput('')
    const {logInLoading, logInFailure ,user} =useSelector((state) => state.user)

    
    
    const onSubmitForm = useCallback(() =>{
        /* antd 에선 preventDefault가 적용되어있다 */
        console.log(email,password)
        dispatch({
            type: LOG_IN_REQUEST,
            data: {email, password}
        })
      /*   setIsLoggedIn(true) */
    
    },[email,password])
  
    console.log('로그인폼')
    
return(
    <div>
        <Form onFinish={onSubmitForm} >
        <div>
                <label htmlFor="user-email">이메일</label>
                <br />
                <Input name="user-email" type="email"value={email} onChange={onChangeEmail}/>
            </div>
            <div>
            <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input name="user-password" value={password} onChange={onChangePassword} required/>
            </div>
            <Button type="_primary" htmlType="submit" loading={logInLoading}>로그인</Button>
        </Form>
    </div>
  )
})



export default LoginForm;