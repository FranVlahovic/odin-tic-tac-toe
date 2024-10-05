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
    const scoreBoardTies = document.querySelector('.tie-score-title');
    const turnPlayerDisplay = document.querySelector('.player-turn h3');
    
    // Step 3: Create Variables for Player Names and Markers
    let playerOneInputValue;
    let playerTwoInputValue;
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

    // Step 2: Add Event Listener to Clear Button
    // - When the clear button is clicked, loop through the cells and reset their content.
    clear.addEventListener('click', () => {
        gridCells.forEach(cell => {
            cell.textContent = "";
        });
    })

    // Step 3: Handle Cell Clicks for Marker Placement
    // - Add event listeners to each grid cell to handle marker placement.
    gridCells.forEach(cell => {
        cell.addEventListener('click', () => {
            if(cell.textContent !== ""){
                return;
            }
            
            const currentPlayerMarker = (currentPlayer === 'playerOne') ? playerOneMarker : playerTwoMarker;

            cell.textContent = currentPlayerMarker;

            if (checkForWinner(currentPlayerMarker)) {
                overlay.show();
                return;
            }

            currentPlayer = (currentPlayer === 'playerOne') ? 'playerTwo' : 'playerOne';
            turnPlayerDisplay.textContent = (currentPlayer === 'playerOne') ? playerOneInputValue : playerTwoInputValue;
            checkForTie();
            
        })
    })

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
    // - This function should take the current player's marker as an argument.
    // - Loop through the winning combinations and check if any match the current state of the grid.

    // Step 3: Display Overlay When a Winner is Declared
    // - Create a function to display the overlay when a winner is found.
    const displayOverlay = () => {
        const overlay = document.querySelector('.overlay');
        return {
            show(){
                overlay.style.display = 'flex';
            },
            hide(){
                overlay.style.display = 'none';
            }
        }
    }
    const overlay = displayOverlay();
    // - The overlay should show the winner's name and provide a button to restart the game.

    // Step 4: Update Scoreboard for Winning Player
    // - Create variables to keep track of Player 1's and Player 2's scores.
    // - Inside the winning condition function, increment the score of the winning player.

    // Step 5: Reset the Game When Overlay is Closed or Restarted
    // - Implement a function that resets the game state, including clearing the grid and resetting scores.
    // - Ensure this function can be called when the overlay's restart button is clicked.

    // Step 6: Handle Tie Situations
    // - Add logic to check for a tie condition when the grid is full, and there’s no winner.
    // - Display a tie message in the overlay if this situation occurs.

    // Step 8: Testing the Implementation
    // - Test the functionality by playing the game and ensuring that winning and tie conditions are correctly identified.
    // - Make sure the overlay displays correctly and that scores update as expected.
});
