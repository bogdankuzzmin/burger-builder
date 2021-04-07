import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actions from '../../../store/actions';

const Logout = (props) => {
  useEffect(() => {
    props.logoutHandler();
  }, []);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutHandler: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
