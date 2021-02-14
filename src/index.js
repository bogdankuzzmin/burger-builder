import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
import {reducer} from './store';
import App from './App';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter basename="/burger">
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>, document.getElementById('root')
);
