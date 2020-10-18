import React from 'react';
import Card from 'react-bootstrap/Card'
import '../App.css';

class ListRecipes extends React.Component {
	constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container p-3 rounded-container rounded-20">
        <div className="border-bottom border-custom">
          <h1> My Recipes </h1>
        </div>
        <div className="container pt-3 pl-0 pr-0">
          {
            this.props.recipes.map(
              recipe => (
                  <div className="pt-2 pb-2">
                    <RecipeCard recipe={recipe} />
                  </div>
                )
            )
          }
        </div>
      </div>
    );
  }
}

class RecipeCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <Card.Header as="h3"> Recipe: {this.props.recipe.recipeName} </Card.Header>
        <Card.Body>
          <Card.Title> {this.props.recipe.description} </Card.Title>
          <Card.Text>
            Servings: {this.props.recipe.servings.asMixedNumberString()}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default ListRecipes;