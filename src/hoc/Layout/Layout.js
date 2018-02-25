import React, {Component} from 'react';
import Aux from '../../hoc/Aux//Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';


class Layout extends Component  {

    state ={
        showSideDrawer : false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    toggleSideDrawer = () => {
        //console.log('reached here');
        
         this.setState((prevState) => {
             return {showSideDrawer: !prevState.showSideDrawer}
         })
    }
    render() { 
       return( <Aux>
                    <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    toggleSideDrawer={this.toggleSideDrawer}/>
                    <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>

                    <main className={classes.Layout}>
                        {this.props.children}
                    </main>

                </Aux>
       );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null
    }
} 

export default connect(mapStateToProps)(Layout);