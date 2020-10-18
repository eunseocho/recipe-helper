import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';

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

    this.state = {
      recipes: defaultRecipes //[]
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
        <Router>
          <Navbar className="navbar-custom">
            <Navbar.Brand href="">NomNom</Navbar.Brand>
            <Nav className="mr-auto">
              <LinkContainer className="custom-navitem" to="/about">
                <NavItem>About</NavItem>
              </LinkContainer>
              <LinkContainer className="custom-navitem" to="/recipes">
                <NavItem>My Recipes</NavItem>
              </LinkContainer>
              <LinkContainer className="custom-navitem" to="/addrecipe">
                <NavItem>Add a Recipe</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar>
          <div className="row justify-content-center ml-0 mr-0">
            <Switch>
              <Route exact path="/about">
                <div className="pt-3 col-md-6">
                  <About />
                </div>
              </Route>
              <Route exact path="/recipes">
                <div className="pt-3 col-md-6">
                  <ListRecipes recipes={this.state.recipes} />
                </div>
              </Route>
              <Route exact path="/addrecipe">
                <div className="pt-3 col-md-6">
                  <AddRecipe callback={this.addRecipe} />
                </div>
              </Route>
              <Route exact path="/">
                <Redirect to="/about" />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;