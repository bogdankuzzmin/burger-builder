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

  const sideDrawerClickCloseHandler = (event) => {
    if (event.target.closest('a')) {
      props.closed();
    }
  };

  return (
    <Fragment>
      <div className={attachedClasses.join(' ')} onClick={sideDrawerClickCloseHandler}>
        <div className={classes.Logo}>
          <BurgerLogo />
        </div>
        <nav>
          <NavigationItems
            isAuthenticated={props.isAuth}
            show={props.open}
            clicked={props.closed} />
        </nav>
      </div>

      <Backdrop show={props.open} clicked={props.closed} />
    </Fragment>
  );
};

export default sideDrawer;
