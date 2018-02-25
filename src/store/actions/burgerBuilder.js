import * as actionTypes from './actions';
import axios from '../../axios-orders';
export const addIngredients  = (name) =>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredients  = (name) =>{
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

const getIngredients = (ingrenients) => {
    return {
        type: actionTypes.GET_INGREDIENTS,
        ingredients: ingrenients
    }
}

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
export const initIngredients = () => {
   return dispatch => {

        axios.get('https://burger-builder-5feae.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(getIngredients(response.data))
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed())
        })

    

   }
    
}