import asyncLazyLoad from './hoc/asyncLazyLoad/asyncLazyLoad'

import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';

const asyncCheckOut = asyncLazyLoad(() => {
    return import('./containers/CheckOut/CheckOut');
})

const asyncOrders = asyncLazyLoad(() => {
    return import('./containers/Orders/Orders');
})

const asyncAuth = asyncLazyLoad(() => {
    return import('./containers/Auth/Auth');
})

class App extends Component {

  
  componentDidMount() {
    this.props.onTryAutoSignIn()
  }

  render() {

    let routes = 
      <Switch>
        <Route path='/auth'  component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>


    if(this.props.isAuthenticated){
      routes = 
      <Switch>
        <Route path='/check-out'  component={asyncCheckOut} />
        <Route path='/orders' component={asyncOrders} />
        <Route path='/auth'  component={asyncAuth} />
        <Route path='/logout'  component={Logout} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
        <Route render={() => <h1>Not Found</h1>} />
     </Switch>
    }

    return(
      <div className="App">
        <Layout>
          {routes}
        </Layout>
        
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignIn : () => dispatch(actions.checkAuthState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
