import React, {Component, Fragment} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData';

class Checkout extends Component {
  checkoutCancelled = () => {
    this.props.history.goBack();
  }

  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let summary = <Redirect to="/" />

    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

      summary = (
        <Fragment>
        {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelled}
            checkoutContinued={this.checkoutContinued} />

          <Route path={this.props.match.path + '/contact-data'}
                 component={ContactData} />
        </Fragment>
      );
    }

    return summary;
  }
}

const mapStateToProps = (store) => {
  return {
    ingredients: store.burgerBuilder.ingredients,
    purchased: store.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
