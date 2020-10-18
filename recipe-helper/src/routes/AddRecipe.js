import React from 'react';
import Form from 'react-bootstrap/Form';

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

export default AddRecipe;