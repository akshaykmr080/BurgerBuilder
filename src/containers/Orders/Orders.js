import React , { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders : [],
        loading : true
    }
    componentDidMount () {
       
        axios.get('/order.json')
        .then(res => {
            console.log(res.data)
            const fetchOrders = [];
            for(let key in res.data){
                fetchOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            this.setState({loading: false, orders: fetchOrders});
        })
        .catch(res => {
            this.setState({loading: false})
        })
    }

    render (){
        console.log(this.state.orders)
        let orders = this.state.orders.map(order => {
            return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    totalPrice={+order.totalPrice}/>
        })
        return  (
            <div>
                {orders}
            </div>    
        )
    }
}

export  default withErrorHandler (Orders, axios)