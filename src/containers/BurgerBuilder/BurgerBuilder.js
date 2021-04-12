import React, {Fragment, useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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

  const dispatch = useDispatch();

  const ingredients = useSelector(state => state.burgerBuilder.ingredients);
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated =  useSelector(state => state.auth.token !== null);

  const addIngredientHandler = (igName) => dispatch(addIngredient(igName));
  const removeIngredientHandler = (igName) => dispatch(removeIngredient(igName));
  const clearIngredientsHandler = () => dispatch(initIngredients());
  const initIngredientsHandler = useCallback(() => dispatch(initIngredients()), [dispatch]);
  const initPurchaseHandler = () => dispatch(purchaseInit());
  const setAuthRedirectHandler = (path) => dispatch(setAuthRedirectPath(path));

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
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      setAuthRedirectHandler('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    initPurchaseHandler();
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...ingredients
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = error ? <p>Something went wrong!</p> : <Spinner />;

  if (ingredients) {
    burger = (
      <Fragment>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={addIngredientHandler}
          ingredientRemoved={removeIngredientHandler}
          ingredientCleared={clearIngredientsHandler}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={updatePurchaseState(ingredients)}
          isAuth={isAuthenticated}
          ordered={purchaseHandler} />
      </Fragment>
    )
    orderSummary = <OrderSummary
      ingredients={ingredients}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
      price={totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
