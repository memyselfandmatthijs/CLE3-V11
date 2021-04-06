// Hero Section
// gsap.from('header', {opacity: 0, duration: 1, delay:1.8, y: 30})
// gsap.from('.container img', {opacity: 0, duration: 1, delay:1.3, y: 30})
// gsap.from('.hero-cta', {opacity: 0, duration: 1, delay:1, y: 30})
// gsap.from('.left-col p', {opacity: 0, duration: 1, delay:0.7, y: 30})
// gsap.from('.left-col h1', {opacity: 0, duration: 1, delay:0.5, y: 30})

// // Works section
// gsap.from('.game-section', {opacity: 0, duration: 1, delay:0.7, y: 30})
// gsap.from('.yt-template', {opacity: 0, duration: 1, delay:0.7, y: 30})
// gsap.from('.card-container', {opacity: 0, duration: 1, delay:1.7, y: 30})

window.addEventListener('load', init);

// Global variables
let foodBox;
let webserviceURL;
let recipe;
let buttonId;
let button;    

function init(){
    // Get all the elements from HTML
    foodBox = document.querySelector("div#cards");
    recipe = document.querySelector('div#recipe'); 
    
    // Webservice URL
    webserviceURL = 'webservice/index.php';

    // Global click event handlers for buttons
    foodBox.addEventListener('click', recipeClickHandler);

    // Show all the cards on the website
    addCards();
}

function addCards(){
    fetch(webserviceURL)
        .then((response) => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(getCardItemsSuccessHandler)
        .catch(getCardItemsErrorHandler);
}

function getCardItemsSuccessHandler(data){
    console.log(data);

    // Reset/Empty Cards
    foodBox.innerHTML = "";

    // Create dom elements per item
    for(let item of data) {
        addCard(item);
    }
}


function addCard(dish){  
    // Create div of the cards
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.setAttribute('id', dish.id);
    foodBox.appendChild(cardDiv);

    // Create image in the div
    const img = document.createElement("img");
    img.classList.add("bg-img");
    img.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${dish.imageTag}')`;
    cardDiv.appendChild(img);

    // Creates div for the names
    const nameDiv = document.createElement("div");
    nameDiv.innerText = dish.name;
    cardDiv.appendChild(nameDiv);

    // Create read more button
    const recipeButton = document.createElement('button');
    recipeButton.innerText = 'Check Update';
    recipeButton.className = 'recipeButton';
    recipeButton.dataset.id = dish.id;
    nameDiv.appendChild(recipeButton);
}

function recipeClickHandler(e){
    // If it's not a button
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }
    // If read button has been clicked
    if (e.target.className === "recipeButton"){
        getRecipeButton(e.target.dataset.id);
    }
}

// More information about the food
function getRecipeButton(id){
    webserviceURLTags = webserviceURL + "?id=" + id;
    fetch(webserviceURLTags)
        .then((response) => {
            if(!response.ok){
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(displayRecipe)
        .catch(getCardItemsErrorHandler);
}

function displayRecipe(data){
    let recipe = document.querySelector('#recipe');

    recipe.innerText = data.recipe;
}

function getCardItemsErrorHandler(data){
    console.log(data);

    // Reset/Empty Cards
    foodBox.innerHTML = "";

    const element = document.createElement('p');
    element.innerText = "Er ging iets fout!";
    element.classList.add('error');
    foodBox.appendChild(element);
}