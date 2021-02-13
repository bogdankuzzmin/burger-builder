import React, {Component, Fragment} from 'react';
import axios from '../../axious-orders';
import {connect} from 'react-redux';

import {actionType} from '../../store';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls/';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    console.log(this.props);
    // axios.get('https://burger-builder-df1f2-default-rtdb.firebaseio.com/ingredients.json')
    //   .then((response) => {
    //     this.setState({ingredients: response.data});
    //   })
    //   .catch((error) => {
    //     this.setState({error: true});
    //   });
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };

  render() {
    console.log(this.props.ingredients);
    const disabledInfo = {
      ...this.props.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Something went wrong!</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.addIngredientHandler}
            ingredientRemoved={this.props.removeIngredientHandler}
            ingredientCleared={this.props.clearIngredientsHandler}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler} />
        </Fragment>
      )
      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.totalPrice}
      />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    ingredients: store.ingredients,
    totalPrice: store.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientHandler: (igName) => dispatch({type: actionType.ADD_INGREDIENT, ingredientName: igName}),
    removeIngredientHandler: (igName) => dispatch({type: actionType.REMOVE_INGREDIENT, ingredientName: igName}),
    clearIngredientsHandler: () => dispatch({type: actionType.CLEAR_INGREDIENTS}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
