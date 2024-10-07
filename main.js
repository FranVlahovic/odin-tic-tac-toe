document.addEventListener('DOMContentLoaded', () => {
    const SectionFactory = (containerSelector) => {
        const section = document.querySelector(containerSelector);

        return {
            show() {
                section.style.display = 'flex';
            },
            hide() {
                section.style.display = 'none';
            }
        };
    };

    const startupSection = SectionFactory('.startup-container');
    const playersSection = SectionFactory('.players-container');
    const gameSection = SectionFactory('.game-container');
    const scoreBoard = SectionFactory('.scoreboard');

    const playGameButton = document.querySelector('.startup-button');
    const startGameButton = document.querySelector('#start-game-button');
    const playAgainButton = document.querySelector('#play-again-button');
    const quitButton = document.querySelector('#quit-button');

    startupSection.show();
    playersSection.hide();
    gameSection.hide();
    scoreBoard.hide();
    

    // Step 1: Select Player Input Elements
    const playerOneInput = document.querySelector('#player1-name');
    const playerTwoInput = document.querySelector('#player2-name');

    // Step 2: Select Scoreboard and Player Turn Display Elements
    const scoreBoardPlayerOne = document.querySelector('.player1-score-title');
    const scoreBoardPlayerTwo = document.querySelector('.player2-score-title');
    const scoreBoardPlayerOneScore = document.querySelector('.player1-score');
    const scoreBoardPlayerTwoScore = document.querySelector('.player2-score');
    const scoreBoardTieScore = document.querySelector('.tie-score');
    const turnPlayerDisplay = document.querySelector('.player-turn h3');
    
    // Step 3: Create Variables for Player Names and Markers
    let playerOneInputValue;
    let playerTwoInputValue;
    let playerOneScore = 0;
    let playerTwoScore = 0;
    let tieScore = 0;
    const playerOneMarker = 'X';
    const playerTwoMarker = 'O';
    let currentPlayer = 'playerOne';
    

    // Step 4: Define Winning Combinations
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
    
    playGameButton.addEventListener('click', () => {
        startupSection.hide();
        playersSection.show();
    });

    startGameButton.addEventListener('click', () => {        
        // Step 5: Retrieve Input Values
        playerOneInputValue = playerOneInput.value.toUpperCase();
        playerTwoInputValue = playerTwoInput.value.toUpperCase();

        // Step 6: Update Scoreboard
        scoreBoardPlayerOne.textContent = playerOneInputValue;
        scoreBoardPlayerTwo.textContent = playerTwoInputValue;

        // Step 7: Set Initial Turn Display
        turnPlayerDisplay.textContent = playerOneInputValue;

        playersSection.hide();
        gameSection.show();
        scoreBoard.show();
    });



    // Step 1: Select Grid Cells and Clear Button
    // - Use document.querySelectorAll to select all the grid cells.
    const gridCells = document.querySelectorAll('.cell');
    // - Use document.querySelector to select the clear button.
    const clear = document.querySelector('#clear-button');
    
    const clearCells = () => {
        gridCells.forEach(cell => {
            cell.textContent = "";
        })
    }
    // Step 2: Add Event Listener to Clear Button
    // - When the clear button is clicked, loop through the cells and reset their content.
    clear.addEventListener('click', () => {
        clearCells();
    })

    // Step 3: Handle Cell Clicks for Marker Placement
    // - Add event listeners to each grid cell to handle marker placement.
    gridCells.forEach(cell => {
        cell.addEventListener('click', () => {
            if(cell.textContent !== "") return;

            const currentPlayerMarker = (currentPlayer === 'playerOne') ? playerOneMarker : playerTwoMarker;
            const currentPlayerClass = (currentPlayer === 'playerOne') ? 'x-marker' : 'o-marker';
            const currentPlayerTurnClass = (currentPlayer === 'playerOne') ? 'x-player-turn' : 'o-player-turn';
            
            cell.textContent = currentPlayerMarker;
            cell.classList.add(currentPlayerClass);

            if (checkForWinner(currentPlayerMarker)) {
                if (currentPlayerMarker === playerOneMarker) {
                    playerOneScore++;
                }
                else {
                    playerTwoScore++;
                }

                if (playerOneScore === 3 || playerTwoScore === 3){
                    resetScoreboard();
                    finalOverlay.show(`Winner is ${currentPlayerMarker === playerOneMarker ? playerOneInputValue : playerTwoInputValue}`);
                    return;
                }

                updateScoreboard();
                clearCells();
                overlay.show(`Victory for ${currentPlayerMarker === playerOneMarker ? playerOneInputValue : playerTwoInputValue}`);
                return;
            }

            

            currentPlayer = (currentPlayer === 'playerOne') ? 'playerTwo' : 'playerOne';
            updatePlayerTurnDisplay();
            checkForTie();
        });
    });

    // Step 2: Check for a Winner After Each Move
    // - Create a function that checks if the current player has achieved a winning combination.
    const checkForWinner = (currentPlayerMarker) => {
        for (const combination of winCombinations){
            if(gridCells[combination[0]].textContent === currentPlayerMarker &&
                gridCells[combination[1]].textContent === currentPlayerMarker &&
                gridCells[combination[2]].textContent === currentPlayerMarker
            ){
                return true;
            }
        }
        return false;
    }

    const displayOverlay = () => {
        const overlay = document.querySelector('.overlay');
        const message = document.querySelector('.message');
        return {
            show(msg){
                message.textContent = msg;
                overlay.style.display = 'flex';

                setTimeout(() => {
                    this.hide();
                },3000);
            },
            hide(){
                overlay.style.display = 'none';
            }
        }
    }

    const overlay = displayOverlay();

    const displayFinalOverlay = () => {
        const overlay = document.querySelector('.final-overlay');
        const message = document.querySelector('.final-message');
        return {
            show(msg){
                message.textContent = msg;
                overlay.style.display = 'flex';
            },
            hide(){
                overlay.style.display = 'none';
            }
        }
    }
    const finalOverlay = displayFinalOverlay();

    const updateScoreboard = () => {
        scoreBoardPlayerOneScore.textContent = playerOneScore;
        scoreBoardPlayerTwoScore.textContent = playerTwoScore;
        scoreBoardTieScore.textContent = tieScore;
    }

    const updatePlayerTurnDisplay = () => {
        if(currentPlayer === 'playerOne'){
            turnPlayerDisplay.textContent = playerOneInputValue;
            turnPlayerDisplay.className = 'x-player-turn';
        }else{
            turnPlayerDisplay.textContent = playerTwoInputValue;
            turnPlayerDisplay.className = 'o-player-turn';
        }
    }

    const checkForTie = () => {
        const isGridFull = [...gridCells].every(cell => cell.textContent !== "");
        if (isGridFull && !checkForWinner(playerOneMarker) && !checkForWinner(playerTwoMarker)){
            tieScore++;
            updateScoreboard();
            clearCells();
            overlay.show("It's a tie!");
        }
    }
    const resetScoreboard = () => {
        playerOneScore = 0;
        playerTwoScore = 0;
        tieScore = 0;
        updateScoreboard();
    }
    
    const resetPlayerInputs = () => {
        playerOneInputValue = "";
        playerTwoInputValue = "";
        playerOneInput.value = "";
        playerTwoInput.value = "";
    }

    playAgainButton.addEventListener('click', () => {
        resetScoreboard();
        finalOverlay.hide();
        clearCells();
    })

    quitButton.addEventListener('click', () => {
        finalOverlay.hide();

        resetPlayerInputs();
        resetScoreboard();
        clearCells();

        startupSection.show();
        playersSection.hide();
        gameSection.hide();
        scoreBoard.hide();
    })
});
