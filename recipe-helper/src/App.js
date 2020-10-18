import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import logo from './logo.svg';
//import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#">Recipe Helper</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/recipes">My Recipes</Nav.Link>
            <Nav.Link href="/addrecipe">Add a Recipe</Nav.Link>
          </Nav>
        </Navbar>
        <div class="row justify-content-center">
          <Router>
            <Switch>
              <Route path="/about">
                <div class="pt-3 col-md-6">
                  <About />
                </div>
              </Route>
              <Route path="/recipes">
                <div class="pt-3 col-md-4">
                  <Recipes />
                </div>
              </Route>
              <Route path="/addrecipe">
                <div class="pt-3 col-md-4">
                  <AddRecipe />
                </div>
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

class About extends React.Component {
  render() {
    return (
      <div class="text-center">
        <h1> Welcome to Recipe Helper! </h1>
        <p> This app is designed for HackGT 7! More information coming soon! </p>
      </div>
    );
  }
}

class Recipes extends React.Component {
  render() {
    return (
      <div>
        <p> This is the Recipes component! </p>
      </div>
    );
  }
}

class AddRecipe extends React.Component {
  render() {
    return (
      <div>
        <p> This is the AddRecipe component! </p>
      </div>
    );
  }
}

export default App;
