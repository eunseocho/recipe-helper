import React from 'react';

class About extends React.Component {
  render() {
    return (
      <div className="text-center pt-5">
        <h1> Welcome to NomNom! </h1>
        <div className="pt-5">
	        <p> NomNom is the simple,
	        no-math solution for recipe and ingredient calculation. </p>
	        <p> It provides a easy to use interface to input your recipes,
	        and allows convenient storage and scaling of your recipes
	        to any number of servings! </p>
        </div>
      </div>
    );
  }
}

export default About;