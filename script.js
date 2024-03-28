const createBoard = (function () {
    const gameBoard = document.createElement('div');
    document.body.appendChild(gameBoard);
    gameBoard.classList.add('game-board');


    const setupEventListeners = function () {
        const cells = gameBoard.querySelectorAll('.game-cell');
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                game.playTurn(index);


            });
        });
    };

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('game-cell');
        gameBoard.appendChild(cell);
    }

    return {
        gameBoard: gameBoard,
        setupEventListeners: setupEventListeners,

    };
})();

createBoard.setupEventListeners();

const game = (function () {
    let board = new Array(9);
    const gameBoard = createBoard.gameBoard;

    const cells = gameBoard.querySelectorAll('.game-cell');


    const player1 = {
        name: 'Player 1',
        marker: 'X'
    };

    const player2 = {
        name: 'Player 2',
        marker: 'O'
    };

    let isP1Turn = true;
    let currentTurn = 0;

    const playTurn = function (position) {
        if (position < 0 || position > 8) {
            console.log('Invalid position.');
        }

        else if (board[position] !== undefined) {
            console.log('Position already taken');
        }
        else {
            const currentPlayer = isP1Turn ? player1 : player2;
            board[position] = currentPlayer.marker;
            console.log(currentPlayer.marker + ' placed on cell ' + position + '.');
            updateBoard();
            currentTurn++;
            const result = checkForWin();

            if (result) {
                console.log(currentPlayer.name + ' wins!');
                resetGame();

            } else if (currentTurn === 9) {
                console.log("It's a tie!")
                resetGame();
            } else {
                switchTurn();
            }
        }
    };


    const updateBoard = function () {

        for (let i = 0; i < cells.length; i++) {

            cells[i].textContent = board[i] || '';
        }
    };


    const switchTurn = function () {
        isP1Turn = !isP1Turn;
    };

    const resetGame = function () {
        for (let i = 0; i < board.length; i++) {
            board[i] = undefined;
        }

        isP1Turn = true;
        currentTurn = 0;
    };

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkForWin = function () {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }




        return false;
    };

    return {
        playTurn: playTurn,
        switchTurn: switchTurn
    };
})();

// game.playTurn(0);
// game.playTurn(2)
// game.playTurn(1)
// game.playTurn(3)
// game.playTurn(5)
// game.playTurn(4)
// game.playTurn(6)
// game.playTurn(7)
// game.playTurn(8)
