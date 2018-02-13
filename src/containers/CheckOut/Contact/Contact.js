import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contact.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/forms/input/input';

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
                        maxLength: 10
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
                        required: true
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
                    value: '',
                    valid: true,
                    touched: false
                }
                
        },
        formIsValid: false,
        loading: false
    }
    
    checkValidity(value, rules){
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.trim().length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.trim().length < rules.maxLength && isValid;
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});
        const formData = {};

        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            orderData: formData
        }
        
        axios.post('/order.json', order)
        .then(response =>{
            this.setState({loading: false})
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false})
        })
    }

    inputChanged = (event, inputIdentifier) => {
        
        let updatedOrderForm = {
            ...this.state.orderForm
        }

        let updatedFormElement = { ...updatedOrderForm[inputIdentifier]}

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValidNew = true;

        for(let key in updatedOrderForm){
            formIsValidNew = updatedOrderForm[key].valid && formIsValidNew;
        }
        console.log('in inputChanged '+formIsValidNew);
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

        if(this.state.loading){
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

export default Contact;