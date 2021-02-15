import {actionType} from './actionTypes';

export const addIngredient = (name) => {
  return {
    type: actionType.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionType.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const clearIngredient = () => {
  return {
    type: actionType.CLEAR_INGREDIENTS,
  };
};
