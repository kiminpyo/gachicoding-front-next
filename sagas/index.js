import {all, fork, take, call, put, takeEvery,takeLatest, delay} from 'redux-saga/effects'
import axios from 'axios';

import postSaga from './post'
import userSaga from './user'

/* 모든 주소를 한꺼번에 처리할수 있게 도와준다. */
axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.withCredentials  = true; 

/* genarator생성 */


export default function* rootSaga(){
    yield all([
        fork(postSaga),
        fork(userSaga),
    ])
}