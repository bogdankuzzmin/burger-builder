import React, {Component} from 'react';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>Burger Builder</p>
        <Layout />
        <BurgerBuilder />
      </div>
    );
  }
}

export default App;
