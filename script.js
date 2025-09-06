let search = document.getElementById("search");
let input = document.getElementById("input");
let dishName = document.getElementById("dish-name");
let category = document.getElementById("category");
let dishImage = document.getElementById("dish-image");
let instructions = document.getElementById("instructions");
let form = document.querySelector("#search form");

const result = document.getElementById("result");
let url;

// async that dictates what happens on api call
async function apiCall() {
    let response = await fetch(url);
    let data = await response.json();

    if (!data.meals) {
        alert("No recipe found!");
        result.classList.add("hidden"); // hide result if not found
        return;
    }

    dishName.textContent = data.meals[0].strMeal;
    category.textContent = data.meals[0].strCategory;
    dishImage.src = data.meals[0].strMealThumb;
    instructions.textContent = data.meals[0].strInstructions;

    // 👉 show result after content is updated
    result.classList.remove("hidden");
}

// event listener for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim() === "") {
        alert("Please enter a dish name!");
        result.classList.add("hidden"); // hide result if empty input
        return;
    }

    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`;
    apiCall();
    input.value = ""; // clear input field after search
});
