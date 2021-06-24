import {ADD_CART_REQUEST,ADD_CART_FAIL,ADD_CART_SUCCESS,ADD_CART_RESET, GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAIL, DELETE_CART_REQUEST, DELETE_CART_SUCCESS, DELETE_CART_FAIL,DELETE_CART_RESET, GET_TRANSACTION_REQUEST, GET_TRANSACTION_SUCCESS, GET_TRANSACTION_FAIL} from '../actions/constants'


export const cartReducer = (state={},action)=>{

    switch(action.type){
        default : return state

        case ADD_CART_REQUEST :
        case DELETE_CART_REQUEST:
            return {...state, loading:true}
        case ADD_CART_SUCCESS:
        case DELETE_CART_SUCCESS:
            return {...state, success:true,loading:false}
        case ADD_CART_FAIL:
        case DELETE_CART_FAIL:
            return {loading:false, error:action.payload}
        case ADD_CART_RESET:
        case DELETE_CART_RESET:
            return{state:{}}
    }
}

export const getCartReducer = (state={cartItem:[]},action)=>{
    switch(action.type){
        default : return state

        case GET_CART_REQUEST:
            return {...state, loading:true}
        case GET_CART_SUCCESS:
            return {loading:false, cartItem:action.payload}
        case GET_CART_FAIL:
            return{ loading:false, error:action.payload}
    }
}

export const getTransactionReducer = (state={transactions:[]},action)=>{
    switch(action.type){
        default : return state

        case GET_TRANSACTION_REQUEST:
            return{...state, loading:true}
        case GET_TRANSACTION_SUCCESS:
            return {loading:false, transactions: action.payload}
        case GET_TRANSACTION_FAIL:
            return{loading:false, error: action.payload}
    }
}