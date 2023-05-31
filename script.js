const menu = document.querySelector("#menu");
const ingame = document.querySelector("#ingame");
const pick_x = document.querySelectorAll('.pick-x');
const pick_o = document.querySelectorAll('.pick-o');
const turn_icon = document.getElementById('turn-icon');
const tab = document.querySelectorAll('.tab');
const restart = document.getElementById('restart');
let firstPerson = document.getElementById('first-person');
let secondPerson = document.getElementById('second-person');
let xScore = document.getElementById('x-score');
xScore.innerHTML = 0;
let oScore = document.getElementById('o-score');
oScore.innerHTML = 0;
let tie = document.getElementById('tie');
tie.innerHTML = 0;
let turn = 'x';
const freeTabs = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const filledByX = [];
const filledByO = [];
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6]
];

pick_x.forEach((x) => {
    x.addEventListener('click', pickPlayer);
})
pick_o.forEach((o) => {
    o.addEventListener('click', pickPlayer);
})

let player = "o";
/* This is function to choose your mark for game, X or O */
function pickPlayer(e) {
    if(e.target == pick_x[0] || e.target == pick_x[1]) {
        pick_x[0].classList.add('active-player');
        pick_o[0].classList.remove('active-player');
        player = "x";
    } else if(e.target == pick_o[0] || e.target == pick_o[1]){
        pick_x[0].classList.remove('active-player');
        pick_o[0].classList.add('active-player');
        player = "o";
    }
}

let mode = 'cpu-mode';
/* This is function to choose game mode. Player can play against CPU (AI moves) or play against friend */
function startGame(chooseMode) {
    menu.style.display = 'none';
    ingame.style.display = 'flex';
    document.body.style.alignItems = 'flex-start';
    mode = chooseMode;

    if(mode === 'cpu-mode') {
        if(player === "x") {
            firstPerson.innerHTML = "X (YOU)";
            secondPerson.innerHTML = "O (CPU)";
        }else {
            secondPerson.innerHTML = "O (YOU)";
            firstPerson.innerHTML = "X (CPU)";
        }

        
    }

    if(mode === 'player-mode') {
        firstPerson.innerHTML = "X (P1)";
        secondPerson.innerHTML = "O (P2)";
        putMarksPvP();
    }
}

function putMarksCpu() {
    let cpuCounter = 0;
    for(let i = 0; i < tab.length; i++){

    }
}
/* This is function to make board tabs clickable, change turns, define winner... */
function putMarksPvP() {
    for(let i = 0; i < tab.length; i++){
        tab[i].addEventListener('click', (e) => {
            let newMark = document.createElement('img');
            if(turn == 'x' && !tab[i].classList.contains('filled')) {
                tab[i].appendChild(newMark);
                newMark.src = './assets/icon-x.svg';
                turn_icon.src = './assets/turn-o.svg';
                tab[i].classList.add('filled');
                filledByX.push(i);
                freeTabs.splice(i, 1);
                if(checkMovesX()){
                    winX();
                    stopFilling();
                    return;
                }
                turn = 'o';
            }else if(turn == 'o' && !tab[i].classList.contains('filled')){
                tab[i].appendChild(newMark);
                newMark.src = './assets/icon-o.svg';
                turn_icon.src = './assets/turn-x.svg';
                tab[i].classList.add('filled');
                filledByO.push(i);
                freeTabs.splice(i, 1);
                if(checkMovesO()){
                    winO();
                    stopFilling();
                    return;
                }
                turn = 'x';
            }
            e.target.onclick = null;
        });
    }
}

/* This function checks if X tabs matches with any winning combinations. Returns True of False */
function checkMovesX() {
    return winCombinations.find((comb) => comb.every((tab) => filledByX.includes(tab)));
}

/* If previous function returns true, this function will add some styles on winning combination tabs
   and increases score of X */
function winX() {
    for(let i = 0; i < filledByX.length; i++) {
        tab[filledByX[i]].style.transition = 'all 1s';
        tab[filledByX[i]].style.backgroundColor = '#31C3BD';
        tab[filledByX[i]].style.boxShadow = 'inset 0px -8px 0px #118C87';
        tab[filledByX[i]].firstChild.src = './assets/icon-x-win.svg';
    }
    xScore.innerHTML++;
}

/* This function checks if O tabs matches with any winning combinations */
function checkMovesO() {
    return winCombinations.find((comb) => comb.every((tab) => filledByO.includes(tab)));
}

/* If previous function returns true, this function will add some styles on winning combination tabs
   and increases score of O */
function winO() {
    for(let i = 0; i < filledByO.length; i++) {
        tab[filledByO[i]].style.transition = 'all 1s';
        tab[filledByO[i]].style.backgroundColor = '#F2B137';
        tab[filledByO[i]].style.boxShadow = 'inset 0px -8px 0px #CC8B13';
        tab[filledByO[i]].firstChild.src = './assets/icon-o-win.svg';
    }
    oScore.innerHTML++
}

/* This function is for not to add any mark on board after game is over */
function stopFilling() {
    for(let i = 0; i < tab.length; i++) {
        if(!tab[i].classList.contains('filled')) {
            tab[i].classList.add('filled');
        }
    }
}

console.log(mode);