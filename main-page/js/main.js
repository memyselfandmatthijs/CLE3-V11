// ----- GSAP ANIMATION -----//

//Hero Section
gsap.from('header', {opacity: 0, duration: 1, delay:1.8, y: 30})
gsap.from('.container img', {opacity: 0, duration: 1, delay:1.3, y: 30})
gsap.from('.hero-cta', {opacity: 0, duration: 1, delay:1, y: 30})
gsap.from('.left-col p', {opacity: 0, duration: 1, delay:0.7, y: 30})
gsap.from('.left-col h1', {opacity: 0, duration: 1, delay:0.5, y: 30})

// Works section
gsap.from('.game-section', {opacity: 0, duration: 1, delay:0.7, y: 30})
gsap.from('.yt-template', {opacity: 0, duration: 1, delay:0.7, y: 30})
gsap.from('.card-container', {opacity: 0, duration: 1, delay:1.7, y: 30})

// ----- Adding Cards -----//
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


// ----- Scroll-to-top button -----//
const scrollToTopButton = document.querySelector("#scroll-to-top-button");

// When scroll is being used, scroll Function will be executed
window.addEventListener("scroll", scroll);
scrollToTopButton.addEventListener("click", scrollToTop);

function scroll() {
  // Checks when scrolling the vertial(Y) is above 300 of pixels
  if (window.pageYOffset > 250) {
    // If the Scroll-To-Top button doesn't have the classlist, add the new classes
    if(!scrollToTopButton.classList.contains("btnEntrance")) {
        scrollToTopButton.classList.remove("btnExit");
        scrollToTopButton.classList.add("btnEntrance");
        scrollToTopButton.style.display = "block";
    }
  }
  // If the Y is 250 or below it will check if it contains the btnEntrance classlist
  else if (scrollToTopButton.classList.contains("btnEntrance")){ 
    scrollToTopButton.classList.remove("btnEntrance");
    scrollToTopButton.classList.add("btnExit");

      // This gives a delay to the display none, so the exit animation can take place
      setTimeout(function() {
        scrollToTopButton.style.display = "none";
      }, 250);
    }
  }

function scrollToTop() {
  // Beginning of the document
  const beginPosition = 0;
  // Our current position, the number of pixels the document is currently scrolled to
  const currentPosition = window.pageYOffset;
  const distance = beginPosition - currentPosition;
  // Duration of the animation
  const duration = 750;
  let start;
  
  // Tells the browser that you want to perform an animation
  window.requestAnimationFrame(scrollAnimation);

    // Takes the timestamp as the parameter
    function scrollAnimation(timestamp) {
      // Only execute once at the first repitition. Start will be the starting point of the animation
      if (start === undefined)
        start = timestamp;
      // Progress will be the elapsed time of the animation. 
      // It will be the different between the timestamp and the starting point.
      const progress = timestamp - start;
    // This will be the animation
    // First cordinate is X, that will always be 0
    window.scrollTo(0, easeInOutCubic(progress, currentPosition, distance, duration));
    // This checks if it needs to continue when it's caller than duration, else stop the animation
    if (progress < duration) window.requestAnimationFrame(scrollAnimation);
  }
}

// www.gizma.com/easing/
function easeInOutCubic(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};