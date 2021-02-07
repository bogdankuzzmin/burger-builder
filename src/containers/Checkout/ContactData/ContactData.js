import React, {Component} from 'react';
import axios from '../../../axious-orders';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button';
import Spinner from '../../../components/UI/Spinner';

class ContactData extends Component {
  state  = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHandler = (evt) => {
    evt.preventDefault();
    this.setState({loading: true});

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Bogdan',
        address: {
          street: 'Test street 12',
          zipCode: '41351',
          country: 'America',
        },
        email: 'test@mail.com',
      },
      deliveryMethod: 'fastest',
    };

    axios.post('/orders.json', order)
      .then((response) => {
        console.log(response);
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log(error);
      });
  }

  render() {
    let form = (
      <form action="">
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="text" name="email" placeholder="Your Mail" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
