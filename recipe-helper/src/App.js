import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import About from './routes/About';
import AddRecipe from './routes/AddRecipe';
import ListRecipes from './routes/ListRecipes';

import Fraction from './core/Fraction';
import Ingredient from './core/Ingredient';
import Recipe from './core/Recipe';


class App extends React.Component {
  constructor(props) {
    super(props);

    var defaultRecipes = [];

    defaultRecipes.push(new Recipe("Cashew Chicken",
                                   "abc",
                                   [
                                      new Ingredient("Chicken", new Fraction(1, 1), "lb"),
                                      new Ingredient("Cashews", new Fraction(1, 1), "cup")],
                                   new Fraction(4, 1),
                                   "An exquisite delicacy from Chef Neil"));

    defaultRecipes.push(new Recipe("Shin Ramyun",
                                   "def",
                                   [
                                      new Ingredient("Shin Ramyun", new Fraction(3, 1), "packet"),
                                      new Ingredient("Egg", new Fraction(3, 1), "")],
                                   new Fraction(4, 1),
                                   "Patrick's favorite thing to cook"));

    console.log(defaultRecipes[0]);

    for (var i = 0; i < 1; i++) {
      defaultRecipes = defaultRecipes.concat(defaultRecipes);
    }

    this.state = {
      recipes: defaultRecipes //[]
    };

    console.log(this);

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
          <Navbar.Brand href="#">NomNom</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/recipes">My Recipes</Nav.Link>
            <Nav.Link href="/addrecipe">Add a Recipe</Nav.Link>
          </Nav>
        </Navbar>
        <div className="row justify-content-center ml-0 mr-0">
          <Router>
            <Switch>
              <Route path="/about">
                <div className="pt-3 col-md-6">
                  <About />
                </div>
              </Route>
              <Route path="/recipes">
                <div className="pt-3 col-md-6">
                  <ListRecipes recipes={this.state.recipes} />
                </div>
              </Route>
              <Route path="/addrecipe">
                <div className="pt-3 col-md-6">
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