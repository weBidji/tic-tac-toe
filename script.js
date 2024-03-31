const createBoard = (function () {
    const gameContainer = document.createElement('div')
    const gameBoard = document.createElement('div');
    const p1input = document.createElement('input');

    p1input.type = 'text';
    p1input.minLength = 3;
    p1input.maxLength = 12;

    const p2input = document.createElement('input');
    p2input.type = 'text';
    p2input.minLength = 3;
    p2input.maxLength = 12;

    document.body.appendChild(gameContainer);
    gameContainer.appendChild(p1input);
    gameContainer.appendChild(gameBoard);
    gameContainer.appendChild(p2input);

    gameContainer.classList.add('game-container')
    gameBoard.classList.add('game-board');
    p1input.classList.add('player-input');
    p2input.classList.add('player-input');

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('game-cell');
        gameBoard.appendChild(cell);
    }
    const cells = gameBoard.querySelectorAll('.game-cell');



    return {
        gameBoard: gameBoard,
        cells: cells

    };
})();



const game = (function () {
    let board = new Array(9);
    const gameBoard = createBoard.gameBoard;
    let gameOver = true;
    let cells = createBoard.cells;
    let isP1Turn = true;
    let currentTurn = 0;

    const gameInfo = document.createElement('div');
    gameInfo.classList.add('game-info');
    document.body.appendChild(gameInfo);

    const playBtn = document.createElement('button');

    playBtn.classList.add('play-btn');

    playBtn.innerText = 'Play';

    document.body.appendChild(playBtn);

    const player1 = {
        name: 'Player 1',
        marker: 'X'
    };

    const player2 = {
        name: 'Player 2',
        marker: 'O'
    };

    playBtn.addEventListener('click', startGame)
    function startGame() {
        gameOver = !gameOver;
        playBtn.removeEventListener('click', startGame);
        playBtn.style.visibility = 'hidden';
        // console.log(gameOver);
        // return gameOver;
        if (!gameOver) {

            cells.forEach((cell, index) => {
                cell.addEventListener('click', () => {
                    game.playTurn(index);
                });
            });
        }
    }







    const playTurn = function (position) {
        if (position < 0 || position > 8) {
            console.log('Invalid position.');
        } else if (board[position] !== undefined) {
            console.log('Position already taken');
        } else {
            const currentPlayer = isP1Turn ? player1 : player2;
            board[position] = currentPlayer.marker;
            if (!gameOver) {
                console.log(currentPlayer.marker + ' placed on cell ' + position + '.');
            }
            updateBoard();
            currentTurn++;
            const result = checkForWin();

            if (result) {
                if (!gameOver) {

                    gameInfo.textContent = `${currentPlayer.name} wins!`;
                    console.log(currentPlayer.name + ' wins!');
                    playBtn.style.visibility = 'visible';
                    playBtn.textContent = 'Replay?'

                }


                replay();

                return gameInfo;
            } else if (currentTurn === 9) {

                gameInfo.textContent = `It's a tie!`;
                playBtn.style.visibility = 'visible';
                playBtn.textContent = 'Replay?'

                replay();
            } else {
                switchTurn();
            }
        }
    };

    const replay = function () {
        if (!gameOver) {
            gameOver = true;


            playBtn.addEventListener('click', () => {

                playBtn.style.visibility = 'hidden';
                resetGame();

            })

            return playBtn;

        }

    };

    function updateBoard() {
        if (!gameOver) {
            for (let i = 0; i < cells.length; i++) {
                cells[i].textContent = board[i] || '';
            }
        }
    }

    const switchTurn = function () {
        isP1Turn = !isP1Turn;
    };

    const resetGame = function () {
        for (let i = 0; i < board.length; i++) {
            board[i] = undefined;
        }

        cells.forEach((cell) => {
            cell.textContent = '';
        });
        gameInfo.textContent = '';
        isP1Turn = true;
        currentTurn = 0;
        gameOver = false;
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
        switchTurn: switchTurn,
        gameOver: gameOver
    };
})();
