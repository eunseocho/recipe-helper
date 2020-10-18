import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Form from 'react-bootstrap/Form';


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
                  <Recipes recipes={this.recipes} />
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

class About extends React.Component {
  render() {
    return (
      <div className="text-center">
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
        <Form>
          <h1> Add New Recipe </h1>
          <Form.Group controlId="formRecipeName">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Recipe Name" />
          </Form.Group>
          <Form.Group controlId="formRecipeDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter Recipe Description" />
          </Form.Group>
          <Form.Group controlId="formServingCount">
            <Form.Label>Servings</Form.Label>
            <Form.Control type="text" placeholder="Enter Recipe Description" />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

class Recipe {
  constructor(recipeName, recipeID, ingredients, servings, description) {
    this.recipeName = recipeName;
    this.recipeID = recipeID;
    this.ingredients = ingredients;
    this.servings = servings;
    this.description = description;

    this.multiplyBy = this.multiplyBy.bind(this);
  }

  multiplyBy(scale) {
    var newIngredients = this.ingredients.map(ingredient => ingredient.multiplyBy(scale));
    return new Recipe(this.recipeName,
                      this.recipeID,
                      newIngredients,
                      this.servings,
                      this.description);
  }
}

class Ingredient {
  constructor(name, amount, unit) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;

    this.multiplyBy = this.multiplyBy.bind(this);
  }

  multiplyBy(scale) {
    var newAmount = this.amount.multiply(scale);
    return new Ingredient(this.name,
                          newAmount,
                          this.unit);
  }
}

export default App;
