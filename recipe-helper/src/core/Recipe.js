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
                      this.servings.multiply(scale),
                      this.description);
  }
}

export default Recipe;