import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.order.ingredients) {
    ingredients.push(
      {
        name: ingredientName,
        amount: props.order.ingredients[ingredientName]
      }
    )
  }

  const ingredientOutput = ingredients.map(ingredient => {
    return <span
      style={{
        display: 'inline-block',
        margin: '0 8px',
        padding: '5px',
        textTransform: 'capitalize',
        border: '1px solid gray',
      }}
      key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>$ {Number(props.order.price).toFixed(2)}</strong></p>
    </div>
  );
}

export default order;
