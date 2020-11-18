var easyModeBtn = document.getElementById('easyModeBtn');
var hardModeBtn = document.getElementById('hardModeBtn');

// переключатель мода
var changer;


//header
var inputMax = document.getElementById('inputMax');
var max;
var inputAddMax = document.getElementById('inputAddMax');
var addMax;

//кнопка для старта игры
var btnStart = document.getElementById('btnStart');

//переменная определяющая кто ходит
var currPlayer;

var whoseTurn = document.getElementById('whoIsTurn');
//числа игрока и компа в процессе игры
var gameUserInput = document.getElementById('humanInput');

var numToAdd;
//текущая сумма
var sum = 0;
//вывод суммы
var currentSum = document.getElementById('currSum');


var finishBtn = document.getElementById('FinishBtn');
var computerTurnBtn = document.getElementById('btnComputerTurn');


var humanLog = document.getElementById('humanNumber');
var machineLog = document.getElementById('machineNumber');

var whoFirst = document.getElementById('whoFirst');

//errors
var poleMistake = document.getElementById('poleMistake');

//переменная для человека
var humanVal;

// всплывающее окно вывода очередности хода
var inputTurnEl = document.getElementById('inputTurn');

var players = ['Player', 'Computer'];

var itog = document.getElementById('itog');

// blocks
var interval = document.getElementById('interval');
var ending= document.getElementById('ending');
var result = document.getElementById('result');

var btnReset = document.getElementById("btnReset");

//start code

btnStart.disabled = true;


function easyMode() {
    changer = true;
    easyModeBtn.disabled = true;
    hardModeBtn.disabled = true;
    easyModeBtn.classList.add("disableMod");
}


function hardMode() {
    changer = false;
    console.log(changer);
    btnStart.disabled = false;
    max = 100;
    inputMax.value = 100;
    inputAddMax.value = 9;
    easyModeBtn.disabled = true;
    hardModeBtn.disabled = true;
    inputMax.disabled = true;
    inputAddMax.disabled = true;
    hardModeBtn.classList.add("disableMod");
}



function onFirstInput() { // validation

    addMax = +inputAddMax.value;
    max = +inputMax.value;

    if (addMax !== '' && max !== '') {

        if (addMax % 1 !== 0 || max % 1 !== 0 || addMax < 2 || max < 20 || max <= addMax) {

            whoFirst.innerHTML = 'Wrong input';

        }

        else { 

            btnStart.disabled = false;
            whoFirst.innerHTML = '';

        }
    }
}


inputAddMax.addEventListener('input', onFirstInput);
inputMax.addEventListener('input', onFirstInput);


function myRandom(fromN, toN) {

    return Math.floor(Math.random() * (toN - fromN + 1)) + fromN;

}

function startGame() {

    var whoIsFirst = myRandom(0, 1); // who is first random

    currPlayer = players[whoIsFirst];

    whoFirst.innerHTML = currPlayer + " is the first";


    if (currPlayer === 'Player') {
        humanTurn();
    }

    else machineTurn();

}

function humanTurn() {
    // функия для хода человека, выводящая на экран, что сечас ход человека
    finishBtn.disabled = false;
    computerTurnBtn.disabled = true;
    inputTurnEl.innerHTML = "It's your turn";

}

function machineTurn() {
    if (changer === false) {
        finishBtn.disabled = true;
        computerTurnBtn.disabled = false;
        // компьютер объявляет, что его ход
        inputTurnEl.innerHTML = "It's computer's turn! Push the button!";
        numToAdd = 10 - sum % 10;
        if (numToAdd === 10) {
            numToAdd = 1
        }
        sum += numToAdd;
    }

    else {
        finishBtn.disabled = true;
        computerTurnBtn.disabled = false;
        // компьютер объявляет, что его ход
        inputTurnEl.innerHTML = "It's computer's turn! Push the button!";
        numToAdd = myRandom(1, +inputAddMax.value);
        sum += numToAdd;
    }
}

function continueGame() {

    humanVal = +humanInput.value;
    if (currPlayer === 'Player') {
        // validation
        if (humanVal > inputAddMax.value) {
            poleMistake.innerHTML = "Don't enter more than " + inputAddMax.value;
            return;
        } else if (humanVal % 1 !== 0) {
            poleMistake.innerHTML = 'The number must be integer';
            return;
        } else if (humanVal < 1) {
            poleMistake.innerHTML = 'Minimum number is 1';
            return;
        }
        else {
            poleMistake.innerHTML = '';
        }

        humanLog.innerText += " " + gameUserInput.value;
        sum += humanVal;


    }
    else {
        
        machineLog.innerText += " " + numToAdd;


    }

    gameUserInput.value = '';
    currentSum.innerText = "Current SUM = " + sum;

    if (sum >= max) {
        itog.innerText = currPlayer + ' is a Winner!!!';
        gameUserInput.disabled = true;
        setGameOver();
    }
    else {
        if (currPlayer === 'Player') {
            currPlayer = 'Computer';
            machineTurn();
        } else {
            currPlayer = 'Player';
            humanTurn();
        }
    }
}

function setGameOver() { 
    finishBtn.disabled = true;
    computerTurnBtn.disabled = true;
    inputMax.disabled = true;
    inputAddMax.disabled = true;
}


easyModeBtn.addEventListener('click', easyMode);
hardModeBtn.addEventListener('click', hardMode);
btnStart.addEventListener('click', startGame);
finishBtn.addEventListener('click', continueGame);
computerTurnBtn.addEventListener('click', continueGame);



function intervalvisible() {
    interval.style.visibility = 'visible';
}
function endingvisible() {
    ending.style.visibility = 'visible';
    result.style.visibility = 'visible';
    inputAddMax.disabled = true;
    inputMax.disabled = true;
    btnStart.disabled = true;
}
