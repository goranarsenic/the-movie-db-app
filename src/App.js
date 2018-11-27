import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './containers/home';
import Details from './containers/details';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/details/:category/:id' component={Details} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
