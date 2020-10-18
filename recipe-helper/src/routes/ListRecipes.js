import React from 'react';
import Card from 'react-bootstrap/Card'

class ListRecipes extends React.Component {
	constructor(props) {
    super(props);
    this.state = {recipes : props.recipes};
    console.log(props);
  }

  render() {
    return (
      <div className="container p-3 rounded-container rounded-20">
        <div className="border-bottom border-custom">
          <h1> My Recipes </h1>
        </div>
        <div className="container pt-3 pl-0 pr-0">
          {
            this.state.recipes.map(
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
    const recipe = props.recipe;
    this.state = {
      recipeName : recipe.recipeName,
      recipeDescription : recipe.description,
      recipeId : recipe.recipeId,
      recipeServings : recipe.servings
    };
  }

  render() {
    return (
      <Card>
        <Card.Header as="h3"> Recipe: {this.state.recipeName} </Card.Header>
        <Card.Body>
          <Card.Title> {this.state.recipeDescription} </Card.Title>
          <Card.Text>
            Servings: {this.state.recipeServings}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default ListRecipes;