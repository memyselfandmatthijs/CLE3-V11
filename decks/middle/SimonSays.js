let series = [];
let registeredSeries = [];
let score = 0;
let gameRunning = false;

let buttonBox = document.getElementById("buttonBox");
let scoreElement = document.getElementById("score");


//add event listeners
document.getElementById("buttonBox").addEventListener("click", registerClick);
document.getElementById("startGame").addEventListener("click", startGame);
document.getElementById("restartGame").addEventListener("click", restart);

//this chooses a random number and adds it to the series array if its not a 0, because the buttons are numbered 1-9
function addNumber(){
    let newNumber = Math.floor(Math.random() * 10);
    if (newNumber === 0){
        addNumber();
    }
    else{
        series.push(newNumber);
    }
}

// this functions first resets all the values, then  it adds a number and runs game()
function startGame(){
    if (gameRunning === false) {                                                     //this if statement keeps the function from calling game() while the game is still going,
        series.length = 0;                                                           //if the game() would get called while it's still going it will mess up the buttons
        registeredSeries.length = 0;
        score = 0;
        addNumber();
        gameRunning = true;
        game();
    }
}

document.getElementById("score").innerHTML = "score = " + score;                // This makes sure the score is displayed when the page is first loaded

//what this function does is changing the color of the buttons in the order given by the series array
function game(){
    for (let i = 0; i <= series.length; i++){
        if (i === 0){                                                           //The first in the series has to change color immediately
            document.getElementById(series[i]).style.background = "#f70505";
        }
        if (i !== 0){
            setTimeout(function (){                                      //The second in the series has to change a given time after that, the third one twice a given time after that...
                document.getElementById(series[i]).style.background = "#f70505";
            }, 1000*i);
        }
        setTimeout( function () {
            document.getElementById(series[i]).style.background = "#a8a8a8"; //This works the same as the if() above, but it turns the buttons back to grey instead
        }, 1000*i+600);
    }
}

function registerClick(e){
    if(e.target.tagName === 'BUTTON'){
        registeredSeries.push(Number(e.target.id));
        checkAnswer();
    }
}

function checkAnswer(){
    //lets loop through the series to check if it matches the registered series
    for (let i = 0; i < registeredSeries.length; i++){
        if (series[(i)] === registeredSeries[(i)] ){         //if the input matches the series array while it hasn't checked every number in the series it'll  go on with checking the input
            console.log("check");
        }
        if ((series[(i)] === registeredSeries[(i)]) && (i+1) === series.length){        // if the numbers match and it has checked a complete series it will continue the game
            console.log("perfect match");
            score++;
            addNumber();
            setTimeout(function (){
                game();
            }, 2000);
            registeredSeries.length = 0;
            scoreElement.innerHTML = "score = " + score;    // this refreshes the score
            buttonBox.style.background = "#49ed28";  // this makes the background green to tell the user the registered series was correct
            break;
        }
    if(series[(i)] !== registeredSeries[(i)]){                                          // if the numbers don't match it will change log 'error' in the console and turn the background to red
            console.log("error");
            score = 0;
            scoreElement.innerHTML = "score = " + score;
            buttonBox.style.background = "#f70505"
            gameRunning = false;
            break;
        }
    }
}

//in addition to starting the game this function resets the background color.
function restart() {
        gameRunning = false;
        startGame();
        buttonBox.style.background = "#a8a8a8";
}

