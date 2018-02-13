import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      
      <div className="App">
        <Layout>
          <Switch>
                    { <Route path='/check-out'  component={CheckOut} />}
                    {<Route path='/orders' component={Orders} />}
                    { <Route path='/' component={BurgerBuilder} />}
                    <Route render={() => <h1>Not Found</h1>} />
                    {/* <Redirect from='/' to = '/posts' /> */}
                </Switch>
        </Layout>
        
      </div>
      
    );
  }
}

export default App;
