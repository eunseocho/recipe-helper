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
import ShowRecipe from './routes/ShowRecipe';

import { Fraction, fractionFromString } from './core/Fraction';
import Ingredient from './core/Ingredient';
import Recipe from './core/Recipe';
import { generateRecipeID } from './core/util';


class App extends React.Component {
  constructor(props) {
    super(props);

    var defaultRecipes = [];

    defaultRecipes.push(new Recipe("Cashew Chicken",
                                   generateRecipeID(),
                                   [
                                      new Ingredient("roasted, unsalted cashews", new Fraction(3, 4), "cup"),
                                      new Ingredient("water", new Fraction(1, 4), "cup"),
                                      new Ingredient("cornstarch", new Fraction(2, 1), "tsp"),
                                      new Ingredient("hoisin sauce", new Fraction(4, 1), "tbsp"),
                                      new Ingredient("soy sauce", new Fraction(1, 1), "tbsp"),
                                      new Ingredient("chicken thigh", new Fraction(3, 2), "lb"),
                                      new Ingredient("vegetable oil", new Fraction(2, 1), "tbsp"),
                                      new Ingredient("garlic, minced", new Fraction(6, 1), "clove"),
                                      new Ingredient("scallions", new Fraction(8, 1), ""),
                                      new Ingredient("rice vinegar", new Fraction(2, 1), "tbsp"),
                                      new Ingredient("sesame oil", new Fraction(1, 2), "tsp")],
                                   new Fraction(4, 1),
                                   "An exquisite delicacy from Chef Neil"));

    defaultRecipes.push(new Recipe("Peanut Butter Cookies",
                                   generateRecipeID(),
                                   [
                                      new Ingredient("rolled oats", fractionFromString("55"), "grams"),
                                      new Ingredient("chickpea flour", fractionFromString("60"), "grams"),
                                      new Ingredient("coconut sugar", fractionFromString("100"), "grams"),
                                      new Ingredient("baking soda", fractionFromString("1/2"), "teaspoon"),
                                      new Ingredient("chunky peanut butter", fractionFromString("320"), "grams"),
                                      new Ingredient("rice syrup", fractionFromString("70"), "grams"),
                                      new Ingredient("water", fractionFromString("3"), "tablespoons"),
                                      new Ingredient("vanilla extract", fractionFromString("1"), "teaspoon")],
                                   new Fraction(12, 1),
                                   "Imported from norecipes.com/peanut-butter-cookies-recipe"));

    /*defaultRecipes.push(new Recipe("Shin Ramyun",
                                   generateRecipeID(),
                                   [
                                      new Ingredient("Shin Ramyun", new Fraction(3, 1), "packet"),
                                      new Ingredient("Egg", new Fraction(3, 1), "")],
                                   new Fraction(5, 1),
                                   "Patrick's favorite thing to cook"));*/

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
            <div className="pt-3 col-md-6">
              <Switch>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route exact path="/recipes">
                  <ListRecipes recipes={this.state.recipes} />
                </Route>
                <Route exact path="/addrecipe" render={
                  (props) => (
                      <AddRecipe {...props} callback={this.addRecipe} />
                    )
                } />
                <Route path="/recipe/:recipeID" render={
                  (props) => (
                      <ShowRecipe {...props} recipes={this.state.recipes} />
                    )
                } />
                <Route exact path="/">
                  <Redirect to="/about" />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;