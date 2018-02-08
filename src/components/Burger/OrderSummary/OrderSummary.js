import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
                              .map((keyval,i) => {
                                  return <li key={i}><span style={{textTransform: 'capitalize'}}>{keyval} </span> : {props.ingredients[keyval]}</li>
                              })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continus to check out</p>
        </Aux>
    )
}

export default orderSummary