import React, {Component} from 'react';
import Aux from '../../hoc/Aux//Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component  {

    state ={
        showSideDrawer : false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    toggleSideDrawer = () => {
        console.log('reached here');
        
         this.setState((prevState) => {
             return {showSideDrawer: !prevState.showSideDrawer}
         })
    }
    render() { 
       return( <Aux>
            <Toolbar toggleSideDrawer={this.toggleSideDrawer}/>
            <SideDrawer 
            open={this.state.showSideDrawer} 
            closed={this.sideDrawerClosedHandler}/>

            <main className={classes.Layout}>
                {this.props.children}
            </main>

        </Aux>
       );
    }
}

export default Layout;