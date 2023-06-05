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
        player = "x";
    } else if (e.target == pick_o[0] || e.target == pick_o[1]) {
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

    if (mode === 'cpu-mode') {
        if (player === "x") {
            firstPerson.innerHTML = "X (YOU)";
            secondPerson.innerHTML = "O (CPU)";
        } else {
            secondPerson.innerHTML = "O (YOU)";
            firstPerson.innerHTML = "X (CPU)";
            next_btn.addEventListener('click', putMarksCpu);
        }
        putMarksCpu();

    }

    if (mode === 'player-mode') {
        firstPerson.innerHTML = "X (P1)";
        secondPerson.innerHTML = "O (P2)";
        putMarksPvP();

    }
    restart.addEventListener('click', restartGame);
}

function putMarksCpu() {
    // if (player == 'x') {
    //     for (let i = 0; i < tab.length; i++) {
    //         tab[i].addEventListener('click', (e) => {
    //             let newMarkX = document.createElement('img');
    //             let newMarkO = document.createElement('img');
    //             let cpuMove;
    //             if (!tab[i].classList.contains('filled')) {
    //                 if (turn !== 'x') {
    //                     return; // Ignore player's click if it's not their turn
    //                 }
    //                 tab[i].appendChild(newMarkX);
    //                 newMarkX.classList.add('mark');
    //                 newMarkX.src = './assets/icon-x.svg';
    //                 turn_icon.src = './assets/turn-o.svg';
    //                 tab[i].classList.add('filled');
    //                 filledByX.push(i);
    //                 let indexToRemovePlayer = freeTabs.indexOf(i);
    //                 if (indexToRemovePlayer > -1) {
    //                     freeTabs.splice(indexToRemovePlayer, 1);
    //                 }
    //                 if (checkMovesX()) {
    //                     winX();
    //                     stopFilling();
    //                     return;
    //                 } else if (filledByX.length === 5) {
    //                     tieGame();
    //                 }
    //                 turn = 'o';
    //                 cpuMove = freeTabs[(Math.floor(Math.random() * freeTabs.length))];
    //                 if (!tab[cpuMove].classList.contains('filled')) {
    //                     newMarkO.classList.add('mark');
    //                     newMarkO.src = './assets/icon-o.svg';
    //                     tab[cpuMove].classList.add('filled');
    //                     setTimeout(() => {
    //                         tab[cpuMove].appendChild(newMarkO);
    //                         turn_icon.src = './assets/turn-x.svg';
    //                     }, 750);

    //                     filledByO.push(cpuMove);
    //                     let indexToRemoveCpu = freeTabs.indexOf(cpuMove);
    //                     if (indexToRemoveCpu > -1) {
    //                         freeTabs.splice(indexToRemoveCpu, 1);
    //                     }
    //                     if (checkMovesO()) {
    //                         winO();
    //                         stopFilling();
    //                         return;
    //                     }
    //                     turn = 'x';
    //                 }
    //             }
    //             // cpuMove = freeTabs[(Math.floor(Math.random() * freeTabs.length))];


    //             console.log(filledByX);
    //             console.log(filledByO);
    //             console.log(freeTabs);
    //             console.log(cpuMove);
    //             e.target.onclick = null;
    //         });
    //     }
    // } else if (player == 'o') {
    //     let newMarkX = document.createElement('img');
    //     let cpuMove = freeTabs[(Math.floor(Math.random() * freeTabs.length))];
    //     newMarkX.classList.add('mark');
    //     newMarkX.src = './assets/icon-x.svg';
    //     tab[cpuMove].classList.add('filled');
    //     tab[cpuMove].appendChild(newMarkX);
    //     turn_icon.src = './assets/turn-o.svg';

    //     filledByX.push(cpuMove);
    //     let indexToRemoveCpu = freeTabs.indexOf(cpuMove);
    //     if (indexToRemoveCpu > -1) {
    //         freeTabs.splice(indexToRemoveCpu, 1);
    //     }
    //     turn = 'o';
    //     for (let i = 0; i < tab.length; i++) {
    //         let newMarkX = document.createElement('img');
    //             let newMarkO = document.createElement('img');
    //             let cpuMove;
    //         tab[i].addEventListener('click', (e) => {
    //             if (!tab[i].classList.contains('filled')) {
    //                 cpuMove = freeTabs[(Math.floor(Math.random() * freeTabs.length))];
    //                 newMarkO.classList.add('mark');
    //                 newMarkO.src = './assets/icon-o.svg';
    //                 tab[i].classList.add('filled');
    //                 tab[i].appendChild(newMarkO);
    //                 turn_icon.src = './assets/turn-x.svg';
    //                 filledByO.push(i);
    //                 let indexToRemoveCpu = freeTabs.indexOf(i);
    //                 if (indexToRemoveCpu > -1) {
    //                     freeTabs.splice(indexToRemoveCpu, 1);
    //                 }
    //                 if (checkMovesO()) {
    //                     winO();
    //                     stopFilling();
    //                     return;
    //                 }
    //                 turn = 'x';
    //                 if (!tab[cpuMove].classList.contains('filled')) {
    //                     tab[cpuMove].appendChild(newMarkX);
    //                     newMarkX.classList.add('mark');
    //                     newMarkX.src = './assets/icon-x.svg';
    //                     turn_icon.src = './assets/turn-o.svg';
    //                     tab[cpuMove].classList.add('filled');
    //                     filledByX.push(cpuMove);
    //                     let indexToRemovePlayer = freeTabs.indexOf(cpuMove);
    //                     if (indexToRemovePlayer > -1) {
    //                         freeTabs.splice(indexToRemovePlayer, 1);
    //                     }
    //                     if (checkMovesX()) {
    //                         winX();
    //                         stopFilling();
    //                         return;
    //                     } else if (filledByX.length === 5) {
    //                         tieGame();
    //                     }
    //                     turn = 'o';
    //                 }
    //             }
    //             e.target.onclick = null;
    //         })
    //     }
    // }
    if (player === 'x') {
        for (let i = 0; i < tab.length; i++) {
          tab[i].addEventListener('click', (e) => {
            if (!tab[i].classList.contains('filled') && turn === 'x') {
              makePlayerMove(i);
              if (checkMovesX()) {
                winX();
                stopFilling();
                return;
              } else if (filledByX.length === 5) {
                tieGame();
              }
              turn = 'o';
              setTimeout(makeCPUMove, 750);
            }
          });
        }
      } else if (player === 'o') {
        makeCPUMove();
        for (let i = 0; i < tab.length; i++) {
          tab[i].addEventListener('click', (e) => {
            if (!tab[i].classList.contains('filled') && turn === 'x') {
              makePlayerMove(i);
              if (checkMovesX()) {
                winX();
                stopFilling();
                return;
              } else if (filledByX.length === 5) {
                tieGame();
              }
              turn = 'o';
              setTimeout(makeCPUMove, 750);
            }
          });
        }
      }
      
      function makePlayerMove(index) {
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
      }
      
      function makeCPUMove() {
        let cpuMove = freeTabs[Math.floor(Math.random() * freeTabs.length)];
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
      }

}
/* This is function to make board tabs clickable, change turns, define winner... */
function putMarksPvP() {
    for (let i = 0; i < tab.length; i++) {
        tab[i].addEventListener('click', (e) => {
            let newMark = document.createElement('img');
            if (turn == 'x' && !tab[i].classList.contains('filled')) {
                tab[i].appendChild(newMark);
                newMark.classList.add('mark');
                newMark.src = './assets/icon-x.svg';
                turn_icon.src = './assets/turn-o.svg';
                tab[i].classList.add('filled');
                filledByX.push(i);
                freeTabs.splice(i, 1);
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
                freeTabs.splice(i, 1);
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
    main_message.style.color = '#31C3BD';
    game_result.innerHTML = 'PLAYER 1 WINS!';
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
    main_message.style.color = '#F2B137';
    main_message.innerHTML = 'TAKES THE ROUND';
    game_result.innerHTML = 'PLAYER 2 WINS!';
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
    })
}

function restartGame() {
    setTimeout(() => {
        game_over.style.display = 'flex';
    }, 350);
    game_result.style.display = 'none';
    winner_mark.style.display = 'none';
    main_message.style.color = '#A8BFC9';
    main_message.innerHTML = 'RESTART GAME?';
    quit_btn.innerHTML = 'NO, CANCEL';
    next_btn.innerHTML = 'YES, RESTART';
    quit_btn.addEventListener('click', () => {
        ingame.style.display = 'flex';
        menu.style.display = 'none';
        game_over.style.display = 'none';
        document.body.style.alignItems = 'flex-start';
    });

    next_btn.addEventListener('click', () => {
        ingame.style.display = 'flex';
        menu.style.display = 'none';
        game_over.style.display = 'none';
        document.body.style.alignItems = 'flex-start';
        xScore.innerHTML = 0;
        oScore.innerHTML = 0;
        tie.innerHTML = 0;
        cleanTabs();
        cleanArrays();
    });
}

console.log(mode);