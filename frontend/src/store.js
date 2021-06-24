import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {getCategoriesReducer, getProductFromCategories, getProductFromID, getProductsReducer, getTopProductReducer, giveReviewReducer} from './reducers/productReducer'
import {authUserReducer, editUserReducer, getUserReducer} from './reducers/userReducer'
import {cartReducer, getCartReducer, getTransactionReducer} from './reducers/cartReducer'

const rootReducer= combineReducers({
    productsReducer: getProductsReducer,
    topProducts: getTopProductReducer,
    categories: getCategoriesReducer,
    productCategories : getProductFromCategories,
    singleProduct: getProductFromID,
    authState: authUserReducer,
    userState: getUserReducer,
    editUserState: editUserReducer,
    reviewState: giveReviewReducer,
    cartAction: cartReducer,
    cartState: getCartReducer,
    transactionState: getTransactionReducer
})
    const pendingState = localStorage.getItem('pending') ?JSON.parse(localStorage.getItem('pending'))  : false
const initialState ={
  authState: {pending:pendingState}
};

const middleWare = [thunk];

const store = createStore(rootReducer,initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store