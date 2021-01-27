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
  return (
    <div className={classes.BuildControls}>
      {controls.map((control) => {
        return <BuildControl
                  key={control.label}
                  label={control.label}
                  added={() => props.ingredientAdded(control.type)}
                  removed={() => props.ingredientRemoved(control.type)}
                  disabled={props.disabled[control.type]} />
      })}
      <button onClick={props.ingredientCleared}>Clear</button>
    </div>
  );
};

export default buildControls;
