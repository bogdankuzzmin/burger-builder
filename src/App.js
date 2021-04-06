import React, {useEffect} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import asyncComponent from './hoc/asyncComponent';
import * as actions from './store/actions';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

const asyncCheckout = asyncComponent(() => {
  return import ('./containers/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import ('./containers/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import ('./containers/Auth');
});

const app = (props) => {
  useEffect(() => {
    props.tryAutoSignupHandler();
  }, []);
  
  let routes = (
    <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div className="App">
      <p>Burger Builder</p>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tryAutoSignupHandler: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
