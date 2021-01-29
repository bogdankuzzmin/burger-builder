import React from 'react';

import classes from './SideDrawer.module.css';
import BurgerLogo from '../../Logo';
import NavigationItems from '../../Navigation/NavigationItems';

const sideDrawer = (props) => {
  return (
    <div className={classes.SideDrawer}>
      <div className={classes.Logo}>
        <BurgerLogo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default sideDrawer;
