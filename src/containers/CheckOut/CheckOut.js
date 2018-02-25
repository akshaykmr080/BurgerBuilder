import React, { Component } from 'react';
import CheckOutSummary from '../../components/CheckOutSummary/CheckOutSummary';
import { Route, Redirect } from 'react-router-dom';
import Contact from './Contact/Contact';
import { connect } from 'react-redux';

class CheckOut extends Component {

    
    cancelClicked = () => {
        this.props.history.goBack();
    }

    continueClicked = () => {
        this.props.history.replace('/check-out/contact-data');
    }

    render () {
       let summary = <Redirect to='/'/>
       
       if(this.props.ings){
           const purchaseRedirect = this.props.purchased ? <Redirect to='/'/> : null
           summary =
           <div>
                {purchaseRedirect}
                <CheckOutSummary 
                cancelClicked={this.cancelClicked} 
                continueClicked={this.continueClicked} 
                ingredients={this.props.ings} />
                <Route 
                path={this.props.match.url + '/contact-data'} 
                component={ Contact }/>   
          </div>
       }
        return summary
    }
}

const mapStateToProps = (state) => {
    return {
        ings : state.burgerBuilder.ingredients,
        purchased: state.orders.purchased
    }
}


export default connect(mapStateToProps)(CheckOut)
