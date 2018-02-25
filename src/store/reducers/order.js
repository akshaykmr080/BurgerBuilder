import * as actionTypes from '../actions/actions';

const initialState = {
    orders: [],
    loading: false,
    purchased: false

}

const purchaseStateChange = (state,purchaseState) => {
    return {
        ...state,
        purchased: purchaseState
    }
}

const purchaseBurgerSuccess = (state, action) => {
            const newOrder = {
                ...action.orderData,
                id: action.id
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            }
}

const fetchOrderSuccess = (state, action) => {
        return {
                ...state,
                orders: action.orders,
                loading: false
            }
}
const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_INIT: return purchaseStateChange(state, false)
        case actionTypes.PURCHASE_BURGER_START: return purchaseStateChange(state, true)
        case actionTypes.PURCHASE_BURGER_SUCCESS : return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAILURE: return purchaseStateChange(state, false)
        case actionTypes.FETCH_ORDERS_START: return purchaseStateChange(state, true)
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAILED: return purchaseStateChange(state, false)
        default: return state
    }

}

export default orderReducer;