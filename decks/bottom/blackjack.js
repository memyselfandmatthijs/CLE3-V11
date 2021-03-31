//Dom variables
let textArea = document.getElementById('game-area');
let startGameButton = document.getElementById("start-game");
let hitButton = document.getElementById("hit");
let stayButton = document.getElementById("stay");

//Game variables
let gameStarted = false;
let gameOver = false;
let playerWon = false;
let dealerCards = [];
let playerCards = [];
let dealerScore = 0;
let playerScore = 0;
let deck = [];

//hides the hit and stay button
hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

//Event listener
document.getElementById("start-game").addEventListener("click", startGame);
document.getElementById("hit").addEventListener("click", hit);
document.getElementById("stay").addEventListener("click", stay);

function startGame() {
    //Start game variables
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    //Gives dealer and player 2 cards when starting
    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];

    //Hides the start start game button and displays the hit and stay button
    startGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    showStatus();
}

//Hit button
function hit() {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
}

//Stay button
function stay() {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
}

function createDeck() {
    //Card variables
    let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
    let values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

    //For loop creates a deck with suits and values
    for (let i = 0; i < suits.length; i++) {
        for (let x = 0; x < values.length; x++) {
            let card = {
                suit: suits[i],
                value: values[x]
            };
            deck.push(card);
        }
    }
    return deck;
}

// Algorithm Durstenfeld https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleDeck(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//Adds the value of the card and suit together
function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

//Gets the next card
function getNextCard() {
    return deck.shift();
}

//Gives the values to the cards
function getCardNumericValue(card) {
    switch(card.value) {
        case 'Ace':
            return 1;
        case '2':
            return 2;
        case '3':
            return 3;
        case '4':
            return 4;
        case '5':
            return 5;
        case '6':
            return 6;
        case '7':
            return 7;
        case '8':
            return 8;
        case '9':
            return 9;
        default:
            return 10;
    }
}

function getScore(cardArray) {
    let score = 0;
    let hasAce = false;

    //Adds the card value to the score
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        score += getCardNumericValue(card);

        //If the card Ace is there
        if (card.value === 'Ace') {
            hasAce = true;
        }
    }
    //And if the Ace card is below or equal to 21 when adding 10 extra points, do that instead of +1 points
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function checkForEndOfGame() {

    updateScores();

    if (gameOver) {
        // let dealer take cards
        while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
            dealerCards.push(getNextCard());
            updateScores();
        }
    }
    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    }
    else if (playerScore === 21){
        playerWon = true;
        gameOver = true;
    }
    else if (dealerScore === 21){
        playerWon = false;
        gameOver = true;
    }
    else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    }
    else if (gameOver) {

        if (playerScore > dealerScore) {
            playerWon = true;
        }
        else {
            playerWon = false;
        }
    }
}


function showStatus() {
    // Displays text when game isn't started yet
    if (!gameStarted) {
        textArea.innerText = "Ready to play Blackjack!";
        return;
    }

    let dealerCardString = "";
    for (let i=0; i < dealerCards.length; i++) {
        dealerCardString += getCardString(dealerCards[i]) + '\n';
    }

    let playerCardString = "";
    for (let i=0; i < playerCards.length; i++) {
        playerCardString += getCardString(playerCards[i]) + '\n';
    }

    updateScores();

    textArea.innerText =
        'Dealer has:\n' +
        dealerCardString +
        '(Score: '+ dealerScore  + ')\n\n' +

        'Player has:\n' +
        playerCardString +
        '(Score: '+ playerScore  + ')\n\n';

    if (gameOver) {
        if (playerWon) {
            textArea.innerText += "You won!";
        }
        else if (dealerScore === playerScore){
            textArea.innerText += "Draw";
        }
        else {
            textArea.innerText += "Dealer won!";
        }
        startGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }
}