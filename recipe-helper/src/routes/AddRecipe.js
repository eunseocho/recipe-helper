import React from 'react';

import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import Ingredient from '../core/Ingredient';
import Recipe from '../core/Recipe';
import { fractionFromString } from '../core/Fraction';
import { generateRecipeID } from '../core/util';

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredientList : [], // new Ingredient("milk", new Fraction(1,1), "cup")]
    };

    this.addIngredient = this.addIngredient.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
  }

  addRecipe(event) {
    event.preventDefault();
    const recipeName = this.refs.recipeName.value;
    const recipeDescription = this.refs.recipeDescription.value;
    const servingCount = fractionFromString(this.refs.servingCount.value);
    const ingredients = this.state.ingredientList;

    this.props.callback(new Recipe(recipeName, generateRecipeID(), ingredients, servingCount, recipeDescription));
  }

  addIngredient() {
    const amount = this.refs.ingredientAmount.value;
    const unit = this.refs.ingredientUnit.value;
    const name = this.refs.ingredientName.value;

    const amountFrac = fractionFromString(amount);

    this.setState({
      ingredientList : this.state.ingredientList.concat([new Ingredient(name, amountFrac, unit)])
    });

    this.refs.ingredientAmount.value = "";
    this.refs.ingredientUnit.value = "";
    this.refs.ingredientName.value = "";
  }

  render() {
    return (
      <div className="container p-3 rounded-container rounded-20">
        <Form onSubmit={this.addRecipe}>
          <div className="border-bottom border-custom mb-3">
            <h1> Add New Recipe </h1>
          </div>
          <h3> Recipe Info </h3>
          <Form.Group controlId="formRecipeName">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control ref="recipeName" type="text" placeholder="Enter Recipe Name" />
          </Form.Group>
          <Form.Group controlId="formRecipeDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control ref="recipeDescription" type="text" placeholder="Enter Recipe Description" />
          </Form.Group>
          <Form.Group controlId="formServingCount">
            <Form.Label>Servings</Form.Label>
            <Form.Control ref="servingCount" type="text" placeholder="Enter Serving Count" />
          </Form.Group>

          <h3> Ingredients </h3>
          <div className="py-3">
            <InputGroup>
              <FormControl ref="ingredientAmount" className="col-2" placeholder="Amount" />
              <FormControl ref="ingredientUnit" className="col-3" placeholder="Unit" />
              <FormControl ref="ingredientName" placeholder="Ingredient" />
              <InputGroup.Append>
                <Button onClick={this.addIngredient}>Add</Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <ListGroup>
            {
              (this.state.ingredientList.length > 0 ?
              this.state.ingredientList.map(ingredient => (
                <ListGroup.Item> <IngredientItem ingredient={ingredient} /> </ListGroup.Item>
              )) : "Add ingredients to see them appear here!")
            }
          </ListGroup>
          <div className="row justify-content-center">
            <Button className="mt-4 col-4" type="submit">Add recipe</Button>
          </div>
        </Form>
      </div>
    );
  }
}

class IngredientItem extends React.Component {
  render() {
    return (
        <div class="row">
          <div class="col-2 border-right text-center"> {this.props.ingredient.amount.asMixedNumberString() } </div>
          <div class="col-4 border-right"> {this.props.ingredient.unit} </div>
          <div class="col-6"> {this.props.ingredient.name} </div>
        </div>
      )
  }
}

export default AddRecipe;