import produce from 'immer';

export const initialState = {
    userInfo: null,
    user: [],

};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCEESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOAD_USER_REQUEST = 'LOG_IN_REQUEST';
export const LOAD_USER_SUCCESS = 'LOG_IN_SUCEESS';
export const LOAD_USER_FAILURE = 'LOG_IN_FAILURE';



const reducer = (state = initialState, action)=>{
    return produce(state,(draft) => {
        switch(action.type){
            case LOG_IN_REQUEST:
            console.log('로그인 리듀서 진입')    
            break;
            case LOG_IN_SUCCESS:
                console.log('로그인 리듀서 성공')
                console.log(action.data)
              draft.userInfo = action.data;
         
            break;
            case LOG_IN_FAILURE:
                console.log('로그인 에러')
            break;
            case LOAD_USER_REQUEST:
                console.log('유저 리듀서 진입')  
               
                break;
            case LOAD_USER_SUCCESS:
                    console.log('유저 리듀서 성공')
                  draft.userInfo = action.data;
             
                break;
            case LOAD_USER_FAILURE:
                console.log('유저 에러')
                break;
            default:
            break;
        }
    })
}

export default reducer