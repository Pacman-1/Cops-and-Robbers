window.addEventListener('DOMContentLoaded', () => {

    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');


    let board =['','','','','','','','',''];
    let currentPlayer='Cops';
    let isGameActive=true;

    // end game statements
    const PLAYERX_WON="Robbers_Won"
    const PLAYERO_WON="Cops_Won"
    const TIE="TIE"

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // check for a winner
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'Cops' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = '<span class="Robbers">Robbers</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = '<span class="Cops">Cops</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };


    // checking if that tile has a value or not
    const isValidAction = (tile) => {
        if (tile.innerText === 'Robbers' || tile.innerText === 'Cops'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    // O-Cops X-Robbers
    const changePlayer = () => {
        playerDisplay.classList.remove(`${currentPlayer}`);
        currentPlayer = currentPlayer === 'Cops' ? 'Robbers' : 'Cops'; // Change Front end icon/text
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`${currentPlayer}`);
    }


    const userAction = (tile, index) => {

        // checking if game action is valid and if the game is still going on
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    // reset the gamestate and the board
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'Cops') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('Robbers');
            tile.classList.remove('Cops');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});

