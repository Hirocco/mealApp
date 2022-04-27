const mealContainer = document.querySelector('.mealContainer'); //this one will be used for every call 
const input = document.getElementById('input-bar');         //simply input


document.getElementById('random-meal-btn').onclick = () =>
{
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
        createMeal(res.meals[0]);
    });
}
//it is for picking random index in array of categories/area/ingredient search 
function randomNumber(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

document.getElementById('submit-btn').onclick = async function () {
    const radioValue = document.getElementsByName('options');
    let searchBar = input.value;

    //this is for checking which radio-btn got pressed
    for (let i = 0; i < radioValue.length; i++) {
        if (radioValue[i].checked && input.value != "") {
            switch (radioValue[i].value) {
                case "area":
                   //we make specific call here
                   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchBar}`)
                    .then(res =>res.json())
                    .then(res =>{
                        //console.log(res.meals[randomNumber(0,res.meals.length)-1]);
                        createSuggestion(res.meals[randomNumber(0,res.meals.length)-1]);
                    });
                    
                break;
                case "ingredient": 
                    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchBar}`)
                    .then(res =>res.json())
                    .then(res =>{
                        createSuggestion(res.meals[randomNumber(0,res.meals.length)-1]);
                    });
                
                break;
                case "category":
                    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchBar}`)
                    .then(res =>res.json())
                    .then(res =>{
                        createSuggestion(res.meals[randomNumber(0,res.meals.length)-1]);
                    });
                break;
                case "name":
                    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBar}`)
                    .then(res =>res.json())
                    .then(res =>{
                       createMeal(res.meals[0]);
                    });    
                break;
            }

        }
    }
}
const createSuggestion = (meal) =>
{
    console.log(meal)
    const html = 
    `
    <div id="middle-hero" class="text-center grid text-white text-4xl">
        ${meal.strMeal ? `<h1 class="mb-10">Meal name: ${meal.strMeal}</h1>`: ''}
        <img src="${meal.strMealThumb}" class="max-h-70 max-w-xl rounded justify-self-center">
    </div>
    `
    mealContainer.innerHTML = html;
    input.value = "";
}

//Here is the display part
const createMeal = (meal) =>
{
        const ingredients_measures = [];
        for(let i=1;i<=20;i++)
        {
            if(meal[`strIngredient${i}`] !=""){
                ingredients_measures.push(meal[`strIngredient${i}`] + ' : ' + meal[`strMeasure${i}`]);
            }else{
                break;
            }
        }
        console.log(ingredients_measures);

    const html=
    `
       <div id="middle-hero" class="text-center grid text-white text-lg m-5">
            <img src="${meal.strMealThumb}" class="max-h-70 max-w-xl justify-self-center">
            ${meal.strMeal ? `<h1>Meal name: ${meal.strMeal}</h1>`: ''}
            ${meal.strArea ? `<h1>Area & category: ${meal.strArea} , ${meal.strCategory}</h1>` : ''}
            ${meal.strDrinkAlternate ? `<h1>Alternative drink: ${meal.strDrinkAlternate}</h1>`: ''}
            ${meal.strTags ? `<h1>Tags: ${meal.strTags}</h1>`: ''}
            <h1>Ingredients & measures:</h1>
            <ul>
                ${document.querySelector('.mealContainer').textContent = ingredients_measures.join(`<br>`)}
            </ul>
            <h1>Instructions:</h1>
            <p>${meal.strInstructions}</p>
            ${meal.strYoutube ? `<iframe class="justify-self-center w-60 h-60" src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"</iframe>` : ''}
        </div>
    `;
    mealContainer.innerHTML = html;
    input.value = "";
}
    




