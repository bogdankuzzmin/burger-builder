import React, {Component, Fragment} from 'react';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls/';

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
  }

  addIngredientHandler = (type) => {
    const oldIngredient = this.state.ingredients[type];
    const updateIngredient = oldIngredient + 1;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState((state) => {
      return {
        ingredients: {
          ...state.ingredients,
          [type]: updateIngredient
        },
        totalPrice: newPrice,
      }
    });
  };

  removeIngredientHandler = (type) => {
    const oldIngredient = this.state.ingredients[type];
    if (oldIngredient <= 0) {
      return;
    }
    const updateIngredient = oldIngredient - 1;

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
  };

  clearIngredientHandler = () => {
    this.setState({
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      }
    });
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
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          ingredientCleared={this.clearIngredientHandler}
          disabled={disabledInfo} />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
