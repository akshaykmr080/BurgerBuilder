import React , { Component } from 'react';
import Input from '../../components/UI/forms/input/input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux'; 
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../utility/validations';

class Auth extends Component {

    state = {
        controls: {
            email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email address'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false  

                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 7
                    },
                    valid: false,
                    touched: false  

                }
        },
        isSignUp : true
    }
    componentWillMount = () => {
        if(!this.props.buildingBurger && this.props.authRedirect !== '/'){
            console.log('changing path')
            this.props.onAuthRedirect('/')
        } 
    }
    inputChangedHandler = (event, controlName) => {
        const updatedControls= {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState({controls: updatedControls});
    }

    SwitchSignUp = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        let method = this.state.isSignUp ? 'SignUp' : 'SignIn';
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, method)
    }
    render () {

        const formElementsArray = [];

        for ( let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => {
            return (
                <Input 
                key = {formElement.id}
                elementType = {formElement.config.elementType}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.config.value} 
                invalid = {!formElement.config.valid}
                shouldValidate = {formElement.config.validation}
                touched = {formElement.config.touched}
                changed = {(event) => this.inputChangedHandler(event, formElement.id)}
                />
            )
        })
        if(this.props.loading)
            form = <Spinner />

        let errorMessage = null;
        if(this.props.error)
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirect} />
        }
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button 
                clicked = {this.SwitchSignUp}
                btnType="Danger">Switch To {this.state.isSignUp ? 'Sign In': 'Sign Up'}</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, method ) => dispatch(actions.auth(email, password, method)),
        onAuthRedirect: (path) => {dispatch(actions.setAuthRedirectPath('/'))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);
