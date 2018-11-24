import React, { Component } from 'react';
import Estoque from './Pages/Estoque';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarStart,
} from 'bloomer';

class App extends Component {
  render() {
    return (
      <div className="App App-container">
        <Navbar className="Navbar">
          <NavbarStart>
            <NavbarBrand>
              <NavbarItem>Fuzzy Logic</NavbarItem>
            </NavbarBrand>
          </NavbarStart>
        </Navbar>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true} component={Estoque} />
            {/* <Route path="/another" exact={true} component={AnotherTesting} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
