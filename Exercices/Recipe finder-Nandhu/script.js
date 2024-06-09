let recipes = [
    {
        name: "Spaghetti Carbonara",
        ingredients: ["spaghetti", "eggs", "cheese", "bacon"],
        time: 20,
        complexity: "easy",
        ratings: []
    },
    {
        name: "Chicken Curry",
        ingredients: ["chicken", "curry powder", "coconut milk", "onions"],
        time: 40,
        complexity: "medium",
        ratings: []
    }
];

let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

document.addEventListener('DOMContentLoaded', () => {
    displayFavoriteRecipes();
});

function searchRecipes() {
    const input = document.getElementById('ingredient-input').value.toLowerCase();
    const ingredients = input.split(',').map(ingredient => ingredient.trim());
    const results = recipes.filter(recipe =>
        ingredients.every(ingredient => recipe.ingredients.includes(ingredient))
    );

    displayRecipes(results, document.getElementById('recipe-results'));
}

function displayRecipes(recipeList, container) {
    container.innerHTML = '';
    recipeList.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.innerHTML = `
            <h3>${recipe.name}</h3>
            <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
            <p>Preparation time: ${recipe.time} minutes</p>
            <p>Complexity: ${recipe.complexity}</p>
            <button onclick="addFavorite('${recipe.name}')">Add to Favorites</button>
            <input type="number" placeholder="Rate this recipe" id="rate-${recipe.name}">
            <button onclick="rateRecipe('${recipe.name}')">Submit Rating</button>
            <p>Average Rating: ${averageRating(recipe.ratings)}</p>
        `;
        container.appendChild(recipeDiv);
    });
}

function addFavorite(recipeName) {
    const recipe = recipes.find(r => r.name === recipeName);
    if (!favoriteRecipes.includes(recipe)) {
        favoriteRecipes.push(recipe);
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        displayFavoriteRecipes();
    }
}

function displayFavoriteRecipes() {
    const container = document.getElementById('favorite-recipes');
    container.innerHTML = '';
    favoriteRecipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.innerHTML = `
            <h3>${recipe.name}</h3>
            <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
            <p>Preparation time: ${recipe.time} minutes</p>
            <p>Complexity: ${recipe.complexity}</p>
            <button onclick="removeFavorite('${recipe.name}')">Remove from Favorites</button>
        `;
        container.appendChild(recipeDiv);
    });
}

function removeFavorite(recipeName) {
    favoriteRecipes = favoriteRecipes.filter(recipe => recipe.name !== recipeName);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    displayFavoriteRecipes();
}

function addRecipe() {
    const name = document.getElementById('new-recipe-name').value;
    const ingredients = document.getElementById('new-recipe-ingredients').value.split(',').map(ingredient => ingredient.trim());
    const time = parseInt(document.getElementById('new-recipe-time').value);
    const complexity = document.getElementById('new-recipe-complexity').value;

    recipes.push({
        name: name,
        ingredients: ingredients,
        time: time,
        complexity: complexity,
        ratings: []
    });
}

function rateRecipe(recipeName) {
    const ratingInput = document.getElementById(`rate-${recipeName}`);
    const rating = parseFloat(ratingInput.value);
    const recipe = recipes.find(r => r.name === recipeName);

    if (rating && rating > 0 && rating <= 5) {
        recipe.ratings.push(rating);
        ratingInput.value = '';
        searchRecipes();
    } else {
        alert('Please enter a valid rating between 1 and 5.');
    }
}

function averageRating(ratings) {
    if (ratings.length === 0) return 'No ratings yet';
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(2);
}