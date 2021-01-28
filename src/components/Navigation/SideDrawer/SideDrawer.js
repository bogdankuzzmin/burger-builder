import React from 'react';

import classes from './SideDrawer.module.css';
import BurgerLogo from '../../Logo';
import NavigationItems from '../../Navigation/NavigationItems';

const sideDrawer = (props) => {
  return (
    <div className={classes.SideDrawer}>
      <BurgerLogo height="11%" />
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default sideDrawer;
