
function generateRecipeID() {
	return Math.random().toString(16).substring(2, 10);
}

export { generateRecipeID };