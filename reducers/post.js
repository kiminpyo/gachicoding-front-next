import produce from 'immer';
import faker from 'faker';
import shortId from 'shortid';

export const initialState = {
    board: [],
    notice: null,
    img:[],
    pageable: null,
    qna: [],
   
    
};

export const generateDummyPost = (number) => Array(number).fill().map(() =>({
        /* 로그인 유저 정보 */
        myIdx : shortId.generate(),
        qnaList:[{
            /* 질문자 정보 */
            userIdx : shortId.generate(),
            /* 질문자의 질문정보 */
            questionIdx : shortId.generate(),
            questionTitle : faker.lorem.paragraph(),
            questionView : 0,
        },
        {
            /* 질문자 정보 */
            userIdx : shortId.generate(),
            /* 질문자의 질문정보 */
            questionIdx : shortId.generate(),
            questionTitle : faker.lorem.paragraph(),
            questionView : 0,
        }],
        qnaDetail:{
                /* 로그인한 유저 */
                myIdx : shortId.generate(),
                username: faker.name.firstName(),
            question:{
                /* 질문자 */
                userIdx: shortId.generate(),
                /* 질문번호 */
                questionIdx: shortId.generate(),
                questionTitle: faker.vehicle.model(),
                questionContent : faker.lorem.paragraph(),
                /* 코멘트는 따로요청 */
                questionComment:{
                    /* 내 정보*/
                    myIdx: shortId.generate(),
                    comments :[{
                        /* 글쓴유저 */
                        userIdx : shortId.generate(),
                        /* 코멘트 번호 */
                        commentIdx : shortId.generate(),
                        commentContent: faker.lorem.paragraph(),
                    },{
                        
                        userIdx : shortId.generate(),
                        commentIdx : shortId.generate(),
                        commentContent: faker.lorem.paragraph(),
                    }]
                }
                ,
                answer: {
                    /* 질문번호 */
                    questionIdx: shortId.generate(),
                    userIdx : shortId.generate(),
                   
                    /* 답변리스트 */
                    answerList: [{
                        /* 로그인한 유저 */
                        myIdx : shortId.generate(),
                        /* 답변 글 */
                        answerIdx : shortId.generate(),
                        answerTitle: faker.vehicle.model(),
                        answerContent : faker.lorem.paragraph(),
                        answerCommentList:{
                            /* 유저 */
                            myIdx : shortId.generate(),
                            comments:[{
                                /* 코멘트를 쓴 사용자 */
                                userIdx : shortId.generate(),
                                /* 코멘트 번호 */
                                commentIdx : shortId.generate(),
                                commentContent: faker.lorem.paragraph()
                            },{
                                userIdx : shortId.generate(),
                                commentIdx : shortId.generate(),
                                commentContent: faker.lorem.paragraph()
                            }]
                        }
                    },
                    {   
                        userIdx : shortId.generate(),
                        answerIdx : shortId.generate(),
                        answerTitle: faker.vehicle.model(),
                        answerContent : faker.lorem.paragraph(),
                        answerComment:[{
                            userIdx : shortId.generate(),
                            commentIdx : shortId.generate(),
                            commentContent: faker.lorem.paragraph()
                        },{
                            userIdx : shortId.generate(),
                            commentIdx : shortId.generate(),
                            commentContent: faker.lorem.paragraph()
                        }
                        ]
                    }],
                }
            },            
        }

}));

export const addQnaQuestion = (data) =>({
    /* qna를 보낸 유저 id */
    userIdx: data.userIdx,
    qnaIdx: data.qnaIdx,
    qnaDetail:{
        title:data.title,
        content: data.content
    },
    answer: [],
    comments: [],
})
export const addQnaAnswer = (data) =>({
    questionIdx: data.id,
    answerId: shortId.generate(),
    title: data.title,
    content: data.content,
    comments: [],
})

export const addQnaComment = (data) =>({
    /* comment id */
    Commentid: data.id,
    title: data.title,
    content: data.content,
    user: {
        id: 1,
    }
})
export const imageUpload=(data) =>{
    console.log(data)
    return {
        type: IMAGE_PREVIEW_REQUEST,
        data
    }
}


export const qnaDetail =(data) =>{
    return {
        type: QNA_DETAIL_REQUEST,
        data
    }
}

export const IMAGE_PREVIEW_REQUEST = "IMAGE_PREVIEW_REQUEST";
export const IMAGE_PREVIEW_SUCCESS = "IMAGE_PREVIEW_SUCCESS";
export const IMAGE_PREVIEW_FAILURE = "IMAGE_PREVIEW_FAILURE";

export const NOTICE_CREATE_REQUEST = "NOTICE_CREATE_REQUEST";
export const NOTICE_CREATE_SUCCESS = "NOTICE_CREATE_SUCCESS";
export const NOTICE_CREATE_FAILURE = "NOTICE_CREATE_FAILURE";

