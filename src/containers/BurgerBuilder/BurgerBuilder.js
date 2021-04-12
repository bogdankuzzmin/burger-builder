import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from '../../axious-orders';

import {
  addIngredient,
  removeIngredient,
  initIngredients,
  purchaseInit,
  setAuthRedirectPath
} from '../../store/actions';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls/';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const {initIngredientsHandler} = props;

  useEffect(() => {
    initIngredientsHandler();
  }, [initIngredientsHandler]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.setAuthRedirectHandler('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.initPurchaseHandler();
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...props.ingredients
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = props.error ? <p>Something went wrong!</p> : <Spinner />;

  if (props.ingredients) {
    burger = (
      <Fragment>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          ingredientAdded={props.addIngredientHandler}
          ingredientRemoved={props.removeIngredientHandler}
          ingredientCleared={props.clearIngredientsHandler}
          disabled={disabledInfo}
          price={props.totalPrice}
          purchasable={updatePurchaseState(props.ingredients)}
          isAuth={props.isAuthenticated}
          ordered={purchaseHandler} />
      </Fragment>
    )
    orderSummary = <OrderSummary
      ingredients={props.ingredients}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
      price={props.totalPrice}
    />
  }

  return (
    <Fragment>
      <Modal show={purchasing} closeModal={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientHandler: (igName) => dispatch(addIngredient(igName)),
    removeIngredientHandler: (igName) => dispatch(removeIngredient(igName)),
    clearIngredientsHandler: () => dispatch(initIngredients()),
    initIngredientsHandler: () => dispatch(initIngredients()),
    initPurchaseHandler: () => dispatch(purchaseInit()),
    setAuthRedirectHandler: (path) => dispatch(setAuthRedirectPath(path)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
