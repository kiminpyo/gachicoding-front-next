import React,{useCallback, useEffect} from 'react'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {Button} from 'antd'
import { LOG_OUT_REQUEST } from '../reducers/user';

const UserForm = React.memo(() =>{
const dispatch = useDispatch();
const {user,logoutLoading} = useSelector((state) =>state.user);

console.log(user)
const logoutHandler= useCallback(() =>{
    
    dispatch({
        type: LOG_OUT_REQUEST
    })
},[]) 

       return(
        <div>
             <div>
            {user && user.userName}님 반갑습니다.
            </div>
            <Button 
            loading ={logoutLoading}
            onClick={logoutHandler}>
                로그아웃
            </Button>
        </div>
       
    )
})


export default UserForm;