export const NOTICE_DETAIL_REQUEST = "NOTICE_DETAIL_REQUEST";
export const NOTICE_DETAIL_SUCCESS = "NOTICE_DETAIL_SUCCESS";
export const NOTICE_DETAIL_FAILURE = "NOTICE_DETAIL_FAILURE";
 
export const IMAGE_UPLOAD_REQUEST = "IMAGE_UPLOAD_REQUEST";
export const IMAGE_UPLOAD_SUCCESS = "IMAGE_UPLOAD_SUCCESS";
export const IMAGE_UPLOAD_FAILURE = "IMAGE_UPLOAD_FAILURE";

export const BOARD_CREATE_REQUEST = "BOARD_CREATE_REQUEST";
export const BOARD_CREATE_SUCCESS = "BOARD_CREATE_SUCCESS";
export const BOARD_CREATE_FAILURE = "BOARD_CREATE_FAILURE";

export const BOARD_DELETE_REQUEST = "BOARD_DELETE_REQUEST";
export const BOARD_DELETE_SUCCESS = "BOARD_DELETE_SUCCESS";
export const BOARD_DELETE_FAILURE = "BOARD_DELETE_FAILURE";

export const BOARD_EDIT_REQUEST = "BOARD_EDIT_REQUEST";
export const BOARD_EDIT_SUCCESS = "BOARD_EDIT_SUCCESS";
export const BOARD_EDIT_FAILURE = "BOARD_EDIT_FAILURE";

export const BOARDS_DETAIL_REQUEST = "BOARDS_DETAIL_REQUEST";
export const BOARDS_DETAIL_SUCCESS = "BOARDS_DETAIL_SUCCESS";
export const BOARDS_DETAIL_FAILURE = "BOARDS_DETAIL_FAILURE";

export const BOARDS_REQUEST = "BOARDS_REQUEST";
export const BOARDS_SUCCESS = "BOARDS_SUCCESS";
export const BOARDS_FAILURE = "BOARDS_FAILURE";

export const NOTICELIST_REQUEST = "NOTICELIST_REQUEST";
export const NOTICELIST_SUCCESS = "NOTICELIST_SUCCESS";
export const NOTICELIST_FAILURE = "NOTICELIST_FAILURE";

export const QNAS_REQUEST = "QNAS_REQUEST";
export const QNAS_SUCCESS = "QNAS_SUCCESS";
export const QNAS_FAILURE = "QNAS_FAILURE";

export const QNA_DETAIL_REQUEST = "QNA_DETAIL_REQUEST";
export const QNA_DETAIL_SUCCESS = "QNA_DETAIL_SUCCESS";
export const QNA_DETAIL_FAILURE = "QNA_DETAIL_FAILURE";

export const QNA_CREATE_REQUEST = "QNA_CREATE_REQUEST";
export const QNA_CREATE_SUCCESS = "QNA_CREATE_SUCCESS";
export const QNA_CREATE_FAILURE = "QNA_CREATE_FAILURE";

export const ADD_ANSWER_REQUEST = "ADD_ANSWER_REQUEST";
export const ADD_ANSWER_SUCCESS = "ADD_ANSWER_SUCCESS";
export const ADD_ANSWER_FAILURE = "ADD_ANSWER_FAILURE";


