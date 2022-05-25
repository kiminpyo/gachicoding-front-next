import {all, fork, take, call, put, takeEvery,takeLatest, delay} from 'redux-saga/effects'
import { BOARDS_REQUEST ,BOARDS_SUCCESS, BOARDS_FAILURE, NOTICELIST_REQUEST, NOTICELIST_SUCCESS,
     NOTICELIST_FAILURE, BOARD_EDIT_REQUEST, BOARD_EDIT_SUCCESS, BOARD_EDIT_FAILURE, BOARD_CREATE_REQUEST,
      BOARD_CREATE_SUCCESS, BOARD_CREATE_FAILURE, BOARD_DELETE_SUCCESS, BOARD_DELETE_FAILURE, 
      BOARD_DELETE_REQUEST, IMAGE_UPLOAD_REQUEST, IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_FAILURE, 
      BOARDS_PAGING_REQUEST, BOARDS_PAGING_SUCCESS, BOARDS_DETAIL_FAILURE, BOARDS_DETAIL_SUCCESS, 
      BOARDS_DETAIL_REQUEST, QNAS_REQUEST, QNAS_SUCCESS, generateDummyPost, QNAS_FAILURE, QNA_DETAIL_REQUEST, QNA_DETAIL_SUCCESS, QNA_DETAIL_FAILURE, QNA_CREATE_REQUEST, QNA_CREATE_SUCCESS, QNA_CREATE_FAILURE, ADD_ANSWER_REQUEST, ADD_ANSWER_SUCCESS, ADD_ANSWER_FAILURE, NOTICE_CREATE_REQUEST, NOTICE_CREATE_SUCCESS, NOTICE_CREATE_FAILURE, NOTICE_DETAIL_REQUEST, NOTICE_DETAIL_SUCCESS, NOTICE_DETAIL_FAILURE} from '../reducers/post'
import axios from 'axios';
import shortId from 'shortid';

function postBoardAPI(data){
    console.log(data)    
    return axios.post(`api/board`,data)
}

function* postBoard(action){
    try{
        
        const result = yield call(postBoardAPI, action.data)
        console.log(result)
     yield put({
         type: BOARD_CREATE_SUCCESS,
         data: result.data
     })
    }catch(err) {
   
        yield put({
            type: BOARD_CREATE_FAILURE,
                
        })
    }
}

function editBoardAPI(data){
    return axios.put(`api/board/modify/`,data)
}

function* editBoard(action){
    try{
        const result = yield call(editBoardAPI, action.data)
        console.log(result)
     yield put({
         type: BOARD_EDIT_SUCCESS,
         data: result.data
     })
    }catch(err) {
   
        yield put({
            type: BOARD_EDIT_FAILURE,
                
        })
    }
    
}

function loadBoardsAPI(pageNumber){
    return axios.get(`api/board/list?page=${pageNumber-1}&size=10&sort=boardIdx,DESC`)
}

function* loadBoards(action){
    
    try{
        
        const result = yield call(loadBoardsAPI, action.data)
        console.log(result.data.pageable)
     yield put({
         type: BOARDS_SUCCESS,
         data: result.data
     })
    }catch(err) {
   
        yield put({
            type: BOARDS_FAILURE,
                
        })
    }

}

function loadNoticeListAPI(){
    return axios.get(`api/notice/list/`)
}

function* loadNoticeList(action){
    console.log(action.data)
    try{
        const result = yield call(loadNoticeListAPI, action.data)
        console.log(result)
     yield put({
         type: NOTICELIST_SUCCESS,
         data: result.data
     })
    }catch(err) {
   
        yield put({
            type: NOTICELIST_FAILURE,
                
        })
    }
}
function noticeDetailAPI(data){
    return axios.get(`api/notice/${data}`)
}

function* noticeDetail(action){
    console.log(action.data)
    try{
        const result = yield call(noticeDetailAPI, action.data)
        console.log(result)
     yield put({
         type: NOTICE_DETAIL_SUCCESS,
         data: result.data
     })
    }catch(err) {
   
        yield put({
            type: NOTICE_DETAIL_FAILURE,
                
        })
    }
}

function deleteBoardAPI(data){
    return axios.delete(`api/board/${parseInt(data)}`)
}

function* deleteBoard(action){
 
    console.log(action.data)
    try{
        
         const result = yield call(deleteBoardAPI, action.data) 
        console.log(result)
     yield put({
         type: BOARD_DELETE_SUCCESS,
         data: result.data 
     })
    }catch(err) {
   
        yield put({
            type: BOARD_DELETE_FAILURE,
                
        })
    }
}

function uploadImageAPI(data){
    console.log(data)
    return axios.post(`api/file/upload`, data)
}

function* uploadImage(action){
 
    console.log(action.data)
    try{
        
         const result = yield call(uploadImageAPI, action.data) 
        console.log(result)
     yield put({
         type: IMAGE_UPLOAD_SUCCESS,
         data: result.data 
         
     })
    }catch(err) {
   
        yield put({
            type: IMAGE_UPLOAD_FAILURE,
            
        })
    }
}
function boardDetailAPI(data){
    return axios.get(`api/board/${data}`)
}

