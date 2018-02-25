import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contact.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/forms/input/input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/order';
import { checkValidity } from '../../../utility/validations';

class Contact extends Component {
    state = {
        orderForm: {
            
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false  

                },
                
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipcode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zipcode'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6,
                        maxLength: 6
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Email'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
            
            delivery: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'}, 
                            {value: 'cheapest', displayValue: 'Cheapest'}    
                        ]
                    },
                    validation: {},
                    value: 'fastest',
                    valid: true,
                    touched: false
                }
                
        },
        formIsValid: false,
        loading: false
    }
    
    

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});
        const formData = {};

        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ings,
            totalPrice: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        }
        
       this.props.onOrderBurger(order)
    }

    inputChanged = (event, inputIdentifier) => {
        
        let updatedOrderForm = {
            ...this.state.orderForm
        }

        let updatedFormElement = { ...updatedOrderForm[inputIdentifier]}

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValidNew = true;

        for(let key in updatedOrderForm){
            formIsValidNew = updatedOrderForm[key].valid && formIsValidNew;
        }
        
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValidNew})
    }

    render () {

        const formElementsArray = [];

        for ( let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = <form>
                    
                    {formElementsArray.map(formElement => {
                        return <Input 
                                      key={formElement.id}
                                      elementType = {formElement.config.elementType}
                                      elementConfig = {formElement.config.elementConfig}
                                      value = {formElement.config.value} 
                                      invalid = {!formElement.config.valid}
                                      shouldValidate = {formElement.config.validation}
                                      touched = {formElement.config.touched}
                                      changed={(event) => this.inputChanged(event, formElement.id)}/>
                    })}
                    
                    <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
                </form>

        if(this.props.loading){
            form = <Spinner />
        }

        return (
            <div className={classes.Contact}>
                <h4> Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

let mapPropsToState = state => {
  return {  
        ings: state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        loading: state.orders.loading,
        userId: state.auth.userId
  }
}

let mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(purchaseBurger(orderData))
    }
    
}

export default connect(mapPropsToState, mapDispatchToProps)(withErrorHandler(Contact, axios));