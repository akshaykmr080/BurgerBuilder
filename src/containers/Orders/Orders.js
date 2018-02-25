import React , { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/order';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {
    
    componentWillMount () {
       this.props.onFetchOrders()
       
    }

    render (){
        let orders = <Spinner />
        if(!this.props.loading){
            orders = this.props.order.map(order => {
            return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    totalPrice={+order.totalPrice}/>
        })
        }
        
        return  (
            <div>
                {orders}
            </div>    
        )
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.orders.orders,
        loading: state.orders.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}
export  default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler (Orders, axios))