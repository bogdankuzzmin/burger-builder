import React, {Component, Fragment} from 'react';
import axios from '../../axious-orders';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls/';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.2,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    axios.get('https://burger-builder-df1f2-default-rtdb.firebaseio.com/ingredients.json')
      .then((response) => {
        this.setState({ingredients: response.data});
      })
      .catch((error) => {
        this.setState({error: true});
      });
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
    this.setState({loading: true});

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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
        this.setState({loading: false, purchasing: false});
      })
      .catch((error) => {
        this.setState({loading: false, purchasing: false});
        console.log(error);
      });
  };

  render() {
    console.log(this.state.ingredients);
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Something went wrong!</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Fragment>
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
      )
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
