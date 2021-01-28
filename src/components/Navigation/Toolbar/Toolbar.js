import React from 'react';

import classes from './Toolbar.module.css';
import BurgerLogo from '../../Logo';
import NavigationItems from '../NavigationItems';

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div>MENU</div>
      <BurgerLogo height="80%" />
      <nav>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
