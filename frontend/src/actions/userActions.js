import {EDIT_PROFILE_FAIL, EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, GET_USER_FAIL, GET_USER_SUCCESS, GOOGLE_LOGIN_USER_FAIL, GOOGLE_LOGIN_USER_REQUEST, GOOGLE_LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER, REGISTER_USER_FAIL,REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS} from '../actions/constants'
import axios from 'axios'

export const getUser = ()=> async (dispatch) =>{
    try {
        const config = {
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials:'include'
        }

        const res = await axios.get('/api/users/auth',config)
        
        dispatch({
            type: GET_USER_SUCCESS,
            payload: res.data
        })
        dispatch({
            type: LOGIN_USER_SUCCESS
        })
        localStorage.setItem('authenticated', 'true')
    } catch (error) {
        localStorage.removeItem('authenticated')
        dispatch({
            type: GET_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
        dispatch({
            type:LOGIN_USER_FAIL
        })
    }
}
export const registerUser = (body)=>async (dispatch)=>{
try {

    dispatch({
            type:REGISTER_USER_REQUEST
        })
         const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
    const res = await axios.post(`/api/users/register`,body,config)
    dispatch({
        type:REGISTER_USER_SUCCESS,
        payload: res.data.message
    })
    localStorage.setItem('pending','true')
    
} catch (error) {
    dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
}
}
export const loginUser = (body)=>async (dispatch)=>{
try {

    dispatch({
            type:LOGIN_USER_REQUEST
        })
         const config = {
            headers: {
              'Content-Type': 'application/json',
            }
          };
    const res = await axios.post(`/api/users/login`,body,config)
    dispatch({
        type:LOGIN_USER_SUCCESS,
        payload: res.data
    })
    dispatch(getUser())
    localStorage.removeItem('pending')
    localStorage.setItem('authenticated', 'true')
} catch (error) {
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
}
}
export const googleLoginUser = (body)=>async (dispatch)=>{
try {

    dispatch({
            type:GOOGLE_LOGIN_USER_REQUEST
        })
         const config = {
            headers: {
              'Content-Type': 'application/json',
            }
          };
    const res = await axios.post(`/api/users/google-login`,body,config)
    dispatch({
        type:GOOGLE_LOGIN_USER_SUCCESS,
        payload: res.data
    })
    dispatch(getUser())
    localStorage.removeItem('pending')
    localStorage.setItem('authenticated', 'true')
} catch (error) {
    dispatch({
        type: GOOGLE_LOGIN_USER_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
}
}

export const logoutUser = ()=> async (dispatch)=>{

    await axios.get('/api/users/logout')
    dispatch({
        type:LOGOUT_USER
    })
    localStorage.removeItem('authenticated')
    window.location.reload()
}

export const updateProfile = (body)=>async (dispatch)=>{
    try {
        dispatch({
            type:EDIT_PROFILE_REQUEST
        })
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
         await axios.put(`/api/users/profile`,body,config)
        dispatch({
            type: EDIT_PROFILE_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: EDIT_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


