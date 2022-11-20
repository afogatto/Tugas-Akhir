const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', ambilResep);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    console.log(searchInputTxt)

    fetch(`https://api-food-recipe.herokuapp.com/search?q=${searchInputTxt}`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            let html = "";
            isiData = response.data
            isiData.forEach(meal=>{
                html+=`
                    <div class = "meal-item" data-id=${meal.id}>
                        <div class = "meal-img">
                            <img src = "${meal.images[0]}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.title}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `
            })
            mealList.innerHTML = html;
        })
        .catch(err => console.error(err));
    }
function ambilResep(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://api-food-recipe.herokuapp.com/recipe/${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => getResep(data));
    }
}
function getResep(isi){
    console.log(isi);
    meal = isi.data.recipeTitle;
    bahan = isi.data.ingredients
    let html = `
        <h2 class = "recipe-title">${meal}</h2>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <div class='instruksi' >
            <ol id='instruksi'>
            </ol>
            </div>
        </div>
        
    `;
    mealDetailsContent.innerHTML = html;
    let instruksi = document.getElementById('instruksi')
    let htmlS = "";
    isi.data.steps.forEach(el=>{
        htmlS+=`
            
            <li>${el.step}</li>
            
        `
    })
    document.getElementById('instruksi').innerHTML = htmlS

    mealDetailsContent.parentElement.classList.add('showRecipe');
}