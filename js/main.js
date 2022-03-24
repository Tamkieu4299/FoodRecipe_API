const inputBtn = document.querySelector('.header__input-button');
const display = document.querySelector('.display');
const recipeBtn = document.querySelector('.display__item-btn');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
// Function
const getList = async () => {
    try{
        let inputBox = document.querySelector('.header__input-box').value.trim();
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputBox}`);
        const data = await response.json();
        let html="";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "display__item" data-id = "${meal.idMeal}">
                        <div class = "display__iteml-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "display__item-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "display__item-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            display.classList.remove('notFound');
        } 
        else{
            html = "Sorry, we didn't find any meal!";
            display.classList.add('notFound');
        }

        display.innerHTML = html;

    }
    catch(err){
        console.log(err);
    }
}

const getRecipe = async (e) =>{
    try{
        e.preventDefault();
        if(e.target.classList.contains('display__item-btn')){
            let mealItem = e.target.parentElement.parentElement;
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            const data = await response.json();
            modal(data.meals);
        }
    }
    catch(err){
        console.log(err);
    }
}

// Create modal
const modal = (meals) => {
    let	meal=meals[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

// Event listener
inputBtn.addEventListener('click', getList);
display.addEventListener('click', getRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});
