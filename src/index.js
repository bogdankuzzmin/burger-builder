import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import App from './App';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(burgerBuilderReducer, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter basename="/burger">
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>, document.getElementById('root')
);
