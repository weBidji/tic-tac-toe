const createBoard = (function () {

    const pageTitle = document.createElement('h1');
    pageTitle.textContent = 'Tic-Tac-Toe';
    document.body.appendChild(pageTitle);
    const gameContainer = document.createElement('div')
    const gameBoard = document.createElement('div');
    const p1input = document.createElement('input');

    p1input.type = 'text';
    p1input.minLength = 3;
    p1input.maxLength = 10;

    const p2input = document.createElement('input');
    p2input.type = 'text';
    p2input.minLength = 3;
    p2input.maxLength = 10;

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
        gameContainer: gameContainer,
        gameBoard: gameBoard,
        cells: cells,
        p1input: p1input,
        p2input: p2input,


    };
})();



const game = (function () {
    let board = new Array(9);
    const gameContainer = createBoard.gameContainer;
    const gameBoard = createBoard.gameBoard;
    let gameOver = true;
    const cells = createBoard.cells;
    let isP1Turn = true;
    let currentTurn = 0;

    const p1input = createBoard.p1input;
    const p2input = createBoard.p2input;

    let p1score;
    let p2score;




    const gameInfo = document.createElement('div');
    gameInfo.classList.add('game-info');
    document.body.appendChild(gameInfo);

    const scoreBoard = document.createElement('div');
    scoreBoard.classList.add('score-board');
    document.body.appendChild(scoreBoard);

    const playBtn = document.createElement('button');

    playBtn.classList.add('play-btn');

    playBtn.textContent = 'Play';

    scoreBoard.appendChild(playBtn);


    const player1 = {

        marker: 'X',
        score: 0
    };

    const player2 = {

        marker: 'O',
        score: 0
    };

    playBtn.addEventListener('click', startGame)

    cells.forEach((cell) => {
        cell.classList.add('disabled'); // Add the disabled class to all cells initially
    });

    function startGame(e) {

        if (p1input.value === '' || p2input.value === '') {
            e.preventDefault();
            gameInfo.textContent = "Please enter player names"
        } else {
            gameInfo.textContent = '';
            gameOver = !gameOver;
            playBtn.removeEventListener('click', startGame);
            playBtn.style.visibility = 'hidden';

            let p1NameDisplay = document.createElement('div');
            let p2NameDisplay = document.createElement('div');
            p1NameDisplay.classList.add('player-display');
            p2NameDisplay.classList.add('player-display');
            p1NameDisplay.textContent = p1input.value;
            p2NameDisplay.textContent = p2input.value;
            player1.name = p1input.value;
            player2.name = p2input.value;

            p1score = document.createElement('div');
            p2score = document.createElement('div');
            p1score.classList.add('player-score');
            p2score.classList.add('player-score');
            p1score.textContent = player1.score;
            p2score.textContent = player2.score;
            scoreBoard.insertBefore(p1score, playBtn);
            scoreBoard.appendChild(p2score);


            gameContainer.removeChild(p1input);
            gameContainer.removeChild(p2input);
            gameContainer.insertBefore(p1NameDisplay, gameBoard);
            gameContainer.appendChild(p2NameDisplay);

            setTimeout(() => {
                document.querySelectorAll('.player-display').forEach(playerDisplay => {
                    playerDisplay.classList.add('active');
                });
            }, 50);




            if (!gameOver) {
                cells.forEach((cell, index) => {
                    cell.addEventListener('click', () => {
                        game.playTurn(index);
                    });
                    cell.classList.remove('disabled');
                });
            } else {

                cells.forEach((cell) => {
                    cell.removeEventListener('click', () => { });
                    cell.classList.add('disabled');
                });
            }





        }

        return { p1score: p1score, p2score: p2score };

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
                    currentPlayer.score++;
                    console.log(`${player1.name} score:${player1.score}. | ${player2.name} score:${player2.score}.`)
                    playBtn.style.visibility = 'visible';
                    playBtn.textContent = 'Replay?'

                    updateScores();



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



    const updateScores = function () {

        p1score.textContent = `${player1.score}`;
        p2score.textContent = `${player2.score}`

    }


    const replay = function () {
        if (!gameOver) {
            gameOver = true;


            playBtn.addEventListener('click', () => {

                playBtn.style.visibility = 'hidden';
                resetGame();


            })
            cells.forEach((cell) => {
                cell.removeEventListener('click', () => { });
                cell.classList.add('disabled');
            });

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
            cell.classList.remove('winning-cell');
            cell.classList.remove('disabled');
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
    const highlightWinningCells = function (winningCombination) {
        console.log('Highlighting winning cells:', winningCombination);
        for (let i = 0; i < winningCombination.length; i++) {
            const cellIndex = winningCombination[i];
            cells[cellIndex].classList.add('winning-cell');
        }
    };
    const checkForWin = function () {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                highlightWinningCells(combination);
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
