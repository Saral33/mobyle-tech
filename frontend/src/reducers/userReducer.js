import {EDIT_PROFILE_FAIL, EDIT_PROFILE_REQUEST, EDIT_PROFILE_RESET, EDIT_PROFILE_SUCCESS, GET_USER_FAIL, GET_USER_REQUEST, GET_USER_SUCCESS, GOOGLE_LOGIN_USER_FAIL, GOOGLE_LOGIN_USER_REQUEST, GOOGLE_LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER, REGISTER_USER_FAIL,REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS} from '../actions/constants'



export const authUserReducer = (state={authenticated:false},action)=>{

    switch(action.type){
        default: return state

        case REGISTER_USER_REQUEST:
        case LOGIN_USER_REQUEST:
        case GOOGLE_LOGIN_USER_REQUEST:
            return{...state,loading:true}
        case REGISTER_USER_SUCCESS:
        return{loading:false, message: action.payload, pending:true}
        case LOGIN_USER_SUCCESS:
        case GOOGLE_LOGIN_USER_SUCCESS:
            return{loading:false, authenticated:true,pending:false}
        case LOGIN_USER_FAIL:
        case REGISTER_USER_FAIL:
        case GOOGLE_LOGIN_USER_FAIL:
        case LOGOUT_USER:
            return{...state,loading:false, authenticated:false, error:action.payload ? action.payload: null }
    }

}

export const getUserReducer = (state={},action)=>{
        switch(action.type){
            default: return state

            case GET_USER_REQUEST:
                return{...state,loading:true}
            case GET_USER_SUCCESS:
                return{loading:false, userInfo:action.payload}
            case GET_USER_FAIL:
            case LOGOUT_USER:
                return{loading:false, error:action.payload,userInfo:null}
        }
}


export const editUserReducer = (state={},action)=>{
    switch(action.type){
        default: return state

        case EDIT_PROFILE_REQUEST:
            return{...state,loading:true}
        case EDIT_PROFILE_SUCCESS:
            return{loading:false,success:true}
        case EDIT_PROFILE_FAIL:
            return{loading:false,error:action.payload}
        case EDIT_PROFILE_RESET:
            return{}
    }
}