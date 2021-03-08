let series = [];
let registeredSeries = [];
let score = 0;

function game(){
    for (let i = 0; i <= series.length; i++){
        if (i === 0){
            document.getElementById(series[i]).style.background = "#f70505"
        }
        if (i !== 0){
            setTimeout(function (){
                document.getElementById(series[i]).style.background = "#f70505"
            }, 1000*i)
        }
        setTimeout( function () {
            document.getElementById(series[i]).style.background = "#a8a8a8"
        }, 1000*i+600)
    }
}

function restart() {
    series.length = 0
    registeredSeries.length = 0
    score = 0
    addNumber()
    game()
    document.getElementById("buttonBox").style.background = "#a8a8a8"
}

function addNumber(){
    let newNumber = Math.floor(Math.random() * 10)
    if (newNumber === 0){
        newNumber = Math.floor(Math.random() * 10)
    }
    series.push(newNumber)
}

function startGame(){
    series.length = 0
    registeredSeries.length = 0
    score = 0
    addNumber()
    game()

}

function checkAnswer(){
    for (let i = 0; i < series.length; i++){
        if (series[(i+1)] === registeredSeries[(i+1)]  && (i+1) !== series.length){
            console.log("check")
        }
        if ((series[(i+1)] === registeredSeries[(i+1)]) && (i+1) === series.length){
            console.log("perfect match")
            score++
            addNumber()
            setTimeout(function (){
                game()
            }, 2000)
            registeredSeries.length = 0
            document.getElementById("score").innerHTML = "score = " + score
            document.getElementById("buttonBox").style.background = "#49ed28"
            break
        }
    if(series[(i+1)] !== registeredSeries[(i+1)]){
            console.log("error")
            document.getElementById("buttonBox").style.background = "#f70505"
            break
        }
    }
}

function registerClick(clickedButton){
    registeredSeries.push(clickedButton)
    if (registeredSeries.length === series.length){
        checkAnswer()
    }
}

document.getElementById("score").innerHTML = "score = " + score