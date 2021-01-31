import React, {Component, Fragment} from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    const modalClass = [classes.Modal];

    if (this.props.show) {
      modalClass.push(classes.ModalShow);
    }
    return (
      <Fragment>
        <div className={modalClass.join(' ')}>
          {this.props.children}
        </div>
        <Backdrop show={this.props.show} clicked={this.props.closeModal} />
      </Fragment>
    );
  }
}

export default Modal;
