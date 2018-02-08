import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

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
            <p><strong>Total Price : ${props.price.toFixed(2)}</strong></p>
            <p>Continus to check out</p>
            <Button clicked={props.purchaseCancled} btnType={"Danger"}>CANCEL</Button>
            <Button clicked={props.purchaseContinue} btnType={"Success"}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary