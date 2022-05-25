import produce from 'immer';

export const initialState = {
    user:null,
    logInLoading: false, //로그인 시도중
    logInDone: false, 
    logInError: null, 
    logoutLoading: false, //로그아웃 시도중
    logoutDone: false, 
    logoutError: null, 
};
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCEESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCEESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOAD_USER_REQUEST = 'LOG_IN_REQUEST';
export const LOAD_USER_SUCCESS = 'LOG_IN_SUCEESS';
export const LOAD_USER_FAILURE = 'LOG_IN_FAILURE';



const reducer = (state = initialState, action)=>{
    return produce(state,(draft) => {
        switch(action.type){
            case LOG_OUT_REQUEST:
                console.log('로그아웃 리듀서 진입')    
                draft.logoutLoading= true;
                draft.logoutError= null;
                draft.logoutDone= false; 
                break;
            case LOG_OUT_SUCCESS:
                console.log('로그아웃 리듀서 성공')
                draft.logoutLoading= false;
                draft.logoutDone= true; 
                draft.user = action.data
            break;
            case LOG_OUT_FAILURE:
                console.log('로그아웃 에러')
            break;
            case LOG_IN_REQUEST:
            console.log('로그인 리듀서 진입')    
                draft.logInLoading= true;
                draft.logInError= null;
                draft.logInDone= false; 
            break;
            case LOG_IN_SUCCESS:
                console.log('로그인 리듀서 성공')
                draft.logInLoading= false;
                draft.logInDone= true;     
                draft.user = action.data   
            break;
            case LOG_IN_FAILURE:
                console.log('로그인 에러')
                draft.logInLoading= false;

            break;
            case LOAD_USER_REQUEST:
                console.log('유저 리듀서 진입')  
               
                break;
            case LOAD_USER_SUCCESS:
                    console.log('유저 리듀서 성공')
              draft.user = action.data  
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