import React, {Fragment, useEffect, useState} from 'react';

import Modal from '../../components/UI/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);
    console.log(error);
    const requestInterceptor = axios.interceptors.request.use(request => {
      setError(null);
      return request;
    });

    const responseInterceptor = axios.interceptors.response.use(response => response, responseError => {
      setError(responseError);

      return Promise.reject(responseError);
    });
    
    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      };
    }, [requestInterceptor, responseInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Fragment>
        <Modal
          show={error}
          closeModal={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};

export default withErrorHandler;
