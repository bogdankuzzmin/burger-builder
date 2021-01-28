import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => {
  const disabledClearButton = Object.values(props.disabled).every((element) => element === true);

  return (
    <div className={classes.BuildControls}>
      <p>Current price: <strong>${props.price.toFixed(2)}</strong></p>
      {controls.map((control) => {
        return <BuildControl
                  key={control.label}
                  label={control.label}
                  added={() => props.ingredientAdded(control.type)}
                  removed={() => props.ingredientRemoved(control.type)}
                  disabled={props.disabled[control.type]} />
      })}
      <button
        className={classes.ClearButton}
        onClick={props.ingredientCleared}
        disabled={disabledClearButton}>Clear</button>
      <button
        className={classes.OrderButton}
        onClick={props.ordered}
        disabled={!props.purchasable}>ORDER NOW</button>
    </div>
  );
};

export default buildControls;
