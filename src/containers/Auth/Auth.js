import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './Auth.module.css';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';

import * as actions from '../../store/actions';
import {updateObject, checkValidity} from '../../shared/utility';

const Auth = (props) => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  const [isSignup, setIsSignup] = useState(true);

  const {buildingBurger, authRedirectPath, setAuthRedirectPath} = props;
  
  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      setAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, setAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, authForm[controlName].validation),
        touched: true,
      })
    });

    setAuthForm(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    props.authHandler(authForm.email.value, authForm.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementsArray = [];

  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key],
    });
  }

  let form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      changed={(event) => inputChangedHandler(event, formElement.id)}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      required={formElement.config.validation.required} />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = (
      <p>{props.error.message}</p>
    );
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">Submit</Button>
      </form>
        <Button
          btnType="Danger"
          clicked={switchAuthModeHandler}>
          Switch to {isSignup ? 'Sign In' : 'Sign up'}
        </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return  {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authHandler: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
