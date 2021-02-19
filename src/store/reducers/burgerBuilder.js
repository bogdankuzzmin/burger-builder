import {actionType} from '../actions';
import {updateObject} from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.2,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updateState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
  };

  return updateObject(state, updateState);
};

const removeIngredient = (state, action) => {
  const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
  const updatedIngS = updateObject(state.ingredients, updatedIng);
  const updateSt = {
    ingredients: updatedIngS,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
  };

  return updateObject(state, updateSt);
};

const clearIngredients = (state) => {
  return updateObject(state, {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
  });
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      meat: action.ingredients.meat,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
    },
    totalPrice: 4,
    error: false,
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, {error: true});
};


const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT: return addIngredient(state, action);
    case actionType.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionType.CLEAR_INGREDIENTS: return clearIngredients(state);
    case actionType.SET_INGREDIENTS: return setIngredients(state, action);
    case actionType.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default: return state;
  }
};

export default burgerBuilder;
