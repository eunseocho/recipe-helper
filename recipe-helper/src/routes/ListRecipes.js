import React from 'react';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

class ListRecipes extends React.Component {
	constructor(props) {
    super(props);
    this.state = {recipes : props.recipes}
  }

  render() {
    return (
      //<div>
        //<p> This is the Recipes component! </p>
      //</div>
     <Card style={{ width: '18rem' }}>
 		   <ListGroup variant="flush">
 		     <ListGroup.Item>Cras justo odio</ListGroup.Item>
  	   </ListGroup>
	   </Card>
    );
  }
}

export default ListRecipes;