import React from 'react';

import classes from './SideDrawer.module.css';
import Logo from '../../Logo';
import NavigationItems from '../../Navigation/NavigationItems';

const sideDrawer = (props) => {
  return (
    <div className={classes.SideDrawer}>
      <Logo />
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default sideDrawer;