const reducer = (state = initialState, action)=>{
    return produce(state ,(draft) => {
        switch(action.type){
                case IMAGE_PREVIEW_REQUEST: 
                console.log('답변진입')
                draft.img.push(action.data)
                break;
                case IMAGE_PREVIEW_SUCCESS:
                console.log('답변성공')
                console.log(action.data)
            
                break;
                case IMAGE_PREVIEW_FAILURE:
                
                break;
                case NOTICE_CREATE_REQUEST: 
                console.log('답변진입')
             
                break;
                case NOTICE_CREATE_SUCCESS:
                console.log('답변성공')
                console.log(action.data)
               
                break;
                case NOTICE_DETAIL_REQUEST: 
                console.log('게시판 상세 진입')
            
                break;
                case NOTICE_DETAIL_SUCCESS:
                    console.log('게시판 상세 성공')
                    console.log(action.data)
                    draft.notice = action.data
             
                break;
            
                case NOTICE_DETAIL_FAILURE:
                    console.log('게시판 상세 실패')
                    
                break;
                case NOTICE_CREATE_FAILURE:
                
                break;
                case ADD_ANSWER_REQUEST: 
                    console.log('답변진입')
                    console.log(action.data)
                break;
                case ADD_ANSWER_SUCCESS:
                    console.log('답변성공')
                    console.log(action.data)
               draft.qna  =  draft.qna.filter((v) => v.qnaIdx === action.data.questionIdx)
                   /*  draft.qna = draft.qna.filter((v) => v.qnaIdx === action.data.questionIdx) */
                draft.qna[0].answer.unshift(action.data)
                    break;
                case ADD_ANSWER_FAILURE:
                    console.log('답변실패')
                    
                    break;
                case QNA_DETAIL_REQUEST: 
                    console.log('qna 등록 진입')
            
                break;
                case QNA_CREATE_REQUEST: 
                    console.log('qna 작성 진입')
                    console.log(action.data)
                break;
                case QNA_CREATE_SUCCESS:
                    console.log('qna 작성 성공')
                    draft.qna.unshift(addQnaQuestion(action.data))
                    break;
                case QNA_CREATE_FAILURE:
                    console.log('qna 작성 실패')
                    
                    break;
                case QNA_DETAIL_REQUEST: 
                    console.log('qna 등록 진입')
            
                break;
                case QNA_DETAIL_REQUEST: 
                    console.log('qna 상세 진입')
                    console.log(action.data)
                break;
                case QNA_DETAIL_SUCCESS:
                    console.log('qna 상세 성공')
                    console.log(action.data)
                
                
                    return draft.qna;
                case QNA_DETAIL_FAILURE:
                    console.log('qna 상세 실패')
                    
                break;
                case QNA_DETAIL_REQUEST: 
                    console.log('qna 등록 진입')
                 
                break;
                case QNAS_SUCCESS:
                    console.log('qna 등록 성공')
                   
                    break;
                case QNAS_FAILURE:
                    console.log('qna 등록 실패')
                    
                break;
                case QNAS_REQUEST: 
                    console.log('이미지 등록 진입')
            
                break;
                case IMAGE_UPLOAD_REQUEST:
                    console.log('이미지 등록 진입')
                    break;
                case IMAGE_UPLOAD_SUCCESS:
                    console.log('이미지 등록 성공')
                    draft.img = action.data
                  
                    break;
                case IMAGE_UPLOAD_FAILURE:
                    console.log('이미지 등록 실패')
                    
                break;
                case BOARD_DELETE_REQUEST: 
                    console.log('게시글 삭제 진입')
            
                break;
                case BOARD_DELETE_SUCCESS:
                    console.log('게시글 삭제 성공')
                    console.log(action.data)
                draft.board = draft.board.filter((v) => v.boardIdx !== v.boardIdx)
                break;
                case BOARD_DELETE_FAILURE:
                    console.log('게시글 삭제 실패')
                    
                break;
                case BOARD_CREATE_REQUEST: 
                    console.log('게시판 작성리듀서 진입')
             
                break;
                case BOARD_CREATE_SUCCESS:
                    console.log('게시글 보내기 성공')
                    console.log(action.data)
                    draft.board =draft.action.data
                break;
                case BOARD_CREATE_FAILURE:
                    console.log('게시글 보내기 실패')
                    
                break;
                case BOARD_EDIT_REQUEST: 
                    console.log('게시판 편집 진입')
             
                break;
                case BOARD_EDIT_SUCCESS:
                    console.log('게시판 편집 성공')
                    console.log(action.data)
                    draft.board = draft.board.filter((v) => v.boardIdx === action.data.boardIdx)
                break;
                case BOARD_EDIT_FAILURE:
                    console.log('게시판 편집 실패')
                    
                break;
                case BOARDS_REQUEST: 
                    console.log('게시판 리듀서 진입')
             
                break;
                case BOARDS_SUCCESS:
                    console.log('데이터 성공')
                    console.log(action.data)
                    console.log(action.data.totalPages,action.data.totalElements)
                   /*  draft.board = action.data.content.sort((a,b) => b.boardIdx - a.boardIdx); */
                     draft.pageable = action.data.pageable;  
                    draft.board = action.data.content;
                     
                break;
               
                case BOARDS_FAILURE:
                    console.log('데이터 실패')
                    
                break;
                case BOARDS_DETAIL_REQUEST: 
                console.log('게시판 상세 진입')
            
                break;
                case BOARDS_DETAIL_SUCCESS:
                    console.log('게시판 상세 성공')
                    console.log(action.data)
                    draft.board = action.data
             
                break;
            
                case BOARDS_DETAIL_FAILURE:
                    console.log('게시판 상세 실패')
                    
                break;


                case NOTICELIST_REQUEST: 
                    console.log('공지사항 리듀서 진입')
             
                break;
                case NOTICELIST_SUCCESS:
                    console.log('데이터 성공')
                    console.log(action.data)
                    draft.notice = action.data.content
              
                break;
                case NOTICELIST_FAILURE:
                    console.log('데이터 실패')
                    
                break;
                default:
                    break;
        }
    })
}
export default reducer;