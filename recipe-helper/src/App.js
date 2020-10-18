import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import About from './routes/About';
import AddRecipe from './routes/AddRecipe';
import ListRecipes from './routes/ListRecipes';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };

    this.updateRecipes = this.updateRecipes.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
  }

  updateRecipes(newRecipes) {
    this.setState({
      recipes: newRecipes
    });
  }

  addRecipe(newRecipe) {
    this.setState({
      recipes: this.state.recipes.concat([newRecipe])
    });
  }

  render() {
    return (
      <div className="main-page">
        <Navbar className="navbar-custom">
          <Navbar.Brand href="#">Recipe Helper</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/recipes">My Recipes</Nav.Link>
            <Nav.Link href="/addrecipe">Add a Recipe</Nav.Link>
          </Nav>
        </Navbar>
        <div className="row justify-content-center">
          <Router>
            <Switch>
              <Route path="/about">
                <div className="pt-3 col-md-6">
                  <About />
                </div>
              </Route>
              <Route path="/recipes">
                <div className="pt-3 col-md-4">
                  <ListRecipes recipes={this.recipes} />
                </div>
              </Route>
              <Route path="/addrecipe">
                <div className="pt-3 col-md-4">
                  <AddRecipe callback={this.addRecipe} />
                </div>
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;