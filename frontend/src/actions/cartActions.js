import {ADD_CART_REQUEST,ADD_CART_FAIL,ADD_CART_SUCCESS,GET_CART_REQUEST,GET_TRANSACTION_REQUEST, GET_CART_SUCCESS, GET_CART_FAIL, DELETE_CART_REQUEST, DELETE_CART_SUCCESS, DELETE_CART_FAIL, GET_TRANSACTION_SUCCESS, GET_TRANSACTION_FAIL} from '../actions/constants'
import axios from 'axios'

export const addToCart = (body,id)=> async (dispatch) =>{
    
    try {
        dispatch({type:ADD_CART_REQUEST})
        const config={
            headers: {
                'Content-Type': 'application/json',
              }
        } 
        const res = await axios.post(`/api/cart/${id}`,body,config)
        dispatch({
            type: ADD_CART_SUCCESS,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:ADD_CART_FAIL,
            payload:  error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const deleteItemCart = (id)=> async (dispatch) =>{
    
    try {
        dispatch({type:DELETE_CART_REQUEST})
        
         await axios.delete(`/api/cart/${id}`)
        dispatch({
            type: DELETE_CART_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type:DELETE_CART_FAIL,
            payload:  error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getCartItem = ()=> async (dispatch)=>{
    try {
        dispatch({type:GET_CART_REQUEST})

        const res = await axios.get('/api/cart')
        dispatch({
            type: GET_CART_SUCCESS,
            payload : res.data.products
        })
    } catch (error) {
        dispatch({
            type:GET_CART_FAIL,
            payload:  error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getTransaction = ()=> async(dispatch)=>{
    try {
        dispatch({
            type: GET_TRANSACTION_REQUEST
        })

        const res = await axios.get(`/api/checkout/mycheckout`)
        dispatch({
            type: GET_TRANSACTION_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: GET_TRANSACTION_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}