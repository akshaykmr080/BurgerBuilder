import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        //console.log('closing')
        
        this.setState({purchasing: false});

    }

    purchaseContinueHandler = () => {

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        
        const quesyString = queryParams.join('&');
        this.props.history.push({
            pathname: '/check-out',
            search: '?'+quesyString
        });
        //alert("continue purchase");
        
        
    }

    updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients)
                    .map(key => {
                        return ingredients[key]
                    })
                    .reduce((sum, val) => {
                        return sum + val
                    }, 0);
        this.setState({purchasable: sum>0});
    }

    addIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        let updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        let newPrice = this.state.totalPrice + priceAddition;

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];

        if(oldCount <= 0) return;

        const updatedCount = oldCount - 1;
        let updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        let newPrice = this.state.totalPrice - priceDeduction;

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    render () {
        let disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]>0 ? false : true
        }
        let orderStatus = null;
        if(this.state.ingredients){
            orderStatus = <OrderSummary 
                    purchaseCancled = {this.purchaseCancelHandler}
                    purchaseContinue= {this.purchaseContinueHandler}
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}/>
        }
        
        //orderStatus = <Spinner/>;
        if(this.state.loading){
            orderStatus = <Spinner />;
        }
        let burger = this.state.error ?<p>Ingredients cant be loaded</p> : <Spinner/>

        if(this.state.ingredients){
            burger = <Aux>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls 
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientDeleted = {this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price= {this.state.totalPrice}
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
        axios.get('https://burger-builder-5feae.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        })
        .catch(error => {
            this.setState({error: true})
        })
    }
}

export default withErrorHandler(BurgerBuilder, axios);