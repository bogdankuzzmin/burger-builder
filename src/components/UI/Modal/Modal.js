import React, {Fragment, memo} from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop';

const Modal = (props) => {
  const modalClass = [classes.Modal];

  if (props.show) {
    modalClass.push(classes.ModalShow);
  }
  return (
    <Fragment>
      <div className={modalClass.join(' ')}>
        {props.children}
      </div>
      <Backdrop show={props.show} clicked={props.closeModal} />
    </Fragment>
  );
};

export default memo(Modal, (prevProps, nextProps) => 
  nextProps.show === prevProps.show && 
  nextProps.children === prevProps.children);
