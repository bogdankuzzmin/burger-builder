import React, {Fragment} from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop';

const modal = (props) => {
  const modalClass = [classes.Modal];

  if (props.show) {
    modalClass.push(classes.ModalShow);
  }

  return (
    <Fragment>
      <div className={modalClass.join(' ')}>
        {props.children}
      </div>
      <Backdrop show={props.show} closeModal={props.closeModal} />
    </Fragment>

  );
};

export default modal;
