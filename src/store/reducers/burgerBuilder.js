import * as actionTypes from '../actions/actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 5,
    error: false,
    building: false
}

const addIngredient = (state, action) => {
    return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
}

const removeIngredients = (state, action) => {
    return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]  - 1 >= 0 ? state.ingredients[action.ingredientName]  - 1 : 0
                },
                totalPrice: state.totalPrice > 4 ? state.totalPrice - INGREDIENT_PRICES[action.ingredientName] : 4,
                building: true
            }
}

const getIngredients = (state, action) => {
    return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.salad,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 5,
                error: false,
                building: false
            }
}

const fetchIngredientsFailed = (state, action) => {
    return {
                ...state,
                error: true
            }
}
const burgerBuilderReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT : return addIngredient(state, action)
            
        case actionTypes.REMOVE_INGREDIENT : return removeIngredients(state, action)
            
        case actionTypes.GET_INGREDIENTS: return getIngredients(state, action)
            
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
            
        default: return state;
    }
}

export default burgerBuilderReducer;