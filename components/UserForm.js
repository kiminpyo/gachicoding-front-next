import React,{useCallback} from 'react'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {Button} from 'antd'
import { LOG_OUT_REQUEST } from '../reducers/user';

const UserForm =({data}) =>{
const dispatch = useDispatch();
const {user} = useSelector((state) =>state.user);
console.log(user)

const logoutHandler= useCallback(() =>{
    dispatch({
        type: LOG_OUT_REQUEST
    })
},[user])
return(
    <div>
         <div>
        {user.userName}님 반갑습니다.
        </div>
        <Button 
        onClick={logoutHandler}>
            로그아웃
        </Button>
    </div>
   
)
}


export default UserForm;
