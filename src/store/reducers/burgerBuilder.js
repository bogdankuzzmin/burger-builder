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

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const updateState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };

      return updateObject(state, updateState);

    case actionType.REMOVE_INGREDIENT:
      const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
      const updatedIngS = updateObject(state.ingredients, updatedIng);
      const updateSt = {
        ingredients: updatedIngS,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };

      return updateObject(state, updateSt);

    case actionType.CLEAR_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: 0,
          bacon: 0,
          cheese: 0,
          meat: 0,
        },
      });

    case actionType.SET_INGREDIENTS:
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

    case actionType.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {error: true});

    default:
      return state;
  }
};

export default burgerBuilder;
