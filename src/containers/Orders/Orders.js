import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import axios from '../../axious-orders';

import withErrorHandler from '../../hoc/withErrorHandler';
import Spinner from '../../components/UI/Spinner';
import Order from '../../components/Order';

import * as actions from '../../store/actions';

const Orders = (props) => {
  useEffect(() => {
    props.fetchOrdersHandler(props.token, props.userId);
  }, []);

  if (props.loading) {
    return <Spinner />
  }

  return (
    <div>
      {props.orders.map(order => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrdersHandler: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
