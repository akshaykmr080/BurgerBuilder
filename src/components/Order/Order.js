import React from 'react';
import classes from './Order.css'
const order = (props) => {
    let ingredients = [];
    for(let key in props.ingredients){
        ingredients.push(<span 
            style = {{
                textTransform:'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid black',
                padding: '5px'}}
            key={key}>{key}:({props.ingredients[key]})
        </span>)
    }
    return (
        <div className={classes.Order}>
            <p>Ingredients : {ingredients}</p>
            <p>Total price: <strong>USD {props.totalPrice.toFixed(2)}</strong></p>
        </div>
    )
}

export default order 