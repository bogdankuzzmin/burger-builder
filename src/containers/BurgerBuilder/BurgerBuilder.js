import React, {Component, Fragment} from 'react';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls/';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.2,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({purchasable: sum});
  };


  addIngredientHandler = (type) => {
    const oldIngredient = this.state.ingredients[type];
    const updateIngredient = oldIngredient + 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updateIngredient;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      ingredients: updateIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchaseState(updateIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldIngredient = this.state.ingredients[type];
    if (oldIngredient <= 0) {
      return;
    }
    const updateIngredient = oldIngredient - 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updateIngredient;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState((state) => {
      return {
        ingredients: {
          ...state.ingredients,
          [type]: updateIngredient,
        },
        totalPrice: newPrice,
      }
    });
    this.updatePurchaseState(updateIngredients);
  };

  clearIngredientHandler = () => {
    this.setState({
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      },
      totalPrice: 4,
      purchasable: false,
    });
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    alert('You can continue adding ingredients');
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          ingredientCleared={this.clearIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler} />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
