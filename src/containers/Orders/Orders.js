import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axious-orders';

import withErrorHandler from '../../hoc/withErrorHandler';
import Spinner from '../../components/UI/Spinner';
import Order from '../../components/Order';

import * as actions from '../../store/actions';

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrdersHandler(this.props.token);
  }

  render() {
    if (this.props.loading) {
      return <Spinner />
    }

    return (
      <div>
        {this.props.orders.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrdersHandler: (token) => dispatch(actions.fetchOrders(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
