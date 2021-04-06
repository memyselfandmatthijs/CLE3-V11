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
let cardsContainer;
let webserviceURL;
let update;   

function init(){
    // Get all the elements from HTML
    cardsContainer = document.querySelector("div#cards");
    update = document.querySelector('div#update'); 
    
    // Webservice URL
    webserviceURL = 'webservice/index.php';

    // Global click event handlers for buttons
    cardsContainer.addEventListener('click', updateClickHandler);

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
    cardsContainer.innerHTML = "";

    // Create dom elements per item
    for(let item of data) {
        addCard(item);
    }
}

function addCard(update){  
    // Create div of the cards
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.setAttribute('id', update.id);
    cardsContainer.appendChild(cardDiv);

    // Create image in the div
    const img = document.createElement("img");
    img.classList.add("bg-img");
    img.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${update.imageTag}')`;
    cardDiv.appendChild(img);

    // Creates div for the names
    const nameDiv = document.createElement("div");
    nameDiv.innerText = update.name;
    cardDiv.appendChild(nameDiv);

    // Create read more button
    const updateButton = document.createElement('button');
    updateButton.innerText = 'Check Update';
    updateButton.className = 'updateButton';
    updateButton.dataset.id = update.id;
    nameDiv.appendChild(updateButton);
}

function updateClickHandler(e){
    // If it's not a button
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }
    // If read button has been clicked
    if (e.target.className === "updateButton"){
        getUpdateButton(e.target.dataset.id);
    }
}

// More information about the update
function getUpdateButton(id){
    webserviceURLTags = webserviceURL + "?id=" + id;
    fetch(webserviceURLTags)
        .then((response) => {
            if(!response.ok){
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(displayUpdate)
        .catch(getCardItemsErrorHandler);
}

function displayUpdate(data){
    let update = document.querySelector('#update');

    update.innerText = data.update;
}

function getCardItemsErrorHandler(data){
    console.log(data);

    // Reset/Empty Cards
    cardsContainer.innerHTML = "";

    const element = document.createElement('p');
    element.innerText = "Er ging iets fout!";
    element.classList.add('error');
    cardsContainer.appendChild(element);
}