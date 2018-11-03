import React, { Component } from 'react';
import AnotherTesting from './Components/AnotherTesting';
import Estoque from './Pages/Estoque';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true} component={Estoque} />
            <Route path="/another" exact={true} component={AnotherTesting} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
