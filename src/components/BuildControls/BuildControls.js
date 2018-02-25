import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = (props) => {
   return ( <div className={classes.BuildControls}>
        <p><strong>Current Price: {props.price.toFixed(2)}</strong></p>
        {controls.map(control => {

            return <BuildControl 
                    key={control.label} 
                    label={control.type} 
                    more={() => props.ingredientAdded(control.type)}
                    less={() => props.ingredientDeleted(control.type)}
                    disabled={props.disabled[control.type]}/>

        })
        }
        <button 
        className={classes.OrderButton} 
        disabled={!props.purchasable}
        onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
   )
}

export default buildControls;