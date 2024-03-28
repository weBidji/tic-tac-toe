const game = (function () {
    let board = new Array(9);

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
        } else {
            const currentPlayer = isP1Turn ? player1 : player2;
            board[position] = currentPlayer.marker;
            console.log(currentPlayer.marker + ' placed on cell ' + position + '.');
            switchTurn();
            const result = checkForWin();
            if (result) {
                console.log(currentPlayer.name + ' wins!');
                clearBoard();

            } else if (!result && currentTurn > 9) {
                console.log("It's a tie!")
            }
        }
    };



    const switchTurn = function () {
        isP1Turn = !isP1Turn;
    };

    const clearBoard = function () {
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
