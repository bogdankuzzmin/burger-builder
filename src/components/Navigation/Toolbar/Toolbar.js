import React from 'react';

import classes from './Toolbar.module.css';
import BurgerLogo from '../../Logo';
import NavigationItems from '../NavigationItems';

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div>MENU</div>
      <div className={classes.Logo}>
        <BurgerLogo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
