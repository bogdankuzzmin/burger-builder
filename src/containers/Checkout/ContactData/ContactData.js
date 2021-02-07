import React, {Component} from 'react';
import axios from '../../../axious-orders';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button';
import Spinner from '../../../components/UI/Spinner';
import Input from '../../../components/UI/Input';

class ContactData extends Component {
  state  = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP',
        },
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail',
        },
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
            ],
        },
        value: '',
      },
    },
    loading: false,
  }

  orderHandler = (evt) => {
    evt.preventDefault();
    this.setState({loading: true});

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,

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
        <Input elementType="..." elementConfig="..." value="" />
        <Input inputtype='input' type="text" name="email" placeholder="Your Mail" />
        <Input inputtype='input' type="text" name="street" placeholder="Street" />
        <Input inputtype='input' type="text" name="postal" placeholder="Postal Code" />
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
