import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/burgerBuilder';
import * as orderActions from '../../store/actions/order';
import * as authActions from '../../store/actions/auth'
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    
    state = {
        purchasable: false,
        purchasing: false
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated)
            this.setState({purchasing: true});
        else {
            this.props.onSetRedirectPath('/check-out')
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        //console.log('closing')
        
        this.setState({purchasing: false});

    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/check-out');
    }

    updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients)
                    .map(key => {
                        return ingredients[key]
                    })
                    .reduce((sum, val) => {
                        return sum + val
                    }, 0);
        return sum > 0
    }

    render () {
        let disabledInfo = {
            ...this.props.ings
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]>0 ? false : true
        }
        let orderStatus = null;
        if(this.props.ings){
            orderStatus = <OrderSummary 
                    purchaseCancled = {this.purchaseCancelHandler}
                    purchaseContinue= {this.purchaseContinueHandler}
                    ingredients={this.props.ings}
                    price={this.props.totalPrice}/>
        }
        
        
        let burger = this.props.error ? <p>Ingredients cant be loaded</p> : <Spinner/>

        if(this.props.ings){
            burger = <Aux>
                        <Burger ingredients={this.props.ings}/>
                        <BuildControls 
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientDeleted = {this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price= {this.props.totalPrice}
                        isAuth={this.props.isAuthenticated}
                        ordered={this.purchaseHandler}/>
                    </Aux>
        }
        
                
        return (
            <Aux>
                <Modal show={this.state.purchasing} backdropClicked={this.purchaseCancelHandler}>
                    {orderStatus}
                </Modal>
                {burger}
            </Aux>
        );
    }

    componentDidMount ()  {
        this.props.onInitIngredients()
    }
}
const mapStateToProps = (state) => {
    return {
        ings : state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token != null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded : (name) => dispatch(burgerBuilderActions.addIngredients(name)),
        onIngredientRemoved : (name) => dispatch(burgerBuilderActions.removeIngredients(name)),
        onInitIngredients : () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(orderActions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(authActions.setAuthRedirectPath(path))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))