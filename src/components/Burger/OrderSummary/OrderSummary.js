import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    render() {
        let ingredientSummary = Object.keys(this.props.ingredients)
                              .map((keyval,i) => {
                                  return <li key={i}><span style={{textTransform: 'capitalize'}}>{keyval} </span> : {this.props.ingredients[keyval]}</li>
                              })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price : ${this.props.price.toFixed(2)}</strong></p>
                <p>Continus to check out</p>
                <Button clicked={this.props.purchaseCancled} btnType={"Danger"}>CANCEL</Button>
                <Button clicked={this.props.purchaseContinue} btnType={"Success"}>CONTINUE</Button>
            </Aux>
        )
    }

}

export default OrderSummary;