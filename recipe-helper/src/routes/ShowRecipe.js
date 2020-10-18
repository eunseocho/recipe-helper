import React from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { fractionFromString } from '../core/Fraction';

class ShowRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.getMatchedRecipe = this.getMatchedRecipe.bind(this);
    this.updateDesiredServings = this.updateDesiredServings.bind(this);

    const recipe = this.getMatchedRecipe();

    this.state = {
      desiredServings : (recipe !== null ? recipe.servings : 1)
    };
  }

  updateDesiredServings() {
    const desiredServings = fractionFromString(this.refs.servingCount.value);
    this.setState({
      desiredServings : desiredServings
    });
  }

  getMatchedRecipe() {
    const { recipeID } = this.props.match.params;
    const matchingRecipes = this.props.recipes.filter(recipe => recipe.recipeID === recipeID);
    return (matchingRecipes.length > 0 ? matchingRecipes[0] : null);
  }

  componentDidMount() {
    const recipe = this.getMatchedRecipe();
    if (recipe !== null) {
      this.refs.servingCount.value = recipe.servings.asMixedNumberString();
    }
  }

  render() {
    const originalRecipe = this.getMatchedRecipe();
    if (originalRecipe === null) {
      return (
          <h1> Could not find recipe! </h1>
        )
    } else {
      const recipe = originalRecipe.multiplyBy(this.state.desiredServings.divide(originalRecipe.servings));
      return (
        <div className="container p-3 rounded-container rounded-20">
          <div className="border-bottom border-custom">
            <h1> {recipe.recipeName} </h1>
          </div>
          <p className="pt-2 m-0"> {recipe.description} </p>

          <InputGroup className="mt-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Servings:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl ref="servingCount" />
            <Button onClick={this.updateDesiredServings}>Update</Button>
          </InputGroup>

          <h4 className="pt-3"> Ingredients </h4>
          <div className="container pt-3 pl-0 pr-0">
            <ListGroup>
              {
                (recipe.ingredients.length > 0 ?
                recipe.ingredients.map(ingredient => (
                  <ListGroup.Item> <IngredientItem ingredient={ingredient} /> </ListGroup.Item>
                )) : "This recipe has no ingredients!")
              }
            </ListGroup>
          </div>
        </div>
      );

    }
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

export default ShowRecipe;