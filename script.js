const screenSize = window.matchMedia('(min-width: 768px)');
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
const game_over = document.getElementById('game-over');
const game_result = document.getElementById('game-result');
const winner_mark = document.getElementById('winner-mark');
const main_message = document.getElementById('main-message');
const quit_btn = document.getElementById('quit');
const next_btn = document.getElementById('next');
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
});




let player = "o";
/* This is function to choose your mark for game, X or O */
function pickPlayer(e) {
    if (e.target == pick_x[0] || e.target == pick_x[1]) {
        pick_x[0].classList.add('active-player');
        pick_o[0].classList.remove('active-player');
        pick_x[0].classList.remove('disactive-player');
        pick_o[0].classList.add('disactive-player');
        player = "x";
    } else if (e.target == pick_o[0] || e.target == pick_o[1]) {
        pick_x[0].classList.remove('active-player');
        pick_o[0].classList.add('active-player');
        pick_x[0].classList.add('disactive-player');
        pick_o[0].classList.remove('disactive-player');
        player = "o";
    }
}

let mode = 'cpu-mode';
/* This is function to choose game mode. Player can play against CPU (AI moves) or play against friend */
function startGame(chooseMode) {
    menu.style.display = 'none';
    ingame.style.display = 'flex';
    if (screenSize.matches) {
        document.body.style.alignItems = 'center';
    } else {
        document.body.style.alignItems = 'flex-start';
    }
    onHoverMarks();
    mode = chooseMode;
    if (mode === 'cpu-mode') {
        if (player === "x") {
            firstPerson.innerHTML = "X (YOU)";
            secondPerson.innerHTML = "O (CPU)";
        } else {
            secondPerson.innerHTML = "O (YOU)";
            firstPerson.innerHTML = "X (CPU)";

        }
        putMarksCpuMode();
    }

    if (mode === 'player-mode') {
        firstPerson.innerHTML = "X (P1)";
        secondPerson.innerHTML = "O (P2)";
        putMarksPvPMode();
    }
    restart.addEventListener('click', restartGame);
}

function onHoverMarks() {
    if (mode === 'player-mode') {
        for (let index = 0; index < freeTabs.length; index++) {
            const freeIndex = freeTabs[index];
            if (turn === "x") {
                tab[freeIndex].classList.add("hoverX");
                tab[freeIndex].classList.remove("hoverO");
            } else {
                tab[freeIndex].classList.add("hoverO");
                tab[freeIndex].classList.remove("hoverX");
            }
        }
    }else if(mode === 'cpu-mode') {
        if(player === 'x') {
            for(let i = 0; i < freeTabs.length; i++) {
                const freeIndex = freeTabs[i];
                tab[freeIndex].classList.add("hoverX");
            }
            
        }else if(player === 'o') {
            for(let i = 0; i < freeTabs.length; i++) {
                const freeIndex = freeTabs[i];
                tab[freeIndex].classList.add("hoverO");
            }
        }
    }

}

function putMarksCpuMode() {
    if (player === 'x') {
        for (let i = 0; i < tab.length; i++) {
            tab[i].addEventListener('click', (e) => {
                e.target.classList.remove('hoverX');
                if (!tab[i].classList.contains('filled') && turn === 'x') {
                    makePlayerMove(i);
                    if (checkMovesX()) {
                        winX();
                        stopFilling();
                        return;
                    } else if (checkMovesO()) {
                        winO();
                        stopFilling();
                        return;
                    } else if (filledByX.length === 5) {
                        tieGame();
                        return;
                    }
                    turn = 'o';
                    setTimeout(makeCPUMove, 750);
                }
                onHoverMarks();
            });
        }
    } else if (player === 'o') {
        makeCPUMove();
        for (let i = 0; i < tab.length; i++) {
            tab[i].addEventListener('click', (e) => {
                e.target.classList.remove('hoverO');
                if (!tab[i].classList.contains('filled') && turn === 'o') {
                    makePlayerMove(i);
                    if (checkMovesX()) {
                        winX();
                        stopFilling();
                        return;
                    } else if (checkMovesO()) {
                        winO();
                        stopFilling();
                        return;
                    }
                    turn = 'x';
                    setTimeout(makeCPUMove, 750);
                    console.log(filledByX)
                }
                onHoverMarks();
            });
        }
    }

}

function makePlayerMove(index) {
    if (player === 'x') {
        let newMarkX = document.createElement('img');
        tab[index].appendChild(newMarkX);
        newMarkX.classList.add('mark');
        newMarkX.src = './assets/icon-x.svg';
        turn_icon.src = './assets/turn-o.svg';
        tab[index].classList.add('filled');
        filledByX.push(index);
        let indexToRemovePlayer = freeTabs.indexOf(index);
        if (indexToRemovePlayer > -1) {
            freeTabs.splice(indexToRemovePlayer, 1);
        }
    } else if (player === 'o') {
        let newMarkO = document.createElement('img');
        tab[index].appendChild(newMarkO);
        newMarkO.classList.add('mark');
        newMarkO.src = './assets/icon-o.svg';
        turn_icon.src = './assets/turn-x.svg';
        tab[index].classList.add('filled');
        filledByO.push(index);
        let indexToRemovePlayer = freeTabs.indexOf(index);
        if (indexToRemovePlayer > -1) {
            freeTabs.splice(indexToRemovePlayer, 1);
        }
    }
}

function makeCPUMove(e) {
    let cpuMove = freeTabs[Math.floor(Math.random() * freeTabs.length)];
    if (player === 'x') {
        tab[cpuMove].classList.remove('hoverX');
        let newMarkO = document.createElement('img');
        tab[cpuMove].classList.add('filled');
        tab[cpuMove].appendChild(newMarkO);
        newMarkO.classList.add('mark');
        newMarkO.src = './assets/icon-o.svg';
        turn_icon.src = './assets/turn-x.svg';
        filledByO.push(cpuMove);
        let indexToRemoveCpu = freeTabs.indexOf(cpuMove);
        if (indexToRemoveCpu > -1) {
            freeTabs.splice(indexToRemoveCpu, 1);
        }
        if (checkMovesO()) {
            winO();
            stopFilling();
            return;
        }
        turn = 'x';
    } else if (player === 'o') {
        tab[cpuMove].classList.remove('hoverO');
        let newMarkX = document.createElement('img');
        tab[cpuMove].classList.add('filled');
        tab[cpuMove].appendChild(newMarkX);
        newMarkX.classList.add('mark');
        newMarkX.src = './assets/icon-x.svg';
        turn_icon.src = './assets/turn-o.svg';
        filledByX.push(cpuMove);
        let indexToRemoveCpu = freeTabs.indexOf(cpuMove);
        if (indexToRemoveCpu > -1) {
            freeTabs.splice(indexToRemoveCpu, 1);
        }
        if (checkMovesX()) {
            winX();
            stopFilling();
            return;
        } else if (filledByX.length === 5) {
            tieGame();
            return;
        }
        turn = 'o';
    }

}
/* This is function to make board tabs clickable, change turns, define winner... in Pvp Mode*/
function putMarksPvPMode() {
    for (let i = 0; i < tab.length; i++) {
        tab[i].addEventListener('click', (e) => {
            let newMark = document.createElement('img');
            e.target.classList.remove('hoverX');
            e.target.classList.remove('hoverO');
            if (turn == 'x' && !tab[i].classList.contains('filled')) {
                tab[i].appendChild(newMark);
                newMark.classList.add('mark');
                newMark.src = './assets/icon-x.svg';
                turn_icon.src = './assets/turn-o.svg';
                tab[i].classList.add('filled');
                filledByX.push(i);
                let indexToRemoveCpu = freeTabs.indexOf(i);
                if (indexToRemoveCpu > -1) {
                    freeTabs.splice(indexToRemoveCpu, 1);
                }
                if (checkMovesX()) {
                    winX();
                    stopFilling();
                    return;
                } else if (filledByX.length === 5) {
                    tieGame();
                }
                turn = 'o';
            } else if (turn == 'o' && !tab[i].classList.contains('filled')) {
                tab[i].appendChild(newMark);
                newMark.src = './assets/icon-o.svg';
                turn_icon.src = './assets/turn-x.svg';
                tab[i].classList.add('filled');
                filledByO.push(i);
                let indexToRemoveCpu = freeTabs.indexOf(i);
                if (indexToRemoveCpu > -1) {
                    freeTabs.splice(indexToRemoveCpu, 1);
                }
                if (checkMovesO()) {
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
    return winCombinations.find((comb) => comb.every((tab) => filledByX.includes(tab)));;
}

/* If previous function returns true, this function will add some styles on winning combination tabs
   and increases score of X */
function winX() {
    console.log(checkMovesX());
    checkMovesX().forEach(element => {
        tab[element].classList.add('winnerX');
        tab[element].firstChild.src = './assets/icon-x-win.svg';
    });

    setTimeout(() => {
        game_over.style.display = 'flex';
    }, 750);
    winner_mark.src = './assets/icon-x.svg';
    winner_mark.style.display = 'block';
    main_message.style.color = '#31C3BD';
    if (mode === 'player-mode') {
        game_result.innerHTML = 'PLAYER 1 WINS!';
    } else if (mode === 'cpu-mode') {
        if (player === 'x') {
            game_result.innerHTML = 'YOU WON!';
        } else if (player === 'o') {
            game_result.innerHTML = 'OH NO, YOU LOST…';
        }
    }
    main_message.innerHTML = 'TAKES THE ROUND';
    quit_btn.innerHTML = 'QUIT';
    next_btn.innerHTML = 'NEXT ROUND';
    game_result.style.display = 'block';
    xScore.innerHTML++;
    quitGame();
    nextRound();
}

/* This function checks if O tabs matches with any winning combinations */
function checkMovesO() {
    return winCombinations.find((comb) => comb.every((tab) => filledByO.includes(tab)));
}

/* If previous function returns true, this function will add some styles on winning combination tabs
   and increases score of O */
function winO() {
    checkMovesO().forEach(element => {
        tab[element].classList.add('winnerO');
        tab[element].firstChild.src = './assets/icon-o-win.svg';
    });

    setTimeout(() => {
        game_over.style.display = 'flex';
    }, 750);
    winner_mark.src = './assets/icon-o.svg';
    winner_mark.style.display = 'block';
    main_message.style.color = '#F2B137';
    main_message.innerHTML = 'TAKES THE ROUND';
    if (mode === 'player-mode') {
        game_result.innerHTML = 'PLAYER 2 WINS!';
    } else if (mode === 'cpu-mode') {
        if (player === 'x') {
            game_result.innerHTML = 'OH NO, YOU LOST…';
        } else if (player === 'o') {
            game_result.innerHTML = 'YOU WON!';
        }
    }
    quit_btn.innerHTML = 'QUIT';
    next_btn.innerHTML = 'NEXT ROUND';
    game_result.style.display = 'block';
    oScore.innerHTML++
    quitGame();
    nextRound();
}

function tieGame() {
    setTimeout(() => {
        game_over.style.display = 'flex';
    }, 750);
    game_result.style.display = 'none';
    winner_mark.style.display = 'none';
    main_message.style.color = '#A8BFC9';
    main_message.innerHTML = 'ROUND TIED';
    quit_btn.innerHTML = 'QUIT';
    next_btn.innerHTML = 'NEXT ROUND';
    tie.innerHTML++
    quitGame();
    nextRound();
}

/* This function is for not to add any mark on board after game is over */
function stopFilling() {
    for (let i = 0; i < tab.length; i++) {
        if (!tab[i].classList.contains('filled')) {
            tab[i].classList.add('filled');
        }
    }
}

function cleanArrays() {
    filledByX.length = 0;
    filledByO.length = 0;
    freeTabs.length = 0;
    for (let i = 0; i < 9; i++) {
        freeTabs.push(i);
    }
}

function cleanTabs() {
    tab.forEach(elem => {
        if (elem.hasChildNodes()) {
            let tabChild = document.querySelector('mark');
            elem.removeChild(elem.firstElementChild);
        }
        elem.classList.remove('filled');
        elem.classList.remove('winnerX');
        elem.classList.remove('winnerO');
    });
    turn = 'x';
    turn_icon.src = './assets/turn-x.svg'
}

function quitGame() {
    quit_btn.addEventListener('click', () => {
        if (quit_btn.innerHTML == 'QUIT') {
            ingame.style.display = 'none';
            menu.style.display = 'flex';
            game_over.style.display = 'none';
            document.body.style.alignItems = 'center';
            cleanTabs();
            cleanArrays();
            onHoverMarks();
            xScore.innerHTML = 0;
            oScore.innerHTML = 0;
            tie.innerHTML = 0;
        }
    });
}

function nextRound() {
    next_btn.addEventListener('click', () => {
        game_over.style.display = 'none';
        cleanTabs();
        cleanArrays();
        onHoverMarks();
        if (mode === 'cpu-mode' && player === 'o') {
            makeCPUMove();
        }
    })
}

function restartGame() {
    setTimeout(() => {
        game_over.style.display = 'flex';
    }, 350);
    game_result.style.display = 'none';
    main_message.style.color = '#A8BFC9';
    main_message.innerHTML = 'RESTART GAME?';
    quit_btn.innerHTML = 'NO, CANCEL';
    next_btn.innerHTML = 'YES, RESTART';
    winner_mark.style.display = 'none';
    quit_btn.addEventListener('click', () => {
        ingame.style.display = 'flex';
        menu.style.display = 'none';
        game_over.style.display = 'none';
        if (screenSize.matches) {
            document.body.style.alignItems = 'center';
        } else {
            document.body.style.alignItems = 'flex-start';
        }
    });

    next_btn.addEventListener('click', () => {
        ingame.style.display = 'flex';
        menu.style.display = 'none';
        game_over.style.display = 'none';
        if (screenSize.matches) {
            document.body.style.alignItems = 'center';
        } else {
            document.body.style.alignItems = 'flex-start';
        }
        if (next_btn.innerHTML === 'YES, RESTART') {
            xScore.innerHTML = 0;
            oScore.innerHTML = 0;
            tie.innerHTML = 0;
        }

        cleanTabs();
        cleanArrays();
        onHoverMarks();
        if (mode === 'cpu-mode' && player === 'o') {
            makeCPUMove();
        }
    });
}

console.log(mode);