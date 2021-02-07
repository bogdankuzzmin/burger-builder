import React, {Component} from 'react';
import axios from '../../axious-orders';

import withErrorHandler from '../../hoc/withErrorHandler';
import Spinner from '../../components/UI/Spinner';
import Order from '../../components/Order';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
    error: false,
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then((response) => {
        const fetchedOrders = [];

        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key
          });
        }
        this.setState({loading: false, orders: fetchedOrders});
      })
      .catch((error) => {
        this.setState({loading: false, error: true});
      });
  }

  render() {
    if (this.state.loading) {
      return <Spinner />
    }

    return (
      <div>
        {this.state.orders.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
