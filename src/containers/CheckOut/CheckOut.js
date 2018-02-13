import React, { Component } from 'react';
import CheckOutSummary from '../../components/CheckOutSummary/CheckOutSummary';
import { Route } from 'react-router-dom';
import Contact from './Contact/Contact';


class CheckOut extends Component {
    state ={
        ingredients: {
            salad: 1,
            cheese: 1,
            meat: 1,
            bacon: 1
        },
        totalPrice : 0
    }

    componentWillMount = () => {
        const query = new URLSearchParams(this.props.location.search);
        const ingredient = {};
        let totPrice = 0;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                totPrice = param[1];
            } else
                ingredient[param[0]] = +param[1]
        }

        this.setState({ingredients:ingredient, totalPrice: totPrice})
    }

    cancelClicked = () => {
        this.props.history.goBack();
    }

    continueClicked = () => {
        this.props.history.replace('/check-out/contact-data');
    }

    render () {
       
        return (
            <div>
                <CheckOutSummary 
                cancelClicked={this.cancelClicked} 
                continueClicked={this.continueClicked} 
                ingredients={this.state.ingredients} />
                <Route 
                path={this.props.match.url + '/contact-data'} 
                render={(props) => (<Contact totalPrice= {this.state.totalPrice} ingredients={this.state.ingredients} {...props}/>)}/>    
            </div>
        )
    }
}

export default CheckOut;
