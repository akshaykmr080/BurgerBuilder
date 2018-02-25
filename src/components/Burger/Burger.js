import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(keyVal => {
        
        return [...Array(props.ingredients[keyVal])].map((_, i) => {
            return <BurgerIngredient key={keyVal+i} type={keyVal}/>
        })
    
    })
    .reduce((arr, el) => {
        return arr.concat(...el);
    },[])

    //console.log(transformedIngredients)
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding Ingredients</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default Burger;