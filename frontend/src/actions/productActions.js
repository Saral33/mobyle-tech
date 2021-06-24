import {
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_TOP_THREE_FAIL,
    GET_TOP_THREE_REQUEST,
    GET_TOP_THREE_SUCCESS,
    GET_PRODUCT_CATEGORIES_SUCCESS,
    GET_PRODUCT_CATEGORIES_REQUEST,
    GET_PRODUCT_CATEGORIES_FAIL,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_REQUEST,
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL
} from '../actions/constants'
import axios from 'axios'


export const getProducts = (page = 1) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PRODUCTS_REQUEST
        })

        const res = await axios.get(`/api/products?page=${page}`)

        dispatch({
            type: GET_PRODUCTS_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: GET_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const getProductsByBrand = (brand,page=1) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PRODUCT_CATEGORIES_REQUEST
        })

        const res = await axios.get(`/api/products?brand=${brand}&page=${page}`)

        dispatch({
            type: GET_PRODUCT_CATEGORIES_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: GET_PRODUCT_CATEGORIES_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const getTopProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_TOP_THREE_REQUEST
        })

        const res = await axios.get(`/api/products/topthreeproducts`)

        dispatch({
            type: GET_TOP_THREE_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: GET_TOP_THREE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const getCategories = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_CATEGORIES_REQUEST
        })

        const res = await axios.get(`/api/products/brands`)

        dispatch({
            type: GET_CATEGORIES_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: GET_CATEGORIES_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PRODUCT_REQUEST
        })

        const res = await axios.get(`/api/products/${id}`)

        dispatch({
            type: GET_PRODUCT_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: GET_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const giveReview = (body,id)=> async (dispatch)=>{
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            }
          };
          dispatch({type:CREATE_REVIEW_REQUEST})
          const res = await axios.post(`/api/products/review/${id}`,body,config)
          dispatch({
              type: CREATE_REVIEW_SUCCESS,
              payload: res.data
          })
    } catch (error) {
        dispatch({
            type: CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}