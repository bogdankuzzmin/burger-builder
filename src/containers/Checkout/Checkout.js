import React, {Fragment} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData';

const checkout = (props) => {
  const checkoutCancelled = () => {
    props.history.goBack();
  };

  const checkoutContinued = () => {
    props.history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to="/" />

  if (props.ingredients) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;

    summary = (
      <Fragment>
      {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ingredients}
          checkoutCancelled={checkoutCancelled}
          checkoutContinued={checkoutContinued} />

        <Route path={props.match.path + '/contact-data'}
                component={ContactData} />
      </Fragment>
    );
  }

  return summary;
};

const mapStateToProps = (store) => {
  return {
    ingredients: store.burgerBuilder.ingredients,
    purchased: store.order.purchased,
  };
};

export default connect(mapStateToProps)(checkout);