function* boardDetail(action){
 
    try{
         const result = yield call(boardDetailAPI, action.data) 
        console.log(result)
     yield put({
         type: BOARDS_DETAIL_SUCCESS,
         data: result.data 
         
     })
    }catch(err) {
   
        yield put({
            type: BOARDS_DETAIL_FAILURE,
                
        })
    }
}

function qnaListAPI(data){
    return axios.get(`api/board/${data}`)
}

function* qnaList(action){
 
    try{
       /*   const result = yield call(qnaListAPI, action.data) 
        console.log(result) */
        yield delay(1000);
     yield put({
         type: QNAS_SUCCESS,
         
         
     })
    }catch(err) {
        console.error(err)
        yield put({
            type: QNAS_FAILURE,
 /*            data: err.response.data, */
        })
    }
}

function qnaDetailAPI(data){
    return axios.get(`api/board/${data}`)
}

function* qnaDetail(action){
    
    try{
        const id = 'bq3T9g4s86'
       /*   const result = yield call(qnaDetailAPI, action.data) 
        console.log(result) */
        yield delay(1000);
     yield put({
         type: QNA_DETAIL_SUCCESS,
         data: id
     })
    }catch(err) {
        console.error(err)
        yield put({
            type: QNA_DETAIL_FAILURE,
 /*            data: err.response.data, */
        })
    }
}

function qnaCreateAPI(data){
    return axios.get(`api/board/${data}`)
}

function* qnaCreate(action){
    
    try{
        const userIdx = shortId.generate();
        const qnaIdx = shortId.generate();
       /*   const result = yield call(qnaCreateAPI, action.data) 
        console.log(result) */
        yield delay(1000);
     yield put({
         type: QNA_CREATE_SUCCESS,
         data: {
             userIdx,
             qnaIdx,
             title: action.data.title,
             content: action.data.content
         }
     })
    }catch(err) {
        console.error(err)
        yield put({
            type: QNA_CREATE_FAILURE,
 /*            data: err.response.data, */
        })
    }
}

function qnaAnswerAPI(data){
    return axios.get(`api/board/${data}`)
}

function* qnaAnswer(action){
    
    try{
        const userIdx = shortId.generate();
       /*   const result = yield call(qnaAnswerAPI, action.data) 
        console.log(result) */
        yield delay(1000);
     yield put({    
         type: ADD_ANSWER_SUCCESS,
         data: {
            userIdx,
            title: action.data.title,
            content: action.data.content,
            questionIdx: action.data.id
         }
       
     })
    }catch(err) {
        console.error(err)
        yield put({
            type: ADD_ANSWER_FAILURE
 /*            data: err.response.data, */
        })
    }
}

function noticeCreateAPI(data){
    console.log(data)
    return axios.post(`/api/notice`,data)
}

function* noticeCreate(action){
    
    try{
      
       const result = yield call(noticeCreateAPI, action.data) 
        console.log(result) 
       
     yield put({    
         type: NOTICE_CREATE_SUCCESS,
         data: result.action.data
            
       
     })
    }catch(err) {
        console.error(err)
        yield put({
            type: NOTICE_CREATE_FAILURE
 /*            data: err.response.data, */
        })
    }
}
function* watchLoadBoardDetail(){
    yield takeLatest(BOARDS_DETAIL_REQUEST, boardDetail)
}
function* watchDeleteBoard(){
    yield takeLatest(BOARD_DELETE_REQUEST, deleteBoard)
}
function* watchPostBoard(){
     yield takeLatest(BOARD_CREATE_REQUEST, postBoard)
}
function* watchEditBoard(){
    yield takeLatest(BOARD_EDIT_REQUEST,editBoard)
}

function* watchLoadBoards(){
    yield takeLatest(BOARDS_REQUEST,loadBoards)
}
function* watchLoadNoticeList(){
    yield takeLatest(NOTICELIST_REQUEST, loadNoticeList)
}
function* watchLoadNoticeDetail(){
    yield takeLatest(NOTICE_DETAIL_REQUEST, noticeDetail)
}
function* watchUploadImage(){
    yield takeLatest(IMAGE_UPLOAD_REQUEST, uploadImage)
}
function* watchQnaList(){
    yield takeLatest(QNAS_REQUEST, qnaList)
}
function* watchQnaDetail(){
    yield takeLatest(QNA_DETAIL_REQUEST, qnaDetail)
}
function* watchQnaCreate(){
    yield takeLatest(QNA_CREATE_REQUEST, qnaCreate)
}
function* watchQnaAnswer(){
    yield takeLatest(ADD_ANSWER_REQUEST, qnaAnswer)
}
function* watchNOticeCreate(){
    yield takeLatest(NOTICE_CREATE_REQUEST, noticeCreate)
}


export default function* postSage(){
    yield all([
        fork(watchLoadBoardDetail),
        fork(watchUploadImage),
        fork(watchPostBoard),
        fork(watchEditBoard),
        fork(watchLoadBoards),
        fork(watchDeleteBoard),
        fork(watchQnaList),
        fork(watchQnaDetail),
        fork(watchQnaCreate),
        fork(watchQnaAnswer),
        fork(watchLoadNoticeList),
        fork(watchLoadNoticeDetail),
        fork(watchNOticeCreate)
    ])
}