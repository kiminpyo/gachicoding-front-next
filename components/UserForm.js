import React,{useCallback, useEffect} from 'react'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Avatar} from 'antd'
import { LOG_OUT_REQUEST } from '../reducers/user';
import { setUseProxies } from 'immer';

const UserForm = React.memo(() =>{
const dispatch = useDispatch();
const {user,logoutLoading} = useSelector((state) =>state.user);

console.log(' 유저폼')
const logoutHandler= useCallback(() =>{
    
    dispatch({
        type: LOG_OUT_REQUEST
    })
},[]) 

       return(
        <div>
             {user &&
                <div>
                    {/* 프로필 상단부 */}
                    <div style={{display:'flex', lineHeight:'1', marginTop:'20px'}}>
                        <Avatar
                        src ={"" || user.userPicture}/>
                        <div>
                            <ul style={{paddingLeft:'15px'}} >
                                <li>{user.userNick}님</li>
                                <li style={{fontSize:'13px'}}>{user.userEmail}</li>
                            </ul>
                        </div>
                        <div >
                            <Button
                            style={{fontSize:'15px'}}
                                loading ={logoutLoading}
                                onClick={logoutHandler}
                                >
                                로그아웃
                            </Button>
                        </div>
                    </div>
                    {/* 프로필 하단부 */}
                    <hr />
                <div style={{display:'flex'}}>
                    <div style={{fontSize:'15px', fontWeight:'bold',textAlign:'center', padding:'10px'}}>내가 쓴 글 <br />0</div>
                    <div style={{fontSize:'15px', fontWeight:'bold',textAlign:'center',padding:'10px'}}>스크랩 <br />0</div>
                    <div style={{fontSize:'15px', fontWeight:'bold',textAlign:'center', padding:'10px'}}>내 정보 <br />0</div>
                </div>
        </div>
           
            }
          
        </div>
       
    )
})


export default UserForm;
