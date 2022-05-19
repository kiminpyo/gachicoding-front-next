import {all, fork, take, call, put, takeEvery,takeLatest, delay} from 'redux-saga/effects'
import axios from 'axios';
import { LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS } from '../reducers/user';
import { ConsoleSqlOutlined } from '@ant-design/icons';

function loginAPI(data){
    console.log(data)
    return axios.post(`/api/user/login`,data)
}

function* logIn(action){
    console.log('로그인 사가 진입')
    console.log(action)

    try{
        const result = yield call(loginAPI,action.data)
        console.log(result.headers.Cookie)
        
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data
        })
    }catch(err){
        yield put({
            type: LOG_IN_FAILURE,
            
        })
    }
}

function loadUserAPI(data){
    console.log({data})
    return axios.get(`/api/user/info?userEmail=${data.email}`,{headers:{Cookie}})
}

function* loadUser(action){
    console.log('유저 사가 진입')
    try{
        const result = yield call(loadUserAPI,action.data)
        console.log(result.data)
      
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data
        })
    }catch(err){
        yield put({
            type: LOAD_USER_FAILURE,
       
        })
    }
}

function* watchLogIn(){
    yield takeLatest(LOG_IN_REQUEST, logIn)
}
function* watchLoadUser(){
    yield takeLatest(LOAD_USER_REQUEST, loadUser)
}

export default function* userSage(){
    yield all([
        fork(watchLogIn),
        fork(watchLoadUser)
    ])
}