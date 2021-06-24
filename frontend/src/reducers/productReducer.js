import {
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_TOP_THREE_FAIL,
    GET_TOP_THREE_REQUEST,
    GET_TOP_THREE_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_PRODUCT_CATEGORIES_FAIL,
    GET_PRODUCT_CATEGORIES_REQUEST,
    GET_PRODUCT_CATEGORIES_SUCCESS,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_SUCCESS,
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL,
    CREATE_REVIEW_RESET
} from '../actions/constants'



export const getProductsReducer = (state = {
    products: []
}, action) => {

    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            return {
                loading: true, products: []
            }

            case GET_PRODUCTS_SUCCESS:
                return {
                    success: true, products: action.payload.products, remaining: action.payload.remaining, loading: false
                }
                case GET_PRODUCTS_FAIL:
                    return {
                        error: action.payload, loading: false
                    }
                    default:
                        return state
    }
}

export const getTopProductReducer = (state = {
    products: []
}, action) => {

    switch (action.type) {
        case GET_TOP_THREE_REQUEST:
            return {
                loading: true, products: []
            }

            case GET_TOP_THREE_SUCCESS:
                return {
                    success: true, products: action.payload, loading: false
                }
                case GET_TOP_THREE_FAIL:
                    return {
                        error: action.payload, loading: false
                    }
                    default:
                        return state
    }
}


export const getCategoriesReducer = (state={categories:[]}, action)=>{
    switch(action.type){
        default:
        return state

        case GET_CATEGORIES_REQUEST:
            return {loading:true, categories:[]}
        case GET_CATEGORIES_SUCCESS:
            return{loading:false, categories:action.payload}
        case GET_CATEGORIES_FAIL:
            return {loading:false,error:action.payload}
    }
}

export const getProductFromCategories = (state={products:[]},action)=>{
    switch(action.type){
        default:
        return state

        case GET_PRODUCT_CATEGORIES_REQUEST:
            return {loading:true, products:[]}
        case GET_PRODUCT_CATEGORIES_SUCCESS:
            return{loading:false, products:action.payload.products, remaining:action.payload.remaining}
        case GET_PRODUCT_CATEGORIES_FAIL:
            return {loading:false,error:action.payload}
    }
}
export const getProductFromID = (state={product:null,loading:true},action)=>{
    switch(action.type){
        default:
        return state

        case GET_PRODUCT_REQUEST:
            return {loading:true,...state}
        case GET_PRODUCT_SUCCESS:
            return{loading:false, product:action.payload}
        case GET_PRODUCT_FAIL:
            return {loading:false,error:action.payload}
    }
}

export const giveReviewReducer = (state={},action)=>{
    switch(action.type){
        default: return state

        case CREATE_REVIEW_REQUEST:
            return{loading:true}
        case CREATE_REVIEW_SUCCESS:
            return{loading:false, success:true}
        case CREATE_REVIEW_FAIL:
            return{loading:false, error:action.payload}
        case CREATE_REVIEW_RESET:
            return{state:{}}
    }
}