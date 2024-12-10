const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
const recipeAddBtn = document.querySelector(".addBtn");
const addDetails = document.querySelector(".addlist");
const addCloseBtn = document.querySelector(".add-close-btn");
const section = document.getElementById("section");
const add = document.querySelector(".add");

// Funtion to retrieve recipes

const fetchRecipes = async (query) => {
  recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";

  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );

  const response = await data.json();

  recipeContainer.innerHTML = "";
  response.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <Span>${meal.strCategory}</span> Category</p>

    `;
    const button = document.createElement("button");
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);

    //Add eventlistener to recipe buttons
    button.addEventListener("click", () => {
      openRecipePopup(meal);
    });

    recipeContainer.appendChild(recipeDiv);
  });
};

//Function to fetch Ingredients and Measurements
const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
  <h2 class="recipeName">${meal.strMeal}</h2>
  <h3>Ingredients:</h3>
  <ul class="ingredientList">${fetchIngredients(meal)}</ul>
  <div class="recipeInstructions">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
  </div>

 

  `;

  recipeDetailsContent.parentElement.style.display = "block";
};
recipeCloseBtn.addEventListener("click", () => {
  recipeDetailsContent.parentElement.style.display = "none";
});
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipeContainer.innerHTML = `<h2>Type the meal in the search box</h2">`;
    return;
  }

  fetchRecipes(searchInput);

  // console.log("Button Clicked");
});

recipeAddBtn.addEventListener("click", () => {
  section.style.display = "block";
  addDetails.style.display = "block";
  addCloseBtn.style.display = "block";

  // searchInput.style.display = "none";
});
addCloseBtn.addEventListener("click", () => {
  addDetails.style.display = "none";
  section.style.display = "block";
});

add.addEventListener("click", function (e) {
  e.preventDefault();
  /*if (input = ""){
    alert("pls fill out this field")
  }*/
  alert("Your recipe has been added.");
});
/*
window.addEventListener("load", () => {
  add = JSON.parse(localStorage.getItem("add")) || [];



*/
