import React, {Fragment} from 'react';

import classes from './SideDrawer.module.css';
import BurgerLogo from '../../Logo';
import NavigationItems from '../../Navigation/NavigationItems';
import Backdrop from '../../UI/Backdrop';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Fragment>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <BurgerLogo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>

      <Backdrop show={props.open} clicked={props.closed} />
    </Fragment>
  );
};

export default sideDrawer;
