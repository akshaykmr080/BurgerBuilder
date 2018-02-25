import * as actionTypes from './actions';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailure = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILURE,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = (orderData) => {
    return (dispatch, getState) => {
        dispatch(purchaseBurgerStart())
        axios.post('/order.json?auth='+getState().auth.token, orderData)
        .then(response =>{
            dispatch(purchaseBurgerSuccess(response.data.name))
        })
        .catch(error => {
            dispatch(purchaseBurgerFailure(error));
        })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const fetchOrders = () => {
    return (dispatch, getState) => {
        dispatch(fetchOrderStart())
        const queryParams = '?auth=' + getState().auth.token + '&orderBy="userId"&equalTo="' + getState().auth.userId + '"'
        axios.get('/order.json' + queryParams)
        .then(res => {
            const fetchOrders = [];
            for(let key in res.data){
                fetchOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchOrdersSuccess(fetchOrders))
            // this.setState({loading: false, orders: fetchOrders});
        })
        .catch(err => {
            dispatch(fetchOrdersFailed(err))
            // this.setState({loading: false})
        })
    }
     
}