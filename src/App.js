import React, { Component } from 'react';
import Testing from './Components/Testing';
import AnotherTesting from './Components/AnotherTesting';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true} component={Testing} />
            <Route path="/another" exact={true} component={AnotherTesting} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
