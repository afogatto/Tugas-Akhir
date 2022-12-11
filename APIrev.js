// const loader = document.getElementById('preloader');
// const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// loader.addEventListener('load')
// searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', ambilResep);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

function getMealList(e){
    e.preventDefault()
    console.log(e.target.cari.value)
    document.getElementById('preloader').style.display ='block'
    setTimeout(getData,1000);
    function getData(){
        document.getElementById('preloader').style.display ='none'
    let searchInputTxt = e.target.cari.value
    console.log(searchInputTxt)
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)

        .then(response => response.json())
        .then(response => {
            console.log(response)
            let html = "";
            isiData = response.meals
            isiData.forEach(meal=>{
                html+=`
                    <div class = "meal-item" data-id=${meal.idMeal}>
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `
            })
            mealList.innerHTML = html;
        })
        .catch(err => console.error(err));
    }
    }
function ambilResep(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        console.log(mealItem.dataset.id)
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => getResep(data));
    }
}
function getResep(isi){
    console.log(isi);
    meal = isi.meals[0].strMeal;
    bahan = isi.meals[0]
    gambar = isi.meals[0].strMealThumb;
    let ba = []
    isi_bahan = ''
    for (x=1;x<20;x++){
        ba.push(bahan[`strIngredient${x}`])
    }
    console.log(ba)
    let bahannya = ba.filter(x=>x)
    let jml_bahan = bahannya.length/2
    let jml_bahan2 = bahannya.length-jml_bahan
    let satu = bahannya.slice(0,jml_bahan)
    let dua = bahannya.slice(jml_bahan2,bahannya.length)
    console.log(satu)
    console.log(dua)

    mealDetailsContent.innerHTML = `        
    <h2 class = "recipe-title">${meal}</h2>
    <div class="pict">
        <img src = "${gambar}" alt = "food">
      </div>
    <div class = "recipe-ingredient">
        <h3>Ingredients :</h3>
        <div class='ingredient' >
        <ol id='ingredient'>
        </ol>
        </div>
    </div>

    <div class = "recipe-instruct">
        <h3>Instructions :</h3>
        <div class='instruction' >
        <ol id='instruction'>
        </ol>
        </div>
    </div>`;
    let ingredient = document.getElementById('ingredient')
    let htmlS = "";
    bahannya.forEach(el=>{
        htmlS+=`
            
            <li>${el}</li>
            
        `
    })

    ingredient.innerHTML = htmlS;
    let instruction = document.getElementById('instruction')
    let html_instruction = "";
    html_instruction+=`
    <p>${isi.meals[0].strInstructions}</p>
    `
    
    instruction.innerHTML = html_instruction  
    
    mealDetailsContent.parentElement.classList.add('showRecipe');
}