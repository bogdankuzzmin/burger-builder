import React from 'react';

import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => {
  return (
    <div className={classes.DrawerToggle}
         onClick={props.clicked} tabIndex="1">
    </div>
  );
};

export default drawerToggle;
