import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckOutSummary.css';

const checkOutSummary  = (props) => {

    return  (
        <div className={classes.CheckOutSummary}>
            <h1>
                We hope it tastes well
            </h1>
            
            <Burger classname={classes.Burger} ingredients={props.ingredients} />
            
            <Button 
                btnType="Danger"
                clicked={props.cancelClicked}>
                CANCEL
            </Button>
            <Button 
                btnType="Success"
                clicked={props.continueClicked}>
                CONTINUE
            </Button>
        </div>
    )
}

export  default checkOutSummary